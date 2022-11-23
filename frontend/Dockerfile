FROM cgr.dev/chainguard/go:latest as builder

# Create and change to the app directory.
WORKDIR /app

# Retrieve application dependencies.
# This allows the container build to reuse cached dependencies.
# Expecting to copy go.mod and if present go.sum.
COPY go.* ./
RUN go mod download

# Copy local code to the container image.
COPY . ./
#COPY ./static ./static/
COPY ./templates ./templates/

# Build the binary.
RUN CGO_ENABLED=0 go build -v -o server
#RUN go build -v -o server

# Use the official Debian slim image for a lean production container.
# https://hub.docker.com/_/debian
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
#FROM debian:buster-slim
#RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
#    ca-certificates && \
#    rm -rf /var/lib/apt/lists/*
#FROM gcr.io/distroless/base-debian11
FROM cgr.dev/chainguard/static:latest

# Copy the binary to the production image from the builder stage.
#COPY --from=builder /app/server /app/server
COPY --from=builder /app/server .
COPY --from=builder /app/templates/ ./templates/

# Run the web service on container startup.
#CMD ["/app/server"]
CMD ["/server"]