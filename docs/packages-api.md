# Packages - api

A package that exports common API utilities used across various other packages and services. These
utilities are the interfaces by which services communicate amongst each other.

The API package intentionally has no entrypoint or lib defined in its `package.json` file. It
instead has a set of top-level `js` and corresponding `d.ts` files to allow importing such as:

```ts
import { Logging } from '@carbon-platform/api/logging'
import { getRunMode } from '@carbon-platform/api/run-mode'
import { enforceEnvVars } from '@carbon-platform/api/enforce-env-vars'
```

## enforce-env-vars

Exports the enforceEnvVars utility function that manages validating environment variables accross
different run modes.

### Usage

Call the enforveEnvVars function and provide run-mode specific env vars or use the ALL key for
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
```

## logging

APIs used by services to interact with the logging service allowing error, warning, info, and debug
messages to be logged.

## run-mode

A package that exports a function called `getRunMode()`, which returns one of two constants,
depending on the value of the `CARBON_RUN_MODE` environment variable.

The possible values are:

- `DEV`
- `PRODUCTION`

Exporting the `CARBON_RUN_MODE` environment variable as either of these values will cause
`getRunMode` to recognize it as the current run mode. Any other value will result in the mode being
set to `DEV`.
