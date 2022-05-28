from flask import Flask
from flask_cors import CORS

import os
import sys

from flask_session import Session
from flask_socketio import SocketIO

from backend.socketio_handlers import io_connect, io_disconnect, io_join_room, io_on_message
from backend.config import get_config
from backend import utils

sess = Session()
app = Flask(__name__, static_url_path="", static_folder="../../frontend/build") # probably have to tweak these when connecting everything together
app.config.from_object(get_config())
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

def run_app():
    # Connect to redis
    utils.init_redis()
    sess.init_app(app)

    # grab port
    arg = sys.argv[1:]
    port = int(os.environ.get("PORT", 5000))
    if len(arg) > 0:
        try:
            port = int(arg[0])
        except ValueError:
            pass

    # start socketio, called in main directory using eventlet server
    socketio.run(app, port=port, debug=True, use_reloader=True)


# initialize
# sess.init_app(app)
# port = int(os.environ.get("PORT", 5000))
# socketio.run(app, port=port, debug=True, use_reloader=True)
# eventlet.monkey_patch()
# eventlet.serve(eventlet.listen(('127.0.0.1', 8080)))

# set socket event handlers
socketio.on_event("connect", io_connect)
socketio.on_event("disconnect", io_disconnect)
socketio.on_event("room.join", io_join_room)
socketio.on_event("message", io_on_message)

from backend import routes  # noqa

application = app

# if __name__ == '__main__':
# 	# Connect to redis client
# 	redis_host = os.environ.get("REDIS_HOST", "localhost")
# 	redis_port = os.environ.get("REDIS_PORT", 6379)
# 	redis_password = os.environ.get("REDIS_PASSWORD", None)
# 	redis_client = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password)

# 	# Run the app
# 	app.run(port=8080, host="0.0.0.0")