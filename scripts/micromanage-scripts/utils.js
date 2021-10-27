/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { execSync } = require('child_process')
const path = require('path')

function exec(cmd) {
  return execSync(cmd, {
    env: {
      ...process.env
    }
  })
    .toString()
    .trim()
}

function getPackageForFile(f) {
  const packages = getPackages()

  return packages.find((pkg) => f.startsWith(pkg.path))
}

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

function getPackages() {
  const packageJson = require(path.join(process.cwd(), 'package.json'))

  const packagePaths = packageJson.workspaces

  return packagePaths.map((packagePath) => {
    const p = require(path.join(process.cwd(), packagePath, 'package.json'))

    return {
      name: p.name,
      dependencies: p.dependencies,
      path: packagePath,
      private: !!p.private,
      version: p.version
    }
  })
}

function getTags() {
  const tagsCommandOutput = exec('git tag --sort=taggerdate')
  return tagsCommandOutput.split('\n')
}

module.exports = {
  exec,
  getFiles,
  getPackageForFile,
  getPackages,
  getTags
}
