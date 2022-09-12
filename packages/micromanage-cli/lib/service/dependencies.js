/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { filters, getWorkspaceByName, getWorkspaces, isDependencyOf } from '../utils.js'

function buildDependenciesCommand() {
  return new Command('dependencies')
    .configureHelp({ helpWidth: 100 })
    .description('List the package dependencies of a given service')
    .option('--json', 'Output as a JSON array')
    .argument('<workspace-name>', 'Name of the service (from package.json)')
    .action(handleDependenciesCommand)
}

async function handleDependenciesCommand(workspaceName, opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage service dependencies =====')

  const workspace = getWorkspaceByName(workspaceName)
  const deps = await getWorkspaceDependencies(workspace)

  const results = deps.map((dep) => dep.name)

  if (opts.json) {
    console.log(JSON.stringify(results))
  } else {
    console.log(results.join('\n'))
  }
}

/**
 * Gets the workspace dependencies for the provided workspace. Typically this is used to get the
 * package dependencies for a service.
 *
 * @param {import('./utils.js.js').Workspace} workspace
 * @returns {Promise<Array>}
 */
async function getWorkspaceDependencies(workspace) {
  const packages = getWorkspaces().filter(filters.PACKAGES)

  const deps = []
  for (const pkg of packages) {
    const result = await isDependencyOf(pkg, workspace)
    if (result) {
      deps.push(pkg)
    }
  }

  return deps
}

export { buildDependenciesCommand, getWorkspaceDependencies }
