FROM rust:latest

RUN USER=root cargo new --bin api
WORKDIR /api

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

RUN cargo build --release & rm src/*.rs
RUN rm -f target/release/deps/api*

COPY ./src ./src
COPY ./migrations ./migrations
COPY .env.docker .env

RUN cargo build --release
RUN cargo install --path .

CMD ["api"]