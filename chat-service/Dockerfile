# Use Python 3.9.7
FROM python:3.9.7
RUN mkdir /app
ADD . /app
WORKDIR /app
# install necessary packages
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r requirements.txt
# add files from docker client's current directory
COPY . /app
# set internal port to 8080
EXPOSE 8080
ENV PORT 8080
WORKDIR /app
# Make gunicorn entrypoint, bind server socket to PORT, running one eventlet worker
CMD exec gunicorn --bind :$PORT --worker-class eventlet -w 1 app:app