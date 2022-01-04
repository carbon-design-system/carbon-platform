/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')

const { exec, getPackageByName } = require('./utils')

const REMOTE_REGISTRY = 'us.icr.io/carbon-platform'
const LOCAL_REGISTRY = 'local/carbon-platform'
const ENVVAR_PREFIX = 'CARBON_'

function buildDockerCommand() {
  return new Command('docker')
    .description('Management of docker images')
    .option('--build', 'Build docker image for provided service name')
    .option('--omit-base', 'Skip building a base image as the first step')
    .option('--push', 'Push built docker image to container registry')
    .argument('<service-name>', 'Name of the service on which to operate')
    .action(handleDockerCommand)
}

function handleDockerCommand(serviceName, opts) {
  console.log('===== micromanage docker =====')

  const service = getPackageByName(serviceName)

  if (!service) {
    throw new Error('Unknown service: ' + serviceName)
  }

  if (!opts.omitBase) {
    buildBaseImage()
  }

  // Ensure only services are built/pushed
  if (!service.path.startsWith('services/')) {
    console.log(`Skipping non-service: ${serviceName}`)
    return
  }

  const suffix = service.name.split('/').pop()
  const imageName = `${REMOTE_REGISTRY}/${suffix}:${service.version}`

  console.log(`Determined image name to be ${imageName}`)

  if (opts.build) {
    buildService(imageName, service.path)
  }

  if (opts.push) {
    pushService(imageName)
  }
}

function buildBaseImage() {
  console.log('Building base image')

  // Build the base image
  console.log(exec(`docker build --pull --tag ${LOCAL_REGISTRY}/base:latest .`))
}

function buildService(imageName, contextDir) {
  console.log(`Building image: ${imageName}`)

  const buildArgs = getEnvvarNames().map((envvarName) => `--build-arg ${envvarName}`)
  const buildArgsStr = buildArgs.join(' ')

  console.log(exec(`docker build --tag ${imageName} ${buildArgsStr} ${contextDir}`))
}

function getEnvvarNames() {
  return Object.keys(process.env).filter((varname) => varname.startsWith(ENVVAR_PREFIX))
}

function pushService(imageName) {
  console.log(`Pushing image: ${imageName}`)
  console.log(exec(`docker push ${imageName}`))
}

module.exports = {
  buildDockerCommand
}
