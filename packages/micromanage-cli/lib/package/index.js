/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { buildDependentsCommand } from './dependents.js'
import { buildPublishCommand } from './publish.js'

function buildPackageCommand() {
  return new Command('package')
    .configureHelp({ helpWidth: 100 })
    .description('Commands that operate on packages')
    .addCommand(buildDependentsCommand())
    .addCommand(buildPublishCommand())
}

export { buildPackageCommand }
