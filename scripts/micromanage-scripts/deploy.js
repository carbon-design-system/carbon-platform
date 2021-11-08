/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')
const fs = require('fs')

const { exec, getPackages } = require('./utils')

// details on only running the action when a specific file changes:
// https://github.community/t/is-it-possible-to-run-the-job-only-when-a-specific-file-changes/115484

function buildDeployCommand() {
  return new Command('deploy')
    .description('Deploy all services to CloudFoundry')
    .action(handleDeployCommand)
}

function handleDeployCommand() {
  console.log('===== micromanage deploy ======')

  if (!exec('command -v ibmcloud')) {
    throw new Error('ibmcloud cli is not installed')
  }

  const serviceConfig = require('../../service-config.json')

  ;[('ibmCloudApi', 'cloudFoundryOrganization', 'cloudFoundrySpace', 'cloudFoundryRegion')].forEach(
    (param) => {
      if (!serviceConfig.cloudFoundryConfig?.[param]) {
        throw new Error(
          `${param} must be specified in cloudFoundryConfig block in service-config.json file`
        )
      }
    }
  )

  const { cloudFoundryRegion, cloudFoundryOrganization, cloudFoundrySpace, ibmCloudApi } =
    serviceConfig.cloudFoundryConfig

  console.log('====== Setting IBMCloud API ======')
  exec(`ibmcloud api ${ibmCloudApi}`)

  console.log('====== Logging in to IBMCloud ======')
  exec(`ibmcloud login --apikey ${process.env.IBM_CLOUD_API_KEY} -r ${cloudFoundryRegion}`)

  console.log('====== Setting CF target ======')
  exec(`ibmcloud target -o ${cloudFoundryOrganization} -s ${cloudFoundrySpace}`)

  console.log('====== Getting Changed Services ======')
  const changedServices = getChangedServices(serviceConfig?.deployedServices)
  console.log('Changed Services', changedServices)

  console.log('====== Deploying Changed Services ======')
  changedServices.forEach((changedService) => {
    const { version, ...serviceWithoutVersion } = changedService
    deployService(serviceWithoutVersion, version)
  })

  console.log('====== Setting new Labels ======')
  changedServices.forEach((service) => {
    exec(
      `ibmcloud cf curl "/v3/apps/${service.guid}" -X PATH -d '{"metadata": {"labels": {"version": ${service.version}}}}'`
    )
  })
}

function getDeployedApps(appNames) {
  const deployedAppsResponse = exec(`ibmcloud cf curl "/v3/apps?names=${appNames.join(',')}" -q`)
  const deployedApps = []
  if (deployedAppsResponse) {
    try {
      deployedApps.push(
        ...JSON.parse(deployedAppsResponse)?.resources.map((r) => {
          return { name: r.name, labels: r.metadata.labels, guid: r.guid }
        })
      )
    } catch (e) {
      throw new Error('Error occured querying deployed apps from Cloud Foundry')
    }
  }
  return deployedApps
}

function getChangedServices(deployedServices) {
  const prodServices = deployedServices.production.services
  const changedServices = []

  const deployedApps = getDeployedApps(Object.keys(prodServices))

  const projectPackages = getPackages()
  // go through each key in (for now) the prod block's services
  Object.entries(prodServices).forEach(([serviceName, serviceConfig]) => {
    if (!serviceConfig || !serviceConfig.deployedVersion) {
      throw new Error(
        `No serviceConfig containing deployed service version found for service ${serviceConfig}`
      )
    }
    const deployedService = deployedApps.find((app) => app.name === serviceName)
    const servicePackage = projectPackages.find((service) => service.name === serviceName)

    if (!servicePackage) {
      throw new Error(`Could not find package details for service ${serviceName}`)
    }

    if (!deployedService) {
      throw new Error(`${serviceName} service has not been deployed before`)
    }
    // determine if service has changed through CF (or if service hasn't been deployed yet):
    // do a cf lookup for each service and compare
    // get current deployed version of service (manifest label) ,
    const deployedVersion = deployedService.labels?.version

    //    compare against tag in current deployed-services.json
    const serviceHasChanged = deployedVersion !== serviceConfig.deployedVersion
    // come up with the list of things that actually need to be redeployed
    if (serviceHasChanged) {
      changedServices.push({
        name: serviceName,
        guid: deployedService.guid,
        path: servicePackage.path,
        version: serviceConfig.deployedVersion,
        outputFolder: serviceConfig.outputFolder ?? 'dist',
        memory: serviceConfig.memory ?? '64M',
        command: serviceConfig.command ?? 'npm start'
      })
    }
  })
  return changedServices
}

function deployService(changedService, tagToDeploy) {
  console.log('deploying service:', changedService.name, tagToDeploy)
  //    checkout the git tag that we are deploying (switch branch to the target)
  exec(`git stash; git checkout tags/${changedService.name}@${tagToDeploy}`)

  //    ?? figure out if we need to copy over the package-lock to the service we're trying to deploy
  //       if we let cloudfoundry do the build, then we do need to copy this over.

  /*
  - copy package lock to workspace
  - install node modules (npm install)
  - run build
  - deploy to cloud foundry (only the build output and package.json and package-lock.json)
  - cloud foundry receives that
  - it runs npm install
  - it does docker stuff
  - it deploys it and runs `npm run start`
  */

  fs.copyFileSync('package-lock.json', `${changedService.path}/package-lock.json`)

  //     run appropriate workspace "install" and/or "build" commands for each
  exec('npm install', { cwd: changedService.path })
  exec('npm --if-present run build', { cwd: changedService.path })

  //     cd to the right place <-- // cd doesn't stay with exec, have to run cwd in context instead
  if (!fs.existsSync(`./${changedService.path}/${changedService.outputFolder}`)) {
    throw new Error(`Could not find outputFolder after build for service ${changedService.name}`)
  }
  //     if everything looks good, deploy it using ibmcloud cli
  // TODO: figure out push command, buildpack? start command? package-lock.json?

  /* exec(
`ibmcloud cf push ${changedService.name} -m ${changedService.memory} -c ${changedService.command}`,
    { cwd: `${changedService.path}` }
  )
  */
}

module.exports = {
  buildDeployCommand
}
