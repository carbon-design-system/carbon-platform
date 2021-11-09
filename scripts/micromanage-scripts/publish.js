/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')
const path = require('path')

const { getPackages, exec } = require('./utils')

function buildPublishCommand() {
  return new Command('publish')
    .description('Publish all non-private packages')
    .action(handlePublishCommand)
}

function handlePublishCommand() {
  console.log('===== micromanage publish =====')

  const packages = getPackages().filter((pkg) => !pkg.private)

  packages.forEach((pkg) => {
    // Get package info
    const info = JSON.parse(exec(`npm view ${pkg.name} --json`))

    // Check if a publish is needed
    if (info['dist-tags'].latest === pkg.version) {
      console.log(`No publish needed for ${pkg.name}`)
      return
    }

    console.log(`Publishing ${pkg.name}`)

    // Build
    exec(`npm run --workspace=${pkg.path} build`)

    // Add top-level license
    exec(`cp LICENSE ${pkg.path}`)

    // Publish
    console.log(exec(`npm publish --workspace=${pkg.path}`))

    // Add top-level license
    exec(`rm ${path.join(pkg.path, 'LICENSE')}`)
  })
}

module.exports = {
  buildPublishCommand
}
