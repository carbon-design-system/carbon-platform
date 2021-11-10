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

const REQUIRED_ENV_VARS = [
  'IBM_CLOUD_API',
  'IBM_CLOUD_API_KEY',
  'CLOUD_FOUNDRY_ORGANIZATION',
  'CLOUD_FOUNDRY_SPACE_PREFIX',
  'CLOUD_FOUNDRY_REGION'
]

const DEPLOY_TARGETS = ['test', 'prod']

function buildDeployCommand() {
  return new Command('deploy')
    .description('Deploy all services to CloudFoundry')
    .requiredOption('--target <target>', `target environment for deploy: [${DEPLOY_TARGETS}]`)
    .action(handleDeployCommand)
}

function handleDeployCommand(options) {
  console.log('===== micromanage deploy ======')

  // Check to see if the ibmcloud cli is available. This will throw an exception if it is not
  exec('ibmcloud --version')

  if (!DEPLOY_TARGETS.includes(options.target)) {
    throw new Error(`Invalid deploy target: ${options.target}`)
  }

  REQUIRED_ENV_VARS.forEach((param) => {
    if (!process.env[param]) {
      throw new Error(`${param} must be exported as an environment variable or in the .env file`)
    }
  })

  const serviceConfig = require(path.join(process.cwd(), `service-config.${options.target}.json`))

  console.log('Logging into IBM Cloud')
  exec(`ibmcloud api ${process.env.IBM_CLOUD_API}`)
  exec(
    `ibmcloud login --apikey ${process.env.IBM_CLOUD_API_KEY} -r ${process.env.CLOUD_FOUNDRY_REGION}`
  )
  exec(
    `ibmcloud target -o ${process.env.CLOUD_FOUNDRY_ORGANIZATION} -s ${process.env.CLOUD_FOUNDRY_SPACE_PREFIX}-${options.target}`
  )

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

  // Re-deploy and re-tag all changed services
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
  // Note: `cd` doesn't stay with exec, have to provide a cwd instead

  console.log(
    `Deploying service ${changedService.package.name} at version ${changedService.newVersion}`
  )

  // Checkout the git tag that we are deploying
  exec(`git checkout tags/${changedService.package.name}@${changedService.newVersion}`)

  reconcileDependencies(changedService)

  console.log('Building service')
  console.log(exec('npm --if-present run build', { cwd: changedService.package.path }))

  // Merge the top-level .gitignore with the current package's
  const gitIgnoreContents = fs.readFileSync('.gitignore').toString()
  const workspaceIgnorePath = path.join(changedService.package.path, '.gitignore')
  fs.appendFileSync(workspaceIgnorePath, '\n' + gitIgnoreContents)

  console.log('Pushing service')
  console.log(
    exec(`ibmcloud cf push ${changedService.package.name}`, {
      cwd: `${changedService.package.path}`
    })
  )
}

function reconcileDependencies(changedService) {
  const packageJson = require(path.join(process.cwd(), 'package.json'))

  console.log('Using package-lock.json from project root')
  fs.copyFileSync('package-lock.json', path.join(changedService.package.path, 'package-lock.json'))

  // Use the engine values from the top-level package.json
  console.log('Setting engine values in package.json')
  exec(`npm pkg set engines.node="${packageJson.engines.node}"`, {
    cwd: changedService.package.path
  })
  exec(`npm pkg set engines.npm="${packageJson.engines.npm}"`, { cwd: changedService.package.path })

  // This will convert dev deps to normal deps, but for this purpose, it makes no difference
  console.log('Unlinking local package dependencies')
  const allDeps = {
    ...(changedService.package.dependencies || {}),
    ...(changedService.package.devDependencies || {})
  }
  const platformPackages = Object.entries(allDeps)
    .filter(([pkg]) => pkg.startsWith('@carbon-platform/'))
    .map(([pkg, version]) => {
      return `${pkg}@${version}`
    })

  platformPackages.forEach((pkg) => {
    console.log(`Unlinking and installing ${pkg}`)
    exec(`npm install --save-exact ${pkg}`, { cwd: changedService.package.path })
  })

  // Install deps into the workspace folder and adjust the package-lock file as-needed
  console.log('Installing node modules')
  console.log(exec('npm install', { cwd: changedService.package.path }))
}

module.exports = {
  buildDeployCommand
}
