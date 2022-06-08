FROM rust:latest

WORKDIR /api

RUN echo "fn main() {}" > dummy.rs
COPY ./Cargo.toml ./Cargo.toml

RUN sed -i 's#src/main.rs#dummy.rs#' Cargo.toml

RUN cargo build --release

RUN sed -i 's#dummy.rs#src/main.rs#' Cargo.toml

COPY ./src ./src
COPY ./migrations ./migrations

RUN cargo build --release

CMD ["target/release/api"]