import json
from flask import session
from flask_socketio import emit, join_room

from config import get_config

redis_client = get_config().redis_client

def publish(name, message, broadcast=False, room=None):
    if room:
        emit(name, message, room=room, broadcast=True)
    else:
        emit(name, message, broadcast=broadcast)
    
    outgoing = {"serverId": utils.SERVER_ID, "type": name, "data": message}
    redis_client.publish("MESSAGES", json.dumps(outgoin))

def io_connect():
    user = session.get("user", None)
    if not user:
        return
    
    user_id = user.get("id", None)
    redis_client.sadd("online_users", user_id)

    msg = dict(user)
    msg["online"] = True

    publish("user.connected", msg, broadcast=True)

def io_disconnect():
    user = session.get("user", None)
    if user:
        redis_client.srem("online_users", user["id"])
        msg = dict(user)
        msg["online"] = False
        publish("user.disconnected", msg, broadcast=True)

def io_join_room(id_room):
    join_room(id_room)

def hmget(key1, key2):
    result = redis_client.hmget(key1, key2)
    return list(map(lambda x: x.decode("utf-8"), result))

def io_on_message(message):
    redis_client.sadd("online_users", message["from"])
    message_string = json.dumps(message)
    room_id = message["roomId"]
    room_key = f"room:{room_id}"

    room_has_messages = bool(redis_client.exists(room_key))
    if not room_has_messages:
        ids = room_id.split(":")
        msg = {
            "id": room_id,
            "names": [
                hmget(f"user:{ids[0]}", "username"),
                hmget(f"user:{ids[1]}", "username")
            ]
        }
        publish("show.room", msg, broadcast=True)
    else:
        publish("message", message, room=room_id)

