const { Command } = require('commander')

const utils = require('./utils')

function buildPublishCommand() {
  return (
    new Command('publish')
      .description('Publish all non-private packages')
      .action(handlePublishCommand)
  )
}

function handlePublishCommand() {
  const packages = utils.getPackages().filter((pkg) => (!pkg.private))

  packages.forEach((pkg) => {
    // Get package info
    const info = JSON.parse(utils.exec(`npm view ${pkg.name} --json`))

    if (info['dist-tags'].latest !== pkg.version) {
      console.log(utils.exec(`npm publish --workspace=${pkg.path}`))
    } else {
      console.log(`No publish needed for ${pkg.name}`)
    }

  })
}

module.exports = {
  buildPublishCommand
}
