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
docker run --rm --hostname rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9
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

## Deploy new Code Engine app

### Pre-Requisites:

- Docker must be running
- Ibmcloud CLI must be installed
- Code Engine and Container Registry plugins must be installed for ibmcloud CLI

### Steps:

Run on CLI:

- `CARBON_RUN_MODE=STANDARD CARBON_GITHUB_TOKEN=[token] npx micromanage build --docker @carbon-platform/base`
- `CARBON_RUN_MODE=STANDARD CARBON_GITHUB_TOKEN=[token] npx micromanage build --docker @carbon-platform/[SERVICE_NAME]`
  - Note: Github token is only necessary when building web-app
- `ibmcloud login —sso`
  - select y
  - copy code from browser
  - paste
  - enter
- `ibmcloud cr login`
- `ibmcloud target -g 'Carbon Platform'`
- `ibmcloud target -r 'us-south'`
- `ibmcloud ce project select -n carbon-platform-test`
- `docker image ls` -> take note of latest image build version
- `docker image tag us.icr.io/carbon-platform/[SERVICE_NAME]:[VERSION] us.icr.io/carbon-platform-test/[SERVICE_NAME]:[VERSION]-[UNIQUE_TAG]`
- `docker image push us.icr.io/carbon-platform-test/[SERVICE_NAME]:[VERSION]-[UNIQUE_TAG]`
- `ibmcloud ce application create —name [APP_NAME] —image us.icr.io/carbon-platform-test/[SERVICE_NAME]:[VERSION]-[UNIQUE_TAG] —rs cli-created-icr-registry-secret`
- Add `CARBON_SERVICE_NAME=[SERVICE_NAME]` and `CARBON_RUN_MODE=DEV` to env variables
- Adjust runtime settings

NOTE: if any command fails, try typing it out manually, the single quotes copy weird sometimes

## Update existing Code Engine app

### Pre-Requisites:

- Docker must be running
- Ibmcloud CLI must be installed
- Code Engine and Container Registry plugins must be installed for ibmcloud CLI

### Steps:

Run on CLI:

- `CARBON_RUN_MODE=STANDARD CARBON_GITHUB_TOKEN=[token] npx micromanage build --docker @carbon-platform/base`
- `CARBON_RUN_MODE=STANDARD CARBON_GITHUB_TOKEN=[token] npx micromanage build --docker @carbon-platform/[SERVICE_NAME]`
  - Note: Github token is only necessary when building web-app
- `ibmcloud login —sso`
  - select y
  - copy code from browser
  - paste
  - enter
- `ibmcloud cr login`
- `ibmcloud target -g 'Carbon Platform'`
- `ibmcloud target -r 'us-south'`
- `ibmcloud ce project select -n carbon-platform-test`
- `docker image ls` -> take note of latest image build version
- `docker image tag us.icr.io/carbon-platform/[SERVICE_NAME]:[VERSION] us.icr.io/carbon-platform-test/[SERVICE_NAME]:[VERSION]-[UNIQUE_TAG]-[n]`
  -> change the n so we don’t have duplicates (check IBM's container registry for last n)
- `docker image push us.icr.io/carbon-platform-test/[SERVICE_NAME]:[VERSION]-[UNIQUE_TAG]-[n]`
- `ibmcloud ce application update -n [APP_NAME] --image us.icr.io/carbon-platform-test/[SERVICE_NAME]:[VERSION]-[UNIQUE_TAG]-[n]`

NOTE: if any command fails, try typing it out manually, the single quotes copy weird sometimes
