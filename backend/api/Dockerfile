FROM rust:latest

RUN USER=root cargo new --bin api
WORKDIR /api

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

RUN ls

RUN cargo build
RUN rm src/*.rs

COPY ./src ./src
COPY ./migrations ./migrations
COPY .env.docker .env

RUN cargo install --path .

CMD ["api"]