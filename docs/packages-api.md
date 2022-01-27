# Packages - api

A package that exports common API utilities used across various other packages and services. These
utilities are the interfaces by which services communicate amongst each other.

The API package intentionally has no entrypoint or lib defined in its `package.json` file. It
instead has a set of top-level `js` and corresponding `d.ts` files to allow importing such as:

```ts
import { Logging } from '@carbon-platform/api/logging'
import { getRunMode } from '@carbon-platform/api/run-mode'
<<<<<<< HEAD
import { enforceEnvVars } from '@carbon-platform/api/enforce-env-vars'
```

## enforce-env-vars

Exports the enforceEnvVars utility function that manages validating environment variables accross
different run modes.

### Usage

Call the enforceEnvVars function and provide run-mode specific env vars or use the ALL key for
always-required variables NOTE: none of these keys is mandatory

```ts
import { enforceEnvVars } from '@carbon-platform/api/enforce-env-vars'

const isValid = enforceEnvVars({
  ALL: ['REQUIRED_ALL_THE_TIME'],
  PRODUCTION: ['REQUIRED_ONLY_ON_PRODUCTION'],
  DEV: ['REQUIRED_ONLY_ON_DEV'],
  TEST: ['REQUIRED_ONLY_ON_TEST']
})
```

You can optionally pass in a second parameter to avoid throwing an error when required env vars are
missing:

```ts
import { enforceEnvVars } from '@carbon-platform/api/enforce-env-vars'

const isValid = enforceEnvVars({...}, false)
=======
import { enforceEnvVars, getEnvVar } from '@carbon-platform/api/enforce-env-vars'
>>>>>>> 12cc4433f09fd47ecc63bec970efaaa4fb62a0fb
```

## enforce-env-vars

Exports utility functions that manage retrieving and validating environment variables accross
different run modes.

## logging

APIs used by services to interact with the logging service allowing error, warning, info, and debug
messages to be logged.

## run-mode

A module that exports a function called `getRunMode()`, which returns one of two constants,
depending on the value of the `CARBON_RUN_MODE` environment variable.

The possible values are:

- `DEV`
- `PROD`

Exporting the `CARBON_RUN_MODE` environment variable as either of these values will cause
`getRunMode` to recognize it as the current run mode.

If the environment variable is not set, the mode will default to `DEV`.

Setting this envvar to any other value will result in an error being thrown.
