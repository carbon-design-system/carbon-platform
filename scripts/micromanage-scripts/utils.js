const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

function exec(cmd) {
  return execSync(cmd).toString().trim()
}

function getFiles(dir, extensions) {
  return extensions.map((extension) => {
    const files = exec(`find ${dir} -name "*${extension}" -type f`)
    return files.length === 0 ? [] : files.split('\n')
  }).reduce((prev, cur) => ([...prev, ...cur]), [])
}

function getPackages() {
  const packageJson = require(path.join(process.cwd(), 'package.json'))

  const packagePaths = packageJson.workspaces.packages

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
  getPackages,
  getTags
}
