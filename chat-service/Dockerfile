# Use Python 3.7
FROM python:3.7
# Copy requirements to docker image 
COPY requirements.txt /
# install necessary packages
RUN pip install -r requirements.txt
# add files from docker client's current directory
COPY . /app
# set container port to 8080
EXPOSE 8080
ENV PORT 8080
WORKDIR /app
# Make gunicorn entrypoint, bind server socket to PORT, running one eventlet worker
CMD exec gunicorn --bind :$PORT --worker-class eventlet -w 1 app:app