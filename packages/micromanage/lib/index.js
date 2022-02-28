#!/usr/bin/env node
/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')

const { buildDockerCommand } = require('./docker')
const { buildVersionCommand } = require('./version')
const { buildDeployCommand } = require('./deploy')
const { buildPublishCommand } = require('./publish')
const { logErrorInfo } = require('./utils')

function main() {
  const program = new Command()
    .addCommand(buildDeployCommand())
    .addCommand(buildDockerCommand())
    .addCommand(buildPublishCommand())
    .addCommand(buildVersionCommand())

  try {
    program.parse()
  } catch (err) {
    logErrorInfo(err)
    process.exit(1)
  }
}

main()
