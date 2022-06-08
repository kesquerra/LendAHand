import json
import math
import random

from backend import seed_data
from backend.config import get_config

SERVER_ID = random.uniform(0, 10301)

redis_client = get_config().redis_client

def make_username_key(username):
    return f"username:{username}"

def create_user(username):
    username_key = make_username_key(username)
    next_id = redis_client.incr("total_users")
    user_key = f"user:{next_id}"
    redis_client.set(username_key, user_key)
    redis_client.hmset(user_key, {"username": username})
    redis_client.sadd("online_users", next_id)
    redis_client.sadd(f"user:{next_id}:rooms", "0")
    return {"id": next_id, "username": username}

def get_messages(room_id=0, offset=0, size=50):
    # room_id reprsents private room between two users, with their ids (e.g. room:1:2)
    room_key = f"room:{room_id}"        
    room_exists = redis_client.exists(room_key)
    if not room_exists:
        return [{"messages": None}]
    else:
        values = redis_client.zrevrange(room_key, offset, offset + size)
        return list(map(lambda x: json.loads(x.decode("utf-8")), values))
    
def hmget(key1, key2):
    result = redis_client.hmget(key1, key2)
    return list(map(lambda x: x.decode("utf-8"), result))

def get_private_room_id(user1, user2):
    if math.isnan(user1) or math.isnan(user2) or user1 == user2:
        return None
    # room_id convention is lower id first - min_user_id:max_user_id (e.g. room:3:4)
    min_user_id = user2 if user1 > user2 else user1
    max_user_id = user1 if user1 > user2 else user2
    return f"{min_user_id}:{max_user_id}"

def create_private_room(user1, user2):
    room_id = get_private_room_id(user1, user2)
    if not room_id:
        return None, True
    
    redis_client.sadd(f"user:{user1}:rooms", room_id)
    redis_client.sadd(f"user:{user2}:rooms", room_id)
    
    return (
        {
            "id": room_id,
            "names": [
                hmget(f"user:{user1}", "username"),
                hmget(f"user:{user2}", "username")
            ],
        },
        False
    )
    
def init_redis():
    total_users_exist = redis_client.exists("total_users")
    if not total_users_exist:
        redis_client.set("total_users", 0)
        # all users join General room:0, private rooms are not named
        redis_client.set(f"room:0:name", "General")
        # add data
        seed_data.create()
        
def event_stream():
    """Used to publish and subscribe to redis messages via socketio
    Client connects to this stream and listens Also properly formats messages"""
    pubsub = redis_client.pubsub(ignore_subscribe_messages=True)    
    pubsub.subscribe("MESSAGES")
    for message in pubsub.listen():
        message_parsed = json.loads(message["data"])
        if message_parsed["serverId"] == SERVER_ID:
            continue
        
        data = "data:  %s\n\n" % json.dumps(
            {"type": message_parsed["type"], "data": message_parsed["data"]}
        )
        yield data      # yield iterates as needed, publishing messages data according to the stream
    