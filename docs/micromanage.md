# Micromanage

Micromanage is a monorepo microservice orchestration utility. It uses npm workspaces as the
foundation for individual packages and services which contribute to a base Docker image and
cloud-deployed microservices, respectively.

# Scripts

The various scripts can be found in: [scripts/micromanage](../scripts/micromanage)

## `deploy`

Use this script to deploy to _test_ and _production_ environments

The first deployment of a service is required to be done manually. This should be done through the
IBM Cloud Code Engine UI so that appropriate variables/secrets/routes can be created.

Once done, the deploy script can be used to deploy new versions of the various services.

### Re-deploying services automatically

Succesfully merged changes to the service-config files to `deployed-services/test` and
`deployes-services/production` branches will trigger service deployments via the "Deploy Services
(Test)" or "Deploy Services (Production)" Github Action, no further user action is required.

Please note there must be an existing application deployed on IBM Cloud Code Engine in order to
enable automatic deployments on a service.

### To trigger a Service Deployment

1. Update desired service(s) entries in the service-config file of the desired environment
   deployment branch (`deployed-services/test` OR `deployed-services/production`), specifying the
   new version to be deployed in the `deployedVersion` field.

   - Note: The intended changes need to have been previously versioned (see
     [Nightly Builds](./nightly-builds.md) docs)

2. Create a PR with the updates

3. After reviews and checks, commit and Merge change into desired branch

4. A Github Deploy Action will be triggered. Output can be seen on "Actions" tab of Github
   Repository

5. Upon succesful completion of the Github Action the _changed_ service(s) deployment(s) should be
   available at it's corresponding route(s)

### Re-Deploying Manually

The deploy script can be run manually from a local clone of the repo. Please note there must be an
existing application deployed on IBM cloud in order to enable automatic deployments on a service.

1. Checkout to the desired deploy environment branch

   - for Test: `deployed-services/test`
   - for Production: `deployed-services/production`

2. Alter the service-config file with the correct service versions you need deployed (keep intact
   the services you don't want to change, these will be disregarded by the script)

3. Make sure you're logged in to IBM Cloud (`ibmcloud login --sso -r 'us-south'` OR
   `ibmcloud login --apikey [APIKEY] -r 'us-south'`)

4. From the root of the project run
   `CONTAINER_REGISTRY=[TARGET_CONTAINER_REGISTRY_URL] CONTAINER_REGISTRY_NAMESPACE=[TARGET_CONTAINER_REGISTRY_NAMESPACE] CODE_ENGINE_PROJECT=[TARGET_CODE_ENGINE_PROJECT] node scripts/micromanage deploy --target=[test | production]`

5. Upon succesful completion of the script the _changed_ service(s) deployment(s) should be
   available at it's corresponding route(s)

6. Make sure to push your service config file changes so the upstream is properly updated!

## `docker`

TODO

## `version`

TODO
