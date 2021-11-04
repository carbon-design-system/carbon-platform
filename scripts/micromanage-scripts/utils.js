/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { execSync } = require('child_process')
const path = require('path')

/**
 * Execute a command line command.
 *
 * @param {string} cmd Command to execute.
 * @returns {string} Output of the command.
 */
function exec(cmd) {
  return execSync(cmd, {
    env: {
      ...process.env
    }
  })
    .toString()
    .trim()
}

/**
 * Given a package name, find the corresponding package object.
 *
 * @param {string} packageName The name of the package to find.
 * @returns A package with the corresponding name; or undefined if one was not found.
 */
function getPackageByName(packageName) {
  return getPackages().find((pkg) => pkg.name === packageName)
}

/**
 * Given a file, find the package under which the file resides.
 *
 * @param {string} f File path.
 * @returns {object} Package object of the package containing the file.
 */
function getPackageForFile(f) {
  const packages = getPackages()

  return packages.find((pkg) => f.startsWith(pkg.path))
}

/**
 * Get all of the files in a particular directory, given some filters using the `find` utility.
 *
 * @param {string} dir Directory in which to look.
 * @param {Array} extensions File extensions to include.
 * @param {Array} [exclusions] Specific paths to exclude, formatted the way `find` expects for
 * `-not -path <path>` entries.
 * @returns {Array} Array of files.
 */
function getFiles(dir, extensions, exclusions = []) {
  exclusions = exclusions.map((exclusion) => `-not -path "${exclusion}"`)
  const exclusionsString = exclusions.join(' ')

  return extensions
    .map((extension) => {
      const files = exec(`find ${dir} -name "*${extension}" -type f ${exclusionsString}`)
      return files.length === 0 ? [] : files.split('\n')
    })
    .reduce((prev, cur) => [...prev, ...cur], [])
}

/**
 * Get an object for each package/workspace, as defined in the top-level package.json file.
 *
 * @returns {Array} Array of package info objects.
 */
function getPackages() {
  const packageJson = require(path.join(process.cwd(), 'package.json'))

  const packagePaths = packageJson.workspaces

  return packagePaths.map((packagePath) => {
    const p = require(path.join(process.cwd(), packagePath, 'package.json'))

    return {
      name: p.name,
      dependencies: p.dependencies,
      devDependencies: p.devDependencies,
      path: packagePath,
      private: !!p.private,
      version: p.version
    }
  })
}

/**
 * Get a list of all git tags, sorted by taggerdate.
 *
 * @returns {Array} Array of tags.
 */
function getTags() {
  const tagsCommandOutput = exec('git tag --sort=taggerdate')
  return tagsCommandOutput.split('\n')
}

module.exports = {
  exec,
  getFiles,
  getPackageByName,
  getPackageForFile,
  getPackages,
  getTags
}
