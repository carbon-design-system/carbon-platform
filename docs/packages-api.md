# Packages - api

A package that exports common API utilities used across various other packages and services. These
utilities are the interfaces by which services communicate amongst each other.

The API package intentionally has no entrypoint or lib defined in its `package.json` file. It
instead has a set of top-level `js` and corresponding `d.ts` files to allow importing such as:

```ts
import { Logging } from '@carbon-platform/api/logging'
import { getRunMode } from '@carbon-platform/api/run-mode'
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
