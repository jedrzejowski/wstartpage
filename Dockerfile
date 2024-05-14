ARG ALPINE_VERSION=3.18
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as node-builder

WORKDIR /app
COPY frontend /app

RUN npm ci
RUN npm run build

FROM rust:alpine${ALPINE_VERSION} as rust-builder

WORKDIR /app
COPY backend /app

ENV RUSTUP_TOOLCHAIN=stable
RUN apk add build-base --no-cache
RUN cargo fetch
RUN cargo build --release --locked --all-features

FROM alpine:${ALPINE_VERSION}

ENV RESOURCES_ROOT=/srv
ENV USER_SOURCE_TYPE=no

COPY --from=rust-builder /app/target/release/wstartpage /usr/local/bin/wstartpage
COPY --from=node-builder /app/dist ${RESOURCES_ROOT}


CMD [ "/usr/local/bin/wstartpage" ]
