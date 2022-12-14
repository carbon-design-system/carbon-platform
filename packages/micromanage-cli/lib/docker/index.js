/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { buildBuildCommand } from './build.js'

function buildDockerCommand() {
  return new Command('docker')
    .configureHelp({ helpWidth: 100 })
    .description('Commands to assist with Docker operations')
    .addCommand(buildBuildCommand())
}

export { buildDockerCommand }
