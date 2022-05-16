# Docker

TODO: add more stuff

## Docker run command for base image

```
docker build --tag local/carbon-platform/base:latest .
```

## Docker run command for individual service

```
docker build --tag us.icr.io/carbon-platform-test/logging:0.1.0 services/logging
```

## Docker run command for RabbitMQ messaging

```
docker run --rm --hostname rabbitmq -p 5672:5672 rabbitmq:3.8
```

## Container registry docs

https://cloud.ibm.com/docs/Registry?topic=Registry-getting-started
