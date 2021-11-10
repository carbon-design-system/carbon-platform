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
  console.log('===== micromanage version =====')

  // Ensure all tags are up-to-date with the remote
  exec('git fetch --tags')

  const updatedPackages = getUpdatedPackages()

  if (updatedPackages.length === 0) {
    console.log('nothing to do')
    return
  }

  // We have work to do, so change branch to a temp one
  exec('git switch --create micromanage-temp')

  const newVersions = versionPackages(updatedPackages)

  // Ensure lock file remains up-to-date
  exec('npm install')

  exec('git commit --allow-empty -am "chore(release): update package-lock.json and local deps"')

  exec('git switch -')

  exec('git merge --squash --autostash micromanage-temp')

  // Commit the results as a single commit with an appropriate commit message
  exec(
    "sed 's/Squashed commit of the following:/chore(release): new service versions/' " +
      '.git/SQUASH_MSG | git commit -F -'
  )

  // Create tags
  newVersions.forEach((version) => {
    exec(`git tag --delete ${version}`) // Delete the one from above so we can consolidate
    exec(`git tag -m "${version}" ${version}`)
    console.log(`tagged HEAD as ${version}`)
  })

  exec('git push')

  exec('git push --tags origin')

  // Clean up the temp branch
  exec('git branch -D micromanage-temp')
}

function getUpdatedPackages() {
  const allTags = getTags()

  // Find all workspace packages with updates since their latest tag
  const updatedPackages = getPackages().filter((pkg) => {
    const tags = allTags.filter((tag) => {
      const tagPackageName = tag.substring(0, tag.lastIndexOf('@'))
      return tagPackageName === pkg.name
    })
    const latestTag = tags[tags.length - 1]
    const changed =
      !latestTag || !!exec(`git diff --quiet HEAD ${latestTag} -- ${pkg.path} || echo changed`)

    if (changed) {
      console.log(`*** ${pkg.name} has changed since ${latestTag}`)
      return true
    } else {
      console.log(`No changes in ${pkg.name} since ${latestTag}`)
      return false
    }
  })

  // For each workspace package, check if it depends on any of the updated packages
  getPackages().forEach((packageToCheck) => {
    // Avoid adding duplicates to the updatedPackages list
    if (updatedPackages.find((updated) => updated.name === packageToCheck.name)) {
      return
    }

    // Check packageToCheck against each updated, non-private package
    updatedPackages
      .filter((pkg) => !pkg.private)
      .filter((pkg) => pkg.name !== packageToCheck.name)
      .forEach((updatedPackage) => {
        if (
          (packageToCheck.dependencies && updatedPackage.name in packageToCheck.dependencies) ||
          (packageToCheck.devDependencies && updatedPackage.name in packageToCheck.devDependencies)
        ) {
          console.log(
            `*** ${packageToCheck.name} is updating because it depends on ${updatedPackage.name}`
          )
          updatedPackages.push(packageToCheck)
        }
      })
  })

  return updatedPackages
}

function versionPackages(updatedPackages) {
  return updatedPackages.map((pkg) => {
    // Create the new version and changelog
    const versionOutput = exec(
      `cd ${pkg.path} && \
      npx standard-version --path . --tag-prefix="${pkg.name}@" --releaseCommitMessageFormat="chore(release): ${pkg.name}@{{currentTag}}"`
    )
    const newVersion = versionOutput.split('\n')[0].split(' ').pop()
    const newTag = `${pkg.name}@${newVersion}`

    console.log(`new version created: ${newTag}`)

    // Update versions in all dependent packages if the updated package is public
    if (!pkg.private) {
      updateDeps(pkg, newVersion)
    }

    return newTag
  })
}

function updateDeps(updatedPackage, newVersion) {
  console.log(`Updating local package dependencies on ${updatedPackage.name}`)

  getPackages().forEach((pkg) => {
    const dependencyBlocks = []

    // Come up with a list of dep blocks that need updating
    if (pkg.dependencies && updatedPackage.name in pkg.dependencies) {
      dependencyBlocks.push('dependencies')
    }
    if (pkg.devDependencies && updatedPackage.name in pkg.devDependencies) {
      dependencyBlocks.push('devDependencies')
    }

    dependencyBlocks.forEach((dependencyBlock) => {
      console.log(`Updating ${pkg.name}'s local ${dependencyBlock} on ${updatedPackage.name}`)
      exec(
        `npm --workspace ${pkg.path} pkg set "${dependencyBlock}.${updatedPackage.name}=${newVersion}"`
      )
    })
  })
}

module.exports = {
  buildVersionCommand
}
