# Packages - api

A package that exports common API utilities used across various other packages and services. These
utilities are the interfaces by which services communicate amongst each other.

The API package intentionally has no entrypoint or lib defined in its `package.json` file. It
instead has a set of top-level `js` and corresponding `d.ts` files to allow importing such as:

```ts
import { Logging } from '@carbon-platform/api/logging'
import { getRunMode } from '@carbon-platform/api/run-mode'
import { enforceEnvVars, getEnvVar } from '@carbon-platform/api/enforce-env-vars'
```

## enforce-env-vars

Exports utility functions that manage retrieving and validating environment variables accross
different run modes.

## logging

APIs used by services to interact with the logging service allowing error, warning, info, and debug
messages to be logged.

## run-mode

A module that exports two things:

1. An enum called `RunMode` containing the values `Dev` and `Prod`.
2. A function called `getRunMode()`, which returns one of two enum values, depending on the value of
   the `NODE_ENV` environment variable.

`NODE_ENV` can be set to the following values:

- `development`
  - Causes `getRunMode()` to return `Dev`
- `production`
  - Causes `getRunMode()` to return `Prod`

If the `NODE_ENV` environment variable is not set, the mode will default to the "Dev" run mode.

Setting this envvar to any other value will result in an error being thrown.
