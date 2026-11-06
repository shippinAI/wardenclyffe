FROM ubuntu:24.04
RUN apt-get update && apt-get install -y ca-certificates curl && rm -rf /var/lib/apt/lists/*
COPY wardenclyffe-server /usr/local/bin/wardenclyffe-server
COPY config.yaml /etc/wardenclyffe/config.yaml
ENTRYPOINT ["/usr/local/bin/wardenclyffe-server"]
CMD ["--config","/etc/wardenclyffe/config.yaml"]