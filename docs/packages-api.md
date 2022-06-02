# API package

A package that exports common API utilities used across various other packages and services. These
utilities are the interfaces by which services communicate amongst each other.

The API package intentionally has no entrypoint or lib defined in its `package.json` file. It
instead has a set of top-level `js` and corresponding `d.ts` files to allow importing such as:

```ts
import { Logging } from '@carbon-platform/api/logging'
import { getRunMode, loadEnvVars } from '@carbon-platform/api/runtime'
import { getPassportInstance, store } from '@carbon-platform/api/auth'
```

## auth

Provides common authentication assets and centralized user session management for necessary services
to consume.

See [Authentication](./authentication.md).

## data-graph

Provides APIs used to interact with the data graph service.

See [Data-Graph service](./services-data-graph.md).

## logging

APIs used by services to interact with the logging service allowing error, warning, info, and debug
messages to be logged.

See [Logging service](./services-logging.md).

## messaging

APIs used by services to notify each other of requests for data or events that happen across the
platform.

See [Messaging](./messaging.md).

## microservice

APIs and utilities used to build and manage Platform Microservices.

See [Platform microservices](./platform-microservices.md).

## runtime

A set of modules relating to runtime configuration of services on the platform.

### debug

Exports a utility function that indicates whether or not the current node process is running in
debug mode.

### env-vars

Exports a utility function that manages retrieving and validating environment variables across
different run modes.

### environment

A module that indicates the type of runtime environment in which the service/process is running.
This is mostly used by deployments as a switch for service endpoint URLs or other configuration-type
data. It contains the following:

1. An enum called `Environment` containing the values `Build`, `Test`, and `Production`.
2. A function valled `getEnvironment()`, which returns one of the three enum values, depending on
   the value of the `CARBON_ENVIRONMENT` environment variable.
3. A function called `withEnvironment()`, which takes a string as input and returns a version of
   that string with the environment incorporated in a deterministic way.

`CARBON_ENVIRONMENT` can be set to the following values:

- `BUILD`
  - Causes `getEnvironment()` to return `Environment.Build`
- `TEST`
  - Causes `getEnvironment()` to return `Environment.Test`
- `PRODUCTION`
  - Causes `getEnvironment()` to return `Environment.Production`

If the `CARBON_ENVIRONMENT` environment variable is not set, the mode will default to `Test`.

Setting this env var to any other value will result in an error being thrown.

### run-mode

A module that provides a runtime switch between standard code and development hooks to make local
development easier. The module exports two things:

1. An enum called `RunMode` containing the values `Dev` and `Standard`.
2. A function called `getRunMode()`, which returns one of two enum values, depending on the value of
   the `CARBON_RUN_MODE` environment variable.

`CARBON_RUN_MODE` can be set to the following values:

- `DEV`
  - Causes `getRunMode()` to return `RunMode.Dev`
- `STANDARD`
  - Causes `getRunMode()` to return `RunMode.Standard`

If the `CARBON_RUN_MODE` environment variable is not set, the mode will default to the "Dev" run
mode.

Setting this env var to any other value will result in an error being thrown.
