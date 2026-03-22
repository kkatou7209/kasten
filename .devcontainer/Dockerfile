FROM oven/bun:latest

WORKDIR /workspace

RUN apt update && \
    apt clean && \
    apt install -y git && \
    rm -rf /var/lib/apt/lists/*