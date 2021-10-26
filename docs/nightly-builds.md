# Nightly builds

There is a GitHub Action/Workflow in place (nightly-version.yml) that automatically re-builds,
re-versions, and re-publishes all packages and services that have changed since the previous night.
Below are the details of what happens.

1. As a prerequisite step, `micromanage link` is run against all `.ts`, `.js`, and `.scss` files for
   each package (both public and private). This will abort if any unspecified local dependencies are
   found.

1. Run `micromanage version`. This will look at each package in isolation and determine if there are
   any changes to them. For any that have changed, the package's changelog is updated, its
   package.json is updated with a new version number, and a new version tag is created and pushed to
   GitHub.

   - This includes both public and private packages.
   - Note: that this does not move forward the minimum dependency requirements specified in each
     project's `package.json` file.

1. Run `micromanage publish`. For any non-private packages, they will be built (via the `build`
   script from their `package.json` file) and re-deployed to the configured npmjs registry.

## Manually triggering a nightly build

The Github Action linked to the `nightly-build.yml` workflow can be manually triggered from the
GitHub user interface.

![Github UI, Actions, Nightly Version, Run workflow](./images/nightly-builds-run-workflow.png)

This is useful under emergency conditions when a rebuild/republish/redeploy of packages and/or
services is needed without waiting for the next nightly build to pick up the current changes on the
main branch.
