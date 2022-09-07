/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'

import { exec, spawn } from '../utils.js'

const DEPLOY_TARGETS = ['test', 'prod']

const REQUIRED_ENV_VARS = [
  'CONTAINER_REGISTRY',
  'CONTAINER_REGISTRY_NAMESPACE',
  'CODE_ENGINE_PROJECT'
]

const RESOURCE_GROUP = 'Carbon Platform'

function buildDeployCommand() {
  return new Command('deploy')
    .configureHelp({ helpWidth: 100 })
    .description('Deploy all services to CodeEngine')
    .option('--dry-run', 'Do not make any changes. Only output prospective updates')
    .requiredOption('--target <target>', `target environment for deploy: [${DEPLOY_TARGETS}]`)
    .action(handleDeployCommand)
}

async function handleDeployCommand(options) {
  console.log('===== micromanage deploy =====')

  if (!DEPLOY_TARGETS.includes(options.target)) {
    throw new Error(`Invalid deploy target: ${options.target}`)
  }

  REQUIRED_ENV_VARS.forEach((param) => {
    if (!process.env[param]) {
      throw new Error(`${param} must be exported as an environment variable or in the .env file`)
    }
  })

  const serviceConfig = readConfigFile(
    path.join(process.cwd(), `service-config.${options.target}.json`)
  )

  // assuming both ibmcloud and codeengine(ce) plugins are installed and ibmcloud is logged in
  console.log('Setting IBM Cloud resource group')

  exec(`ibmcloud target -g "${RESOURCE_GROUP}"`)

  console.log('Selecting Code Engine project')
  exec(`ibmcloud ce project select -n ${process.env.CODE_ENGINE_PROJECT}`)

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

  if (options.dryRun) {
    return
  }

  for (const service of changedServices) {
    await deployService(service)
  }

  console.log('All services deployed')
}

function getExistingCodeEngineApps() {
  console.log('retreiving currently deployed apps')

  const deployedAppsResponse = exec('ibmcloud ce app list --output json -q')

  if (!deployedAppsResponse) {
    throw new Error('Error while retrieving existing app deployments')
  }

  return JSON.parse(deployedAppsResponse)?.items?.reduce(function (deployedApps, element) {
    const image = element?.spec?.template?.spec?.containers?.[0]?.image
    const splitImage = image?.split(':')
    const app = {
      name: element?.metadata?.name,
      uid: element?.metadata?.uid,
      image,
      imageTag: splitImage.length > 1 ? splitImage.pop() : 'latest'
    }
    if (app.name && app.uid && app.image && app.imageTag) {
      deployedApps.push(app)
    } else {
      console.log('skipping over app element due to insufficient info')
    }
    return deployedApps
  }, [])
}

function getChangedServices(serviceConfig) {
  const deployedServices = serviceConfig.deployedServices
  const changedServices = []

  const existingCEApps = getExistingCodeEngineApps()

  Object.entries(deployedServices).forEach(([name, config]) => {
    if (!config || !config.deployedVersion) {
      throw new Error(`Unable to find deployed version in service-config for service ${name}`)
    }

    const appName = name.split('/').pop()
    const currentlyDeployedService = existingCEApps.find((app) => app.name === appName)
    const versionToDeploy = config.deployedVersion

    if (!currentlyDeployedService) {
      throw new Error(`No existing service deployed with name ${name}`)
    }

    // Check if we should deploy a new version
    if (currentlyDeployedService.imageTag !== versionToDeploy) {
      changedServices.push({
        name: appName,
        prevVersion: currentlyDeployedService.imageTag,
        newVersion: versionToDeploy,
        uid: currentlyDeployedService.uid
      })
    }
  })
  return changedServices
}

function readConfigFile(filePath) {
  const f = fs.readFileSync(filePath)

  return JSON.parse(f)
}

async function deployService(changedService) {
  // assuming image tag exists in container registry

  console.log(`Deploying service ${changedService.name} at version ${changedService.newVersion}`)
  const { CONTAINER_REGISTRY, CONTAINER_REGISTRY_NAMESPACE } = process.env

  const deployImage = `${CONTAINER_REGISTRY}/${CONTAINER_REGISTRY_NAMESPACE}/${changedService.name}:${changedService.newVersion}`

  await spawn(`ibmcloud ce application update -n ${changedService.name} --image ${deployImage}`)
}

export { buildDeployCommand }
