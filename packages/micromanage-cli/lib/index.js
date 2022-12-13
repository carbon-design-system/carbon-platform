#!/usr/bin/env node
/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { buildBuildCommand } from './build.js'
import { buildChangedCommand } from './changed.js'
import { buildDockerCommand } from './docker/index.js'
import { buildInstallCommand } from './install.js'
import { buildPackageCommand } from './package/index.js'
import { buildServiceCommand } from './service/index.js'
import { buildUninstallCommand } from './uninstall.js'
import { logErrorInfo } from './utils.js'
import { buildVersionCommand } from './version.js'

async function main() {
  const program = new Command()
    .configureHelp({ helpWidth: 100 })
    .addCommand(buildBuildCommand())
    .addCommand(buildChangedCommand())
    .addCommand(buildDockerCommand())
    .addCommand(buildInstallCommand())
    .addCommand(buildPackageCommand())
    .addCommand(buildServiceCommand())
    .addCommand(buildUninstallCommand())
    .addCommand(buildVersionCommand())

  try {
    await program.parseAsync()
  } catch (err) {
    logErrorInfo(err)
    throw err
  }
}

await main()
