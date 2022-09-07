/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { filters, getWorkspaceByName, getWorkspaces, isDependencyOf } from '../utils.js'

function buildDependentsCommand() {
  return new Command('dependents')
    .configureHelp({ helpWidth: 100 })
    .description('List the services that depend on a given package')
    .option('--json', 'Output as a JSON array')
    .argument('<workspace-name>', 'Name of the package (from package.json)')
    .action(handleDependentsCommand)
}

async function handleDependentsCommand(workspaceName, opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage dependencies =====')

  const workspace = getWorkspaceByName(workspaceName)
  const deps = await getDependentServices(workspace)

  const results = deps.map((dep) => dep.name)

  if (opts.json) {
    console.log(JSON.stringify(results))
  } else {
    console.log(results.join('\n'))
  }
}

/**
 * Gets the services that depend on the provided workspace. This is typically used to get the
 * services that depend on a given workspace package.
 *
 * @param {import('./utils.js.js').Workspace} workspace
 * @returns {Promise<Array>}
 */
async function getDependentServices(workspace) {
  const services = getWorkspaces().filter(filters.SERVICES)

  const dependentServices = []
  for (const svc of services) {
    const result = await isDependencyOf(workspace, svc)
    if (result) {
      dependentServices.push(svc)
    }
  }

  return dependentServices
}

export { buildDependentsCommand, getDependentServices }
