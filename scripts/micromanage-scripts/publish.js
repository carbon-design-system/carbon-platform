const { Command } = require('commander')
const path = require('path')

const utils = require('./utils')

function buildPublishCommand() {
  return (
    new Command('publish')
      .description('Publish all non-private packages')
      .action(handlePublishCommand)
  )
}

function handlePublishCommand() {
  console.log('===== micromanage publish =====')

  const packages = utils.getPackages().filter((pkg) => (!pkg.private))

  packages.forEach((pkg) => {
    // Get package info
    const info = JSON.parse(utils.exec(`npm view ${pkg.name} --json`))

    // Check if a publish is needed
    if (info['dist-tags'].latest === pkg.version) {
        console.log(`No publish needed for ${pkg.name}`)
      return
    }

    console.log(`Publishing ${pkg.name}`)

    // Build
    utils.exec(`npm run --workspace=${pkg.path} build`)

    // Add top-level license
    utils.exec(`cp LICENSE ${pkg.path}`)

    // Publish
    console.log(utils.exec(`npm publish --workspace=${pkg.path}`))

    // Add top-level license
    utils.exec(`rm ${path.join(pkg.path, 'LICENSE')}`)
  })
}

module.exports = {
  buildPublishCommand
}
