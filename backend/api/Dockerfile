FROM rust:latest

WORKDIR /backend/api
COPY . .

RUN mv .env.docker .env

RUN cargo install --path .

CMD ["lah_api"]