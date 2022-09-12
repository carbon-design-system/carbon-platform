/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command, Help } from 'commander'

import { getWorkspaceByName, spawn } from './utils.js'

function buildInstallCommand() {
  return new Command('install')
    .configureHelp({ helpWidth: 100 })
    .summary('Install workspace packages or packages into a workspace')
    .description(
      new Help().wrap(
        'If package arguments are supplied, installs the specified packages into the specified ' +
          'workspace.\n\n' +
          "Otherwise, installs the workspace's dependencies via `npm install`.",
        100,
        0
      )
    )
    .option('--dry-run', 'Do not make any changes. Only output install command')
    .requiredOption('-w, --workspace <workspace-name>', 'Workspace for which to install packages')
    .argument('[package-name...]', 'Optional list of packages to install')
    .action(handleInstallCommand)
}

async function handleInstallCommand(packageNames, opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage install =====')
  const isDryRun = !!opts.dryRun

  const workspace = getWorkspaceByName(opts.workspace)

  if (packageNames.length > 0) {
    await installPackagesIntoWorkspace(packageNames, workspace, isDryRun)
  } else {
    await installWorkspace(workspace, isDryRun)
  }
}

async function installWorkspace(workspace, isDryRun) {
  const installCommand = `npm --workspace ${workspace.path} install`

  console.error(installCommand)

  if (!isDryRun) {
    await spawn(installCommand)
  }
}

async function installPackagesIntoWorkspace(packageNames, workspace, isDryRun) {
  // For each package, if it doesn't have @latest on the end, put it on
  packageNames = packageNames.map((pkg) => {
    if (pkg.lastIndexOf('@') <= 0) {
      return pkg + '@latest'
    }
    return pkg
  })

  const installCommand = `npm --workspace ${workspace.path} install ${packageNames.join(' ')}`

  console.error(installCommand)

  if (!isDryRun) {
    await spawn(installCommand)
  }
}

export { buildInstallCommand }
