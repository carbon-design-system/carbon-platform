/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { getWorkspaceByName, spawn } from './utils.js'

function buildUninstallCommand() {
  return new Command('uninstall')
    .configureHelp({ helpWidth: 100 })
    .description('Uninstall packages from a workspace')
    .option('--dry-run', 'Do not make any changes. Only output uninstall command')
    .requiredOption('-w, --workspace <workspace-name>', 'Workspace for which to uninstall packages')
    .argument('<package-name...>', 'List of packages to uninstall')
    .action(handleUninstallCommand)
}

async function handleUninstallCommand(packageNames, opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage uninstall =====')

  const workspace = getWorkspaceByName(opts.workspace)

  const uninstallCommand = `npm --workspace ${workspace.path} uninstall ${packageNames.join(' ')}`

  console.error(uninstallCommand)

  if (!opts.dryRun) {
    await spawn(uninstallCommand)
  }
}

export { buildUninstallCommand }
