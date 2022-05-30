# Dockerfile References: https://docs.docker.com/engine/reference/builder/

# Start from python:latest base image
FROM python:latest

# The latest alpine images don't have some tools like (`git` and `bash`).
# Adding git, bash and openssh to the image
RUN apk update && apk upgrade
RUN apk add --no-cache bash git openssh

# Make dir app
RUN mkdir /app
WORKDIR /app
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Run the executable
CMD ["python", "app.py"]