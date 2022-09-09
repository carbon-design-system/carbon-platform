# Micromanage CLI package

Docs for micromanage are located in the package's [README.md](../packages/micromanage-cli/README.md)
file.

## Legacy `deploy` docs (Deprecated)

Use this command to deploy to _test_ and _production_ environments

The first deployment of a service is required to be done manually. This should be done through the
IBM Cloud Code Engine UI so that appropriate variables/secrets/routes can be created.

Once done, the deploy command can be used to deploy new versions of the various services.

### Re-deploying services automatically

Successfully merged changes to the service-config files to `deployed-services/test` and
`deployed-services/production` branches will trigger service deployments via the "Deploy Services
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

5. Upon successful completion of the Github Action the _changed_ service(s) deployment(s) should be
   available at it's corresponding route(s)

### Re-Deploying Manually

Thought it is typically not needed, the deploy command can be run manually from a local clone of the
repo. Please note that there must be an existing application deployed on IBM cloud in order to
enable automatic deployments of a service and that you must have the values for the environment
variables specified below in order to perform a service deploy.

1. Checkout to the desired deploy environment branch

   - for Test: `deployed-services/test`
   - for Production: `deployed-services/production`

2. Alter the service-config file with the correct service versions you need deployed (keep intact
   the services you don't want to change, these will be disregarded by the command)

3. Make sure you're logged in to IBM Cloud:

   ```
   ibmcloud plugin install code-engine
   ibmcloud login --apikey <API_KEY> -r 'us-south'
   ```

4. From the root of the project run

   ```
   export CONTAINER_REGISTRY=...
   export CONTAINER_REGISTRY_NAMESPACE=...
   export CODE_ENGINE_PROJECT=...
   npx micromanage deploy --target=[test|prod]
   ```

5. Upon successful completion of the script the _changed_ services will be deployed to the cloud
   provider.

6. Make sure to push your service config file changes so the upstream is properly updated!
