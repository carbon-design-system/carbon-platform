const { Command } = require('commander')

const utils = require('./utils')

function buildAddCommand() {
  return (
    new Command('add')
      .description('Add a package to a workspace via "npm install"')
      .argument('<package>', 'Package name to install')
      .requiredOption('--into <workspacePath>', 'Path of the workspace into which to install the package')
      .option('--save-dev', 'Optionally saves the package as a dev dependency')
      .action(handleAddCommand)
  )
}

function handleAddCommand(pkg, opts) {
  utils.exec(`npm install --workspace=${opts.into} ${opts.saveDev ? '--save-dev' : ''} ${pkg}`)
}

module.exports = {
  buildAddCommand
}
