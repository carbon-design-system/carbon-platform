/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')
const dotenv = require('dotenv')
const path = require('path')

const { buildDeployCommand } = require('./deploy')
const { buildPublishCommand } = require('./publish')
const { buildVersionCommand } = require('./version')

function main() {
  dotenv.config({ path: path.join(__dirname, '.env') })

  const program = new Command()
    .addCommand(buildDeployCommand())
    .addCommand(buildPublishCommand())
    .addCommand(buildVersionCommand())

  try {
    program.parse()
  } catch (err) {
    console.error(err)
    err.stdout && console.log('stdout: ' + err.stdout.toString())
    err.stderr && console.log('stderr: ' + err.stderr.toString())
    process.exit(1)
  }
}

main()
