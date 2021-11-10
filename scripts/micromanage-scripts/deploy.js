/*
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
    .argument('[environment]')
    .option('--env [env]', 'deployment environment: test | prod. Defaults to test', 'test')
    .action(handleDeployCommand)
}

function handleDeployCommand(_, options) {
  console.log('===== micromanage deploy ======')

  // Check to see if the ibmcloud cli is available. This will throw an exception if it is not
  exec('ibmcloud --version')

  const serviceConfig = require(path.join(
    process.cwd(),
    options.env === 'prod' ? 'service-config.prod.json' : 'service-config.test.json'
  ))

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
        version: changedService.newVersion
      }
    }
  }
  console.log(
    `Setting version label on ${changedService.package.name} to ${postData.metadata.labels.version}`
  )
  console.log(
    exec(
      `ibmcloud cf curl "/v3/apps/${
        changedService.guid
      }" -H 'Content-Type: application/json' -X PATCH -d '${JSON.stringify(postData)}'`
    )
  )

  console.log('All services deployed')
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
  const prodServices = serviceConfig.deployedServices
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
        newVersion: versionToDeploy,
        guid: currentlyDeployedService.guid
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
  exec(`git checkout tags/${changedService.package.name}@${changedService.newVersion}`)

  fs.copyFileSync('package-lock.json', path.join(changedService.package.path, 'package-lock.json'))
  const packageJson = require(path.join(process.cwd(), 'package.json'))
  exec(`npm pkg set engines.node="${packageJson.engines.node}"`, {
    cwd: changedService.package.path
  })
  exec(`npm pkg set engines.npm="${packageJson.engines.npm}"`, { cwd: changedService.package.path })

  // Note: `cd` doesn't stay with exec, have to provide a cwd instead

  // This will install deps in the workspace folder and adjust the package-lock file as-needed
  console.log('installing node packages...')
  console.log(exec('npm install', { cwd: changedService.package.path }))

  console.log('building...')
  console.log(exec('npm --if-present run build', { cwd: changedService.package.path }))

  if (!fs.existsSync(`./${changedService.package.path}/.cfignore`)) {
    exec('echo "node_modules" > .cfignore', { cwd: changedService.package.path })
    exec('echo ".env.local" >> .cfignore', { cwd: changedService.package.path })
  }

  //     if everything looks good, deploy it using ibmcloud cli

  console.log('pushing...')
  console.log(
    exec(`ibmcloud cf push ${changedService.package.name}`, {
      cwd: `${changedService.package.path}`
    })
  )
}

module.exports = {
  buildDeployCommand
}
