from backend import utils
import redis
import math
import json
import random
import time

seed_users = ["Adam", "Kyle", "Taylor"]
greetings = ["Hey", "What's up?", "How's it going?"]
seed_password = "seed_password"

messages = [
    "Hey what's up?",
    "What's going on?",
    "How's everything?",
    "Hey nice to see you!",
    "How's the final project going?"
]

def math_random():
    return random.uniform(0, 1)

def get_greeting():
    return greetings[math.floor(math_random() * len(greetings))]

def add_message(room_id, from_id, content, timestamp):
    room_key = f"room:{room_id}"
    message = {
        "from": from_id,
        "date": timestamp,
        "message": content,
        "roomId": room_id
    }
    # messages added to redis with JSON message as key and timestamp as score to preserve send order
    utils.redis_client.zadd(room_key, {json.dumps(message): int(message["date"])})

def create():
    """Generate seed data"""
    users = []
    for seed_user in seed_users:
        user = utils.create_user(seed_user)
        users.append(user)
        
    rooms = {}
    
    for user in users:
        # generate list by filtering out current seed user
        other_users = filter(lambda x: x["id"] != user["id"], users)

        for other_user in other_users:
            private_room_id = utils.get_private_room_id(
                int(user["id"]), int(other_user["id"])
            )
            # if no room between this user and other seed user, create one
            if private_room_id not in rooms:
                res = utils.create_private_room(user["id"], other_user["id"])
                room = res[0]
                rooms[private_room_id] = room
            
            add_message(
                private_room_id,
                other_user["id"],
                get_greeting(),
                time.time() - math_random() * 333
            )
            
    def random_user_id():
        return users[math.floor(len(users) * math_random())]["id"]
    
    # send each seed message into the general room by a random seed user, with a variable timestamp
    for key, message in enumerate(messages):
        add_message(
            "0", random_user_id(), message, time.time() - ((len(messages) - key) * 200)
        )