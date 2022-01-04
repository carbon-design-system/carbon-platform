/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')

const { exec, getTags, getPackages } = require('./utils')

function buildVersionCommand() {
  return new Command('version')
    .description('Update the versions of all packages based on a generated changelog')
    .action(handleVersionCommand)
}

function handleVersionCommand() {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage version =====')

  // Ensure all tags are up-to-date with the remote
  exec('git fetch --tags')

  const updatedPackagesAndServices = getUpdatedPackagesAndServices()

  if (updatedPackagesAndServices.length === 0) {
    console.error('Nothing to do')
    console.log('[]')
    return
  }

  // We have work to do, so change branch to a temp one
  exec('git switch --create micromanage-temp')

  const newVersions = versionPackagesAndServices(updatedPackagesAndServices)

  // Ensure lock file remains up-to-date
  exec('npm install')

  exec('git commit --allow-empty -am "chore(release): update package-lock.json and local deps"')

  exec('git switch -')

  exec('git merge --squash --autostash micromanage-temp')

  // Commit the results as a single commit with an appropriate commit message
  exec(
    "sed 's/Squashed commit of the following:/chore(release): new package and service versions/' " +
      '.git/SQUASH_MSG | git commit -F -'
  )

  // Create tags
  newVersions.forEach((version) => {
    exec(`git tag --delete ${version}`) // Delete the one from above so we can consolidate
    exec(`git tag -m "${version}" ${version}`)
    console.error(`tagged HEAD as ${version}`)
  })

  exec('git push')

  exec('git push --tags origin')

  // Clean up the temp branch
  exec('git branch -D micromanage-temp')

  // Output all updated packages to stdout
  const updatedPackageAndServiceNames = updatedPackagesAndServices.map((pkg) => pkg.name)
  console.log(JSON.stringify(updatedPackageAndServiceNames))
}

function getUpdatedPackagesAndServices() {
  const allTags = getTags()

  // Find all workspace packages/services with updates since their latest tag
  const updatedPackagesAndServices = getPackages().filter((pkg) => {
    const tags = allTags.filter((tag) => {
      const tagPackageName = tag.substring(0, tag.lastIndexOf('@'))
      return tagPackageName === pkg.name
    })
    const latestTag = tags[tags.length - 1]
    const changed =
      !latestTag || !!exec(`git diff --quiet HEAD ${latestTag} -- ${pkg.path} || echo changed`)

    if (changed) {
      console.error(`*** ${pkg.name} has changed since ${latestTag}`)
      return true
    } else {
      console.error(`No changes in ${pkg.name} since ${latestTag}`)
      return false
    }
  })

  // If the list of updates contains any "packages", mark all "services" as needing an update too
  const isAnyPackageUpdated = updatedPackagesAndServices.find((pkg) => {
    return pkg.path.startsWith('packages/')
  })

  if (isAnyPackageUpdated) {
    getPackages()
      // Filter out packages/services already included in the list
      .filter((pkg) => !updatedPackagesAndServices.find((updated) => updated.name === pkg.name))
      // Filter out packages that are not "services"
      .filter((pkg) => pkg.path.startsWith('services/'))
      .forEach((updatedService) => {
        updatedPackagesAndServices.push(updatedService)
      })
  }

  return updatedPackagesAndServices
}

function versionPackagesAndServices(updatedPackages) {
  return updatedPackages.map((pkg) => {
    // Create the new version and changelog
    const versionOutput = exec(
      `cd ${pkg.path} && \
      npx standard-version --path . --tag-prefix="${pkg.name}@" --releaseCommitMessageFormat="chore(release): ${pkg.name}@{{currentTag}}"`
    )
    const newVersion = versionOutput.split('\n')[0].split(' ').pop()
    const newTag = `${pkg.name}@${newVersion}`

    console.error(`new version created: ${newTag}`)

    return newTag
  })
}

module.exports = {
  buildVersionCommand
}
