# Packages - api

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

The auth package provides common authentication assets and centralized user session management for
necessary services to consume.

See [Authentication](./authentication.md)

## logging

APIs used by services to interact with the logging service allowing error, warning, info, and debug
messages to be logged.

## messaging

APIs used by services to notify each other of requests for data or events that happen across the
platform. See [messaging](./messaging.md) for more details.

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
This corresponds to the cloud environment and in typically only used for logging purposes. The
module that exports two things:

1. An enum called `Environment` containing the values `Build`, `Test`, and `Production`.
2. A function valled `getEnvironment()`, which returns one of the three enum values, depending on
   the value of the `CARBON_ENVIRONMENT` environment variable.

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

A module that provides a runtime switch between hooks and standard code and development hooks to
make local development easier. The module that exports two things:

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
