import os
import redis
from werkzeug.utils import import_string

# grab redis configuration from .env, or use default values if not available
# currently redundant until backend is restructured properly
class Config(object):
    redis_endpoint_url = os.environ.get("REDIS_ENDPOINT_URL", "127.0.0.1:6379")
    REDIS_HOST = os.environ.get("REDIS_HOST")
    REDIS_PORT = os.environ.get("REDIS_PORT")
    REDIS_PASSWORD = os.environ.get("REDIS_PASSWORD", None)
    SESSION_TYPE = "redis"
    redis_client = redis.Redis(
        host = REDIS_HOST, port = REDIS_PORT, password = REDIS_PASSWORD
    )
    SESSION_REDIS = redis_client

class ConfigDev(Config):
    pass

# returns string from object of .env CHAT_CONFIG or the config object as default
def get_config() -> Config:
    return import_string(os.environ.get("CHAT_CONFIG", "backend.config.ConfigDev"))