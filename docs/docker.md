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
docker run --rm --hostname rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.8
```

### Set up web UI in RabbitMQ

```
docker exec -ti <container_name> rabbitmq-plugins enable rabbitmq_management
docker exec -ti <container_name> rabbitmqctl add_user admin admin
docker exec -ti <container_name> rabbitmqctl set_user_tags admin administrator
```

You can then login at http://localhost:15672 with admin/admin

## Container registry docs

https://cloud.ibm.com/docs/Registry?topic=Registry-getting-started
