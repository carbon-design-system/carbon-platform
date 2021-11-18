# Packages - run-mode

A package that exports a function called `getRunMode()`, which returns one of three exported
constants, depending on the value of the `CARBON_RUN_MODE` environment variable.

The possible values are:

- `DEV`
- `TEST`
- `PRODUCTION`

Exporting the `CARBON_RUN_MODE` environment variable as any of these three values will cause
`getRunMode` to recognize it as the current run mode. Any other value will result in the mode being
set to `DEV`.
