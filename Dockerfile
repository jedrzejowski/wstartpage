FROM node:14-alpine as node-builder

WORKDIR /app
COPY packages/frontend /app

RUN npm ci --no-optional
RUN npm run build

FROM rust:alpine3.14 as rust-builder

WORKDIR /app
COPY packages/backend /app

ENV RUSTUP_TOOLCHAIN=stable
RUN apk add build-base --no-cache
RUN cargo build --release --locked --all-features

FROM alpine:3.14

COPY --from=rust-builder /app/target/release/wstartpage /usr/local/bin/wstartpage
COPY --from=node-builder /app/dist /usr/local/lib/wstartpage

ENV WSTARTPAGE_STATIC_ROOT=/usr/local/lib/wstartpage

CMD [ "/usr/local/bin/wstartpage" ]
