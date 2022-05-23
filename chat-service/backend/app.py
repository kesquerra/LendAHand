from flask import Flask, Response, jsonify, session
from flask_cors import CORS
import redis
import os
import json
import eventlet

from flask_session import Session
from flask_socketio import SocketIO

from socketio_handlers import hmget
from config import get_config

sess = Session()
app = Flask("app")
app.config.from_object(get_config())
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

# initialize
sess.init_app(app)
port = int(os.environ.get("PORT", 5000))
socketio.run(app, port=port, debug=True, use_reloader=True)
eventlet.monkey_patch()
eventlet.serve(eventlet.listen(('127.0.0.1', 8080)))

# set socket event handlers
socketio.on_event("connect", io_connect)
socketio.on_event("disconnect", io_disconnect)
socketio.on_event("room.join", io_join_room)
socketio.on_event("message", io_on_message)


# routes - move to new file once initial testing is complete 
@app.route("/")
def index():
	return "This is the backend for the chat-service. Try '/users', '/rooms/:user_id', and '/room/:room_id/messages'"

@app.route("/users")
def get_online_users():
	# This will get a JSON of all the users online
	ids = request.args.getlist("ids[]")
	if ids:
		users = {}
		for id in ids:
			user = redis_client.hgetall(f"user:{id}")
			is_member = redis_client.sismember("online_users", id)
			users[id] = {
				"id": id,
				"username": user[b'username'].decode("utf-8"),
				"online": boo(is_member)
			}
		return jsonify(users)
	return jsonify(None), 404

@app.route("/rooms/<user_id>")
def get_rooms_for_user_id(user_id=0):
    # This will return a JSON of the private rooms a specific user has - one for each unique conversation
	room_ids = list(
		map(
			lambda x: x.decode("utf-8"),
			list(redis_client.smembers(f"user:{user_id}:rooms")),
		)
	)
	rooms =[]

	for room_id in room_ids:
		name = redis_client.get(f"room:{room_id}:name")
		if not name:
			room_exists = redis_client.exists(f"room:{room_id}")
			if not room_exists:
				continue

			user_ids = room_id.split(":")
			if len(user_ids) != 2:
				return jsonify(None), 400

			rooms.append(
				{
					"id": room_id,
					"names": [
						hmget(f"user:{user_id[0]}", "username"),
						hmget(f"user:{user_id[1]}", "username")
					]
				}
			)
		else:
			rooms.append({"id": room_id, "names": [name.decode("utf-8")]})
	return jsonify(rooms), 200

def get_messages(room_id=0, offset=0, size=50):
	room_key = f"room:{room_id}"
	room_exists = redis_client.exists(room_key)
	if not room_exists:
		return []
	else:
		values = redis_client.zrevrange(room_key, offset, offset + size)
		return list(map(lambda x: json.loads(x.decode("utf-8")), values))

@app.route("/room/<room_id>/messages", methods=["GET"])
def get_messages_for_selected_room(room_id="0"):
    # This will return a JSON of all the messages in a specific room_id e.g. between users 1 and 2: '1:2'
	offset = request.args.get("offset")
	size = request.args.get("size")

	try:
		messages = get_messages(room_id, int(offset), int(size))
		return jsonify(messages)
	except:
		return jsonify(None), 400
		

@app.route("/room/<room_id>/messages", methods=["POST"])
def post_messages_to_selected_room(room_id="0"):
    return "This will post a new message to a specific room"


if __name__ == '__main__':
	# Connect to redis client
	redis_host = os.environ.get("REDIS_HOST", "localhost")
	redis_port = os.environ.get("REDIS_PORT", 6379)
	redis_password = os.environ.get("REDIS_PASSWORD", None)
	redis_client = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password)

	# Run the app
	app.run(port=8080, host="0.0.0.0")