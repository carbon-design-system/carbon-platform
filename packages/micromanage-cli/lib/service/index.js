/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { buildDependenciesCommand } from './dependencies.js'

function buildServiceCommand() {
  return new Command('service')
    .configureHelp({ helpWidth: 100 })
    .description('Commands that operate on services')
    .addCommand(buildDependenciesCommand())
}

export { buildServiceCommand }
