# Nightly builds

There is a GitHub Action/Workflow in place (nightly-version.yml) that automatically re-builds,
re-versions, and re-publishes all services that have changed since the previous night. Below are the
details of what happens.

1. Run `micromanage version`. This will look at each package/service in isolation and determine if
   there are any changes to it. For any that have changed, the package's changelog is updated, its
   `package.json` is updated with a new version number, and a new version tag is created and pushed
   to GitHub.

   - This includes both public and private packages.
   - If any "package" is updated, all services are forced to update too. This is because a package
     update triggers the build of a new base image, which in turn should trigger the rebuild of all
     service that depend on the base image (i.e. all of them).

1. Run `micromanage docker-push`. This builds a base image, followed by all services that have
   changed. For all services, they will be built (via the `build` script from their `package.json`
   file). Upon successful build, each service is then pushed to the IBM Container Registry.

## Manually triggering a nightly build

The Github Action linked to the `nightly-build.yml` workflow can be manually triggered from the
GitHub user interface.

![Github UI, Actions, Nightly Version, Run workflow](./images/nightly-builds-run-workflow.png)

This is useful under emergency conditions when a rebuild/republish/redeploy of packages and/or
services is needed without waiting for the next nightly build to pick up the current changes on the
main branch.
