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
import { buildPackageCommand } from './package/index.js'
import { buildServiceCommand } from './service/index.js'
import { logErrorInfo } from './utils.js'
import { buildVersionCommand } from './version.js'

async function main() {
  const program = new Command()
    .configureHelp({ helpWidth: 100 })
    .addCommand(buildBuildCommand())
    .addCommand(buildChangedCommand())
    .addCommand(buildPackageCommand())
    .addCommand(buildServiceCommand())
    .addCommand(buildVersionCommand())

  try {
    await program.parseAsync()
  } catch (err) {
    logErrorInfo(err)
    process.exit(1)
  }
}

await main()
