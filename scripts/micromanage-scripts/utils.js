const { execSync } = require("child_process")
const path = require('path')

function exec(cmd) {
  return execSync(cmd).toString()
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
  const tags = tagsCommandOutput.split('\n')

  if (tags[tags.length-1] === '') {
    tags.pop() // Remove the blank entry
  }

  return tags
}

module.exports = {
  exec,
  getPackages,
  getTags
}
