import json
from flask import session
from flask_socketio import emit, join_room

from backend import utils


def publish(name, message, broadcast=False, room=None):
    if room:
        emit(name, message, room=room, broadcast=True)
    else:
        emit(name, message, broadcast=broadcast)
    
    outgoing = {"serverId": utils.SERVER_ID, "type": name, "data": message}
    utils.redis_client.publish("MESSAGES", json.dumps(outgoing))

def io_connect():
    # check if user is connected, has session; add user and publish connection if not
    user = session.get("user", None)
    if not user:
        return
    
    user_id = user.get("id", None)
    utils.redis_client.sadd("online_users", user_id)

    msg = dict(user)
    msg["online"] = True

    publish("user.connected", msg, broadcast=True)

def io_disconnect():
    # handle socket disconnect, publish disconnect
    user = session.get("user", None)
    if user:
        utils.redis_client.srem("online_users", user["id"])
        msg = dict(user)
        msg["online"] = False
        publish("user.disconnected", msg, broadcast=True)

def io_join_room(id_room):
    join_room(id_room)

def io_on_message(message):
    
    # check if message is valid, replace potential escape characters with trusted HTML 
    def escape(htmlstring):
        escapes = {'"': "&quot;", "'": "&#x27;", "<": "&lt;", ">": "&gt;"}
        htmlstring = htmlstring.replace("&", "&amp;")
        for seq, esc in escapes.items():
            htmlstring = htmlstring.replace(seq, esc)
        return htmlstring
    
    message["message"] = escape(message["message"])
    # reset online status of user
    utils.redis_client.sadd("online_users", message["from"])
    # store new message
    message_string = json.dumps(message)
    room_id = message["roomId"]
    room_key = f"room:{room_id}"
    
    is_private = not bool(utils.redis_client.exists(f"{room_key}:name"))        # private rooms do not have names
    room_has_messages = bool(utils.redis_client.exists(room_key))
    
    if is_private and not room_has_messages:
        # broadcast room creation if private and no messages
        ids = room_id.split(":")
        msg = {
            "id": room_id,
            "names": [
                utils.hmget(f"user:{ids[0]}", "username"),
                utils.hmget(f"user:{ids[1]}", "username")
            ]
        }
        publish("show.room", msg, broadcast=True)
    # add valid message to appropriate room_key with timestamp
    utils.redis_client.zadd(room_key, {message_string: int(message["date"])})
    
    # Publish private message or broadcast to General
    if is_private:
        publish("message", message, room=room_id)
    else:
        publish("message", message, broadcast=True)

