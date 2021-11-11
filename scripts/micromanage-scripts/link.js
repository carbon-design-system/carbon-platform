/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')

const { getPackages, getPackageForFile, exec } = require('./utils')

const fileExtensions = ['ts', 'tsx', 'js', 'jsx', 'scss']

function buildLinkCommand() {
  return new Command('link')
    .description('Find usages of local packages and add them to package.json files')
    .argument('<file...>')
    .action(handleLinkCommand)
}

function handleLinkCommand(files) {
  console.log('===== micromanage link =====')

  let isDirty = false
  const packages = getPackages()
  files = files.filter((file) => fileExtensions.includes(file.split('.').pop()))

  files.forEach((file) => {
    // Get the package that contains this file
    const pkg = getPackageForFile(file)

    if (!pkg) {
      return
    }

    console.log(`Searching ${file}`)

    // Search the file for each package name
    packages.forEach((needle) => {
      let searchResult = null
      try {
        searchResult = exec(`grep "${needle.name}" ${file}`)
      } catch (e) {
        // Grep exits with 1 when no results were found
        if (e.status !== 1) {
          throw e
        }
      }

      if (searchResult && !(pkg.dependencies && needle.name in pkg.dependencies)) {
        console.warn(`[WARN] Unspecified dependency on ${needle.name} found in package ${file}`)
        exec(`npm --workspace ${pkg.path} install --save-exact ${needle.name}`)
        isDirty = true
      }
    })
  })

  if (isDirty) {
    console.warn('Link command added missing dependencies. Review and commit as needed')
    process.exit(1)
  }

  console.log('Done')
}

module.exports = {
  buildLinkCommand
}
