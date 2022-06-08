from backend.app import app, run_app  # noqa

if __name__ == "__main__":

    import eventlet

    eventlet.monkey_patch()
    run_app(app)
