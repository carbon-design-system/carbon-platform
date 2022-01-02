/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')
const { readFileSync } = require('fs')

const { exec, getPackageByName, logErrorInfo } = require('./utils')

const REMOTE_REGISTRY = 'us.icr.io/carbon-platform'
const LOCAL_REGISTRY = 'local/carbon-platform'

function buildDockerPushCommand() {
  return new Command('docker-push')
    .description('Build and push docker images')
    .action(handleDockerPushCommand)
}

function handleDockerPushCommand() {
  console.log('===== micromanage docker-push =====')

  const updatedPackagesAndServices = readUpdatesFromStdin()
  const failures = []

  if (updatedPackagesAndServices.length === 0) {
    console.log('Nothing to do')
    return
  }

  buildBaseImage()

  // Build and push all updated services
  updatedPackagesAndServices.forEach((name) => {
    const pkg = getPackageByName(name)

    // Ensure only services are built/pushed
    if (!pkg.path.startsWith('services/')) {
      console.log(`Skipping non-service: ${name}`)
      return
    }

    const suffix = pkg.name.split('/').pop()
    const imageName = `${REMOTE_REGISTRY}/${suffix}:${pkg.version}`

    try {
      buildService(imageName, pkg.path)
      pushService(imageName)
    } catch (err) {
      failures.push(name)
      logErrorInfo(err)
    }
  })

  // Mark the whole operation as a failure by throwing an exception
  if (failures.length > 0) {
    console.error('The following services failed to build/push:')
    console.error(failures)
    throw new Error(`${failures.length} service(s) failed to build/push`)
  }
}

function readUpdatesFromStdin() {
  return JSON.parse(readFileSync(process.stdin.fd).toString())
}

function buildBaseImage() {
  console.log('Building base image')

  // Build the base image
  console.log(exec(`docker build --pull --tag ${LOCAL_REGISTRY}/base:latest .`))
}

function buildService(imageName, contextDir) {
  console.log(`Building image: ${imageName}`)
  console.log(exec(`docker build --tag ${imageName} ${contextDir}`))
}

function pushService(imageName) {
  console.log(`Pushing image: ${imageName}`)
  console.log(exec(`docker push ${imageName}`))
}

module.exports = {
  buildDockerPushCommand
}
