/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')
const fs = require('fs')
const path = require('path')

const { exec, getPackageByName } = require('./utils')

const REQUIRED_CONFIG_PARAMS = [
  'ibmCloudApi',
  'cloudFoundryOrganization',
  'cloudFoundrySpace',
  'cloudFoundryRegion'
]

function buildDeployCommand() {
  return new Command('deploy')
    .description('Deploy all services to CloudFoundry')
    .action(handleDeployCommand)
}

function handleDeployCommand() {
  console.log('===== micromanage deploy ======')

  // Check to see if the ibmcloud cli is available. This will throw an exception if it is not
  exec('ibmcloud --version')

  const serviceConfig = require(path.join(process.cwd(), 'service-config.json'))

  if (!process.env.IBM_CLOUD_API_KEY) {
    throw new Error('IBM_CLOUD_API_KEY must be exported as an environment variable')
  }

  REQUIRED_CONFIG_PARAMS.forEach((param) => {
    if (!serviceConfig.cloudFoundryConfig?.[param]) {
      throw new Error(
        `${param} must be specified in cloudFoundryConfig block in service-config.json file`
      )
    }
  })

  const { cloudFoundryRegion, cloudFoundryOrganization, cloudFoundrySpace, ibmCloudApi } =
    serviceConfig.cloudFoundryConfig

  console.log('Logging into IBM Cloud')
  exec(`ibmcloud api ${ibmCloudApi}`)
  exec(`ibmcloud login --apikey ${process.env.IBM_CLOUD_API_KEY} -r ${cloudFoundryRegion}`)
  exec(`ibmcloud target -o ${cloudFoundryOrganization} -s ${cloudFoundrySpace}`)

  console.log('Getting changed services')
  const changedServices = getChangedServices(serviceConfig)
  const numChangedServices = Object.keys(changedServices).length

  if (numChangedServices > 0) {
    const prefix = numChangedServices === 1 ? 'service has' : 'services have'
    console.log(`*** ${numChangedServices} ${prefix} changed and will be deployed`)
    console.log(changedServices)
  } else {
    console.log('No services have changed. Nothing to do')
  }

  // Redeploy all changed services
  changedServices.forEach((changedService) => {
    deployService(changedService)
    tagService(changedService)
  })
}

function tagService(changedService) {
  const postData = {
    metadata: {
      labels: {
        version: changedService.version
      }
    }
  }
  console.log(
    `Setting version label on ${changedService.name} to ${postData.metadata.labels.version}`
  )
  exec(
    `ibmcloud cf curl "/v3/apps/${changedService.guid}" -X PATH -d '${JSON.stringify(postData)}'`
  )
}

function getExistingCloudApps(appNames) {
  const deployedAppsResponse = exec(`ibmcloud cf curl "/v3/apps?names=${appNames.join(',')}" -q`)
  const deployedApps = []
  if (deployedAppsResponse) {
    deployedApps.push(
      ...JSON.parse(deployedAppsResponse)?.resources.map((r) => {
        return { name: r.name, labels: r.metadata.labels, guid: r.guid }
      })
    )
  }
  return deployedApps
}

function getChangedServices(serviceConfig) {
  // TODO: incorporate sandbox as well
  const prodServices = serviceConfig.deployedServices.production
  const changedServices = []

  const existingCloudApps = getExistingCloudApps(Object.keys(prodServices))

  Object.entries(prodServices).forEach(([name, config]) => {
    if (!config || !config.deployedVersion) {
      throw new Error(`Unable to find deployed version in service-config for service ${name}`)
    }

    const servicePackage = getPackageByName(name)
    const currentlyDeployedService = existingCloudApps.find((app) => app.name === name)
    const versionToDeploy = config.deployedVersion

    if (!servicePackage) {
      throw new Error(`Could not find package details for service ${name}`)
    }

    if (!currentlyDeployedService) {
      throw new Error(`No existing service deployed with name ${name}`)
    }

    // Check if we should deploy a new version
    if (currentlyDeployedService.labels?.version !== versionToDeploy) {
      changedServices.push({
        package: servicePackage,
        prevVersion: currentlyDeployedService.labels?.version,
        newVersion: versionToDeploy
      })
    }
  })
  return changedServices
}

function deployService(changedService) {
  console.log(
    `Deploying service ${changedService.package.name} at version ${changedService.newVersion}`
  )

  //    checkout the git tag that we are deploying (switch branch to the target)
  exec('git stash push')
  exec(`git switch tags/${changedService.package.name}@${changedService.newVersion}`)

  fs.copyFileSync('package-lock.json', path.join(changedService.package.path, 'package-lock.json'))

  // Note: `cd` doesn't stay with exec, have to provide a cwd instead

  // This will install deps in the workspace folder and adjust the package-lock file as-needed
  exec('npm install', { cwd: changedService.package.path })

  exec('npm --if-present run build', { cwd: changedService.package.path })

  //     if everything looks good, deploy it using ibmcloud cli
  // TODO: figure out push command, buildpack? start command? package-lock.json?

  /* exec(
`ibmcloud cf push ${changedService.name} -c ${changedService.command}`,
    { cwd: `${changedService.path}` }
  )
  */
}

module.exports = {
  buildDeployCommand
}
