---
title: Micro Management Scripts
---

# Micro Management Scripts

Various Automation Scripts can be found in
[scripts/micromanage-scripts](../scripts/micromanage-scripts)

## Deploy

Use this script to deploy to _test_ and _prod_ environments

### Deploying A New Service

The first deployment of a service is required to be done manually.

1. Copy package-lock.json from root into service's folder

2. Add following lines at end of service's package.json

   ```
       "engines": {
       "node": ">=16",
       "npm": ">=8"
   }
   ```

3. Reinstall @carbon-platform/ packages. e.g.,
   `npm install --save-exact @carbon-platform/icons@0.0.4`

   - Note: do this for all dependencies and devDependencies that start with @carbon-platform

4. Install Packages `npm install`

5. Run build command for new service (likely `npm run build` in service folder)

6. Create .cfignore file in service folder. Include node_modules/ and other desired files

   ```
       node_modules/
   ```

7. log in to IBM Cloud CLI `ibmcloud login`

   - Note: use --sso option to login with SSO

8. Set IBM Cloud target
   `ibmcloud target -r [REGION] -o [ORGANIZATION] -g [RESOURCE_GROUP] -s [SPACE]`

9. Run Push Command `ibmcloud cf push [APP_NAME]`

### Re-deploying Services

Succesfully merged changes in [service-config.test.json](service-config.test.json) or
[service-config.prod.json](service-config.prod.json) to `main` branch will trigger service
deployments via the "Deploy Test Services","Deploy Production Services" Github Actions, no further
user action is required.

Please note there must be an existing application deployed on IBM cloud in order to enable automatic
deployments on a service. See [Deploying A New Service](#deploying-a-new-service)

To trigger a Service Deployment

1. Update desired service(s) entries in [service-config.test.json](service-config.test.json) or
   [service-config.prod.json](service-config.prod.json), specifying the new version to be deployed
   in the `deployedVersion` field.

   - Note: The intended changes need to have been previously built and versioned (see
     [Nightly Builds](./nightly-builds.md) docs)

2. Commit and Merge change into `main` branch

3. A Github Deploy Action will be triggered. Output can be seen on "Actions" tab of Github
   Repository

4. Upon succesful completion of the Github Action the _changed_ service(s) deployment(s) should be
   available at it's corresponding route(s)

### Re-Deploying Manually

Deploy script can be run manually from local project. Please note there must be an existing
application deployed on IBM cloud in order to enable automatic deployments on a service. See
[Deploying A New Service](#deploying-a-new-service)

1. Copy the `/scripts/micromanage-scripts/.env.example` file and rename to `.env`

2. Fill the IBM Cloud config tokens located in that file with desired IBM Cloud targets

   - Note: for CLOUD_FOUNDRY_SPACE_PREFIX, `test` and `prod` spaces must be registered in IBM Cloud,
     e.g., If CLOUD_FOUNDRY_SPACE_PREFIX is "carbon", "carbon-test" and "carbon-prod" must be
     registered in IBM Cloud.

3. From the root of the project run `npm run deploy -- --target=test` - or, alternatively
   `node scripts/micromanage-scripts deploy --target test`-

## Link Packages

## Publish Packages

## Version Packages
