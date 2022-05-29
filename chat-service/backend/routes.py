import os
import json
from flask import Response, jsonify, request, session

from backend import utils
from backend.app import app

@app.route("/stream")
def stream():
    return Response(utils.event_stream(), mimetype="text/event-stream")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    # not sure if this needs to return frontend
    return "You have connected to the chat-service backend!!!"
    # return app.send_static_file("index.html")

@app.route("/help")
def index():
	return "This is the backend for the chat-service. Try '/users', '/rooms/:user_id', and '/room/:room_id/messages'"

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    username_key = utils.make_username_key(username)
    user_exists = utils.redis_client.exists(username_key)
    
    if not user_exists:
        new_user = utils.create_user(username)
        session["user"] = new_user
    else:
        user_key = utils.redis_client.get(username_key).decode("utf-8")
        data = utils.redis_client.hgetall(user_key)
        user = {"id": user_key.split(":")[-1], "username": username}
        session["user"] = user
        return user, 200
    
    return jsonify({"message": "Invalid username"}), 404

# maybe automatically call this whenever a new login occurs on frontend?
@app.route("/logout", methods=["POST"])
def logout():
    session["user"] = None
    return jsonify(None), 200

@app.route("/users")
def get_user_info_from_ids():
	# This will return a JSON of all the users stored in redis
	ids = request.args.getlist("ids[]")
	if ids:
		users = {}
		for id in ids:
			user = utils.redis_client.hgetall(f"user:{id}")
			is_member = utils.redis_client.sismember("online_users", id)
			users[id] = {
				"id": id,
				"username": user[b'username'].decode("utf-8"),
				"online": bool(is_member)
			}
		return jsonify(users)
	return jsonify(None), 404

@app.route("/users/online")
def get_online_users():
    # This returns a JSON of all users currently online
    online_ids = map(
        lambda x: x.decode("utf-8"), utils.redis_client.smembers("online_users")
    )
    users = {}
    for online_id in online_ids:
        user = utils.redis_client.hgetall(f"user:{online_id}")
        users[online_id] = {
            "id": online_id,
            "username": user.get(b"username", "").decode("utf-8"),
            "online": True
        }
    return jsonify(users), 200

@app.route("/rooms/<user_id>")
def get_rooms_for_user_id(user_id=0):
    # This will return a JSON of the private rooms a user-id belongs to - each room represents a separate direct message with another user
	room_ids = list(
		map(
			lambda x: x.decode("utf-8"),
			list(utils.redis_client.smembers(f"user:{user_id}:rooms")),
		)
	)
	rooms =[]

	for room_id in room_ids:
		name = utils.redis_client.get(f"room:{room_id}:name")
		if not name:
			room_exists = utils.redis_client.exists(f"room:{room_id}")
			if not room_exists:
				continue

			user_ids = room_id.split(":")
			if len(user_ids) != 2:
				return jsonify(None), 400

			rooms.append(
				{
					"id": room_id,
					"names": [
						utils.hmget(f"user:{user_id[0]}", "username"),
						utils.hmget(f"user:{user_id[1]}", "username")
					]
				}
			)
		else:
			rooms.append({"id": room_id, "names": [name.decode("utf-8")]})
	return jsonify(rooms), 200

@app.route("/room/<room_id>/messages")
def get_messages_for_selected_room(room_id="0"):
    # This will return a JSON of all the messages in a specific room_id e.g. between two users 1 and 2 from "room_id":"1:2"
	offset = request.args.get("offset")
	size = request.args.get("size")

	try:
		messages = utils.get_messages(room_id, int(offset), int(size))
		return jsonify(messages)
	except:
		return jsonify(None), 400
		