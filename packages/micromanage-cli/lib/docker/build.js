/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { getWorkspaceByName, spawn } from '../utils.js'

// TODO: make these configurable
const REMOTE_REGISTRY = 'us.icr.io'
const ENVVAR_PREFIX = 'CARBON_'

function buildBuildCommand() {
  return new Command('build')
    .configureHelp({ helpWidth: 100 })
    .description('Build a docker image for a workspace')
    .option('--dry-run', 'Do not perform a build. Only output the image name(s) and build command')
    .option('--json', 'Output resulting docker images as a JSON array')
    .option('--pull', 'Add the `--pull` option when running the docker build command')
    .argument('<workspace-name>', 'Name of the workspace (from package.json)')
    .action(handleBuildCommand)
}

async function handleBuildCommand(workspaceName, opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage build =====')

  const workspace = getWorkspaceByName(workspaceName, true)

  if (!workspace) {
    throw new Error('No such workspace: ' + workspaceName)
  }

  const resultingImages = await dockerBuild(workspace, opts.dryRun, opts.pull)
  if (opts.json) {
    console.log(JSON.stringify(resultingImages))
  } else {
    console.log(resultingImages.join('\n'))
  }
}

/**
 * Builds a docker image for a given workspace by using its directory path as the context dir.
 * @param {import('../utils').Workspace} workspace
 * @param {boolean} isDryRun
 */
async function dockerBuild(workspace, isDryRun, isPull) {
  const pullOpt = isPull ? '--pull' : ''
  let imageName = workspace.name.startsWith('@') ? workspace.name.substring(1) : workspace.name
  imageName = `${REMOTE_REGISTRY}/${imageName}:${workspace.version}`

  const buildArgs = getEnvvarNames().map((envvarName) => `--build-arg ${envvarName}`)
  const buildArgsStr = buildArgs.join(' ')
  const buildCmd = `docker build ${pullOpt} --tag ${imageName} ${buildArgsStr} --file ${workspace.path}/Dockerfile .`

  const latestImageName = imageName.split(':')[0] + ':latest'
  const tagCmd = `docker tag ${imageName} ${latestImageName}`

  console.error('Running build command: ', buildCmd)
  !isDryRun && (await spawn(buildCmd))

  console.error('Running tag command: ', tagCmd)
  !isDryRun && (await spawn(tagCmd))

  return [imageName, latestImageName]
}

function getEnvvarNames() {
  return Object.keys(process.env).filter((varname) => varname.startsWith(ENVVAR_PREFIX))
}

export { buildBuildCommand }
