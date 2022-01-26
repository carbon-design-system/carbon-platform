# Micromanage

Micromanage is a monorepo microservice orchestration utility. It uses npm workspaces as the
foundation for individual packages and services which contribute to a base Docker image and
cloud-deployed microservices, respectively.

# Scripts

The various scripts can be found in: [scripts/micromanage](../scripts/micromanage)

## `deploy`

TODO

NOTES FOR EVENTUAL DOC CONVERSION TO CODE ENGINE:

```bash
ibmcloud ce application create --name logging-test-cli --image us.icr.io/carbon-platform-test/logging:0.1.0 -c "npm run start" --rs jdharvey-ce-cli-registry-secret
```

## `docker`

TODO

## `version`

TODO
