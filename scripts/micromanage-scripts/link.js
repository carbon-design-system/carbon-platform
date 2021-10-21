const path = require('path')
const { Command } = require('commander')

const utils = require('./utils')

function buildLinkCommand() {
  return (
    new Command('link')
      .description('Find usages of local packages and add them to package.json files')
      .requiredOption('--ext <extensions...>')
      .action(handleLinkCommand)
  )
}

function handleLinkCommand(opts) {
  let isDirty = false
  const packages = utils.getPackages()

  packages.forEach((pkg) => {
    console.log(`searching for local deps in package ${pkg.name}`)

    const files = utils.getFiles(pkg.path, opts.ext)

    packages.forEach((needle) => {
      let searchResult = null
      try {
        searchResult = utils.exec(`grep "${needle.name}" ${files.join(' ')}`)
      } catch (e) {
        // Grep exits with 1 when no results were found
        if (e.status !== 1) {
          throw e
        }
      }

      if (searchResult && !(pkg.dependencies && needle.name in pkg.dependencies)) {
        console.log(`unspecified dependency on ${needle.name} found in package ${pkg.name}`)
        utils.exec(`npm --workspace ${pkg.path} install ${needle.name}`)
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
