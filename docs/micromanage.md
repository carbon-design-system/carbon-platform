---
title: Micromanage
---

# Micromanage

Micromanage is a monorepo microservice orchestration utility. It uses npm workspaces as the
foundation for individual packages and services which contribute to a base Docker image and
cloud-deployed microservices, respectively.

# Scripts

The various scripts can be found in: [scripts/micromanage-scripts](../scripts/micromanage-scripts)

## `deploy`

Use this script to deploy to _test_ and _prod_ environments

The first deployment of a service is required to be done manually. This should be done through the
IBM Cloud UI so that appropriate variables/secrets/routes can be created.

Once done, the deploy script can be used to deploy new versions of the service. The deploy script
does the following from the service's directory:

1. Copy `package-lock.json` from root into service's folder

2. Add following lines to the service's `package.json`

   ```
   "engines": {
       "node": ">=16",
       "npm": ">=8"
   }
   ```

3. Reinstall `@carbon-platform` packages to convert local links into npmjs.com-resolved packages.
   e.g., `npm install --save-exact @carbon-platform/icons@0.0.4`

   - This is done for all dependencies and devDependencies that start with `@carbon-platform`

4. Install Packages via `npm install`

5. Run build command (`npm run build`)

6. Combine the root-level .cfignore file with one in the service's directory.

7. Log in to IBM Cloud CLI `ibmcloud login`

   - Note: use --sso option to login with SSO

8. Set IBM Cloud target
   `ibmcloud target -r [REGION] -o [ORGANIZATION] -g [RESOURCE_GROUP] -s [SPACE]`

9. Run the push command `ibmcloud cf push [APP_NAME]`

### Re-deploying services automatically

Succesfully merged changes in [service-config.test.json](../service-config.test.json) or
[service-config.prod.json](../service-config.prod.json) to `main` branch will trigger service
deployments via the "Deploy Test Services" or "Deploy Production Services" Github Action, no further
user action is required.

Please note there must be an existing application deployed on IBM cloud in order to enable automatic
deployments on a service.

### To trigger a Service Deployment

1. Update desired service(s) entries in [service-config.test.json](../service-config.test.json) or
   [service-config.prod.json](../service-config.prod.json), specifying the new version to be
   deployed in the `deployedVersion` field.

   - Note: The intended changes need to have been previously versioned (see
     [Nightly Builds](./nightly-builds.md) docs)

2. Create a PR with the updates

3. After reviews and checks, commit and Merge change into `main` branch

4. A Github Deploy Action will be triggered. Output can be seen on "Actions" tab of Github
   Repository

5. Upon succesful completion of the Github Action the _changed_ service(s) deployment(s) should be
   available at it's corresponding route(s)

### Re-Deploying Manually

The deploy script can be run manually from a local clone of the repo. Please note there must be an
existing application deployed on IBM cloud in order to enable automatic deployments on a service.

1. Copy the `/scripts/micromanage-scripts/.env.example` file and rename to `.env`

2. Fill the IBM Cloud config tokens located in that file with desired IBM Cloud targets

   - Note: for `CLOUD_FOUNDRY_SPACE_PREFIX`, `test` and `prod` spaces must be registered in IBM
     Cloud, e.g., If `CLOUD_FOUNDRY_SPACE_PREFIX` is "carbon", "carbon-test" and "carbon-prod" must
     be registered in IBM Cloud.

3. Alter the [service-config.test.json](../service-config.test.json) or
   [service-config.prod.json](../service-config.prod.json) file appropriately.

4. From the root of the project run `scripts/micromanage deploy --target=test`

NOTES FOR EVENTUAL DOC CONVERSION TO CODE ENGINE:

```bash
ibmcloud ce application create --name logging-test-cli --image us.icr.io/carbon-platform-test/logging:0.1.0 -c "npm run start" --rs jdharvey-ce-cli-registry-secret
```

SIGTERM when autoscale policy stops all running instances. Need to handle gracefully if a service
cares.

## `docker-push`

TODO

## `version`

TODO
