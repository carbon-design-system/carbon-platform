const { Command } = require('commander')

const utils = require('./utils')

function buildVersionCommand() {
  return (
    new Command('version')
      .description('Update the versions of all packages based on a generated changelog')
      .action(handleVersionCommand)
  )
}

function handleVersionCommand() {
  console.log('===== micromanage version =====')

  // Ensure all tags are up-to-date with the remote
  utils.exec('git fetch --tags')

  const allTags = utils.getTags()

  const packages = utils.getPackages().filter((pkg) => {
    const tags = allTags.filter((tag) => (tag.startsWith(pkg.name)))
    const latestTag = tags[tags.length-1]
    const changed =
      !latestTag ||
      !!utils.exec(`git diff --quiet HEAD ${latestTag} -- ${pkg.path} || echo changed`)

    if (changed) {
      console.log(`${pkg.name} has changed since ${latestTag}`)
      return true
    } else {
      console.log(`${pkg.name} has not changed since ${latestTag}`)
      return false
    }
  })

  if (packages.length === 0) {
    console.log('nothing to do')
    return
  }

  // We have work to do, so change branch to a temp one
  utils.exec('git switch --create micromanage-temp')

  const newVersions = packages.map((pkg) => {
    // Create the new version and changelog
    const versionOutput = utils.exec(
      `cd ${pkg.path} && \
      npx standard-version --path . --tag-prefix="${pkg.name}@" --releaseCommitMessageFormat="chore(release): ${pkg.name}@{{currentTag}}"`
    )
    const newVersion = versionOutput.split('\n')[0].split(' ').pop()
    const newTag = `${pkg.name}@${newVersion}`

    console.log(`new version created: ${newTag}`)

    return newTag
  })

  // Ensure lock file remains up-to-date
  utils.exec(`npm install && git commit --allow-empty -am "chore: update package-lock.json"`)

  // Switch back to the original branch
  utils.exec('git switch -')

  // Squash-merge all of the new version commits
  utils.exec('git merge --squash --autostash micromanage-temp')

  // Commit the results with an appropriate commit message
  utils.exec(
    `sed 's/Squashed commit of the following:/chore(release): new service versions/' .git/SQUASH_MSG | \
    git commit -F -`
  )

  // Create tags
  newVersions.forEach((version) => {
    utils.exec(`git tag --delete ${version}`) // Delete the one from above so we can consolidate
    utils.exec(`git tag -m "${version}" ${version}`)
    console.log(`tagged HEAD as ${version}`)
  })

  // Push the current branch
  utils.exec('git push')

  // Push the tags
  utils.exec('git push --tags origin')

  // Clean up the temp branch
  utils.exec('git branch -D micromanage-temp')
}

module.exports = {
  buildVersionCommand
}
