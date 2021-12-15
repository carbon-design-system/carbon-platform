# Docker

TODO: add more stuff

## Docker run command for base image

docker build --tag us.icr.io/carbon-platform-test/base:0.1.0 .

## Docker run command for individual service

```bash
docker build --tag us.icr.io/carbon-platform-test/logging:0.1.0 -f services/logging-service/Dockerfile .
```
