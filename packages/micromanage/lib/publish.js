/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')
const path = require('path')

const { getWorkspaceByName, exec } = require('./utils')

function buildPublishCommand() {
  return new Command('publish')
    .description('Publish a package to npmjs')
    .option('--dry-run', 'Do not make any changes. Only output prospective updates')
    .argument('<package-name>', 'Name of the package to publish')
    .action(handlePublishCommand)
}

function handlePublishCommand(packageName, opts) {
  console.log('===== micromanage publish =====')

  const pkg = getWorkspaceByName(packageName)
  const dryRun = opts.dryRun ? '--dry-run' : ''

  if (!pkg) {
    throw new Error('Unknown package: ' + packageName)
  }

  // Ensure only packages are published
  if (!pkg.path.startsWith('packages/')) {
    throw new Error(`${packageName} is not a package`)
  }

  // Don't publish private packages
  if (pkg.private) {
    throw new Error(`${packageName} is marked as private`)
  }

  console.log(`Publishing ${pkg.name}`)

  // Build
  exec(`npm run --if-present --workspace=${pkg.path} build`)

  // Add top-level license
  exec(`cp LICENSE ${pkg.path}`)

  // Publish
  console.log(exec(`npm publish --workspace=${pkg.path} ${dryRun}`))

  // Remove top-level license
  exec(`rm ${path.join(pkg.path, 'LICENSE')}`)
}

module.exports = {
  buildPublishCommand
}
