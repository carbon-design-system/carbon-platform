/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { getWorkspaceByName, spawn } from './utils.js'

function buildBuildCommand() {
  return new Command('build')
    .configureHelp({ helpWidth: 100 })
    .description('Build a workspace by its workspace name')
    .option('--dry-run', 'Do not perform a build. Only output the build command')
    .argument('<workspace-name>', 'Name of the workspace (from package.json)')
    .action(handleBuildCommand)
}

async function handleBuildCommand(workspaceName, opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage build =====')

  const workspace = getWorkspaceByName(workspaceName)

  if (!workspace) {
    throw new Error('No such workspace: ' + workspaceName)
  }

  await build(workspace, opts.dryRun)
}

/**
 * Builds a workspace via its npm `build` script, if present. This command will succeed even if a
 * build script is not found for the given workspace.
 * @param {import('./utils').Workspace} workspace
 * @param {boolean} isDryRun
 */
async function build(workspace, isDryRun) {
  const buildCmd = `npm --workspace ${workspace.path} run --if-present build`

  console.error('Running build command: ', buildCmd)
  !isDryRun && (await spawn(buildCmd))
}

export { buildBuildCommand }
