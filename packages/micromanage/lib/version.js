/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')

const { exec, getTags, getWorkspaces } = require('./utils')

function buildVersionCommand() {
  return new Command('version')
    .description('Update the versions of all workspaces based on a generated changelog')
    .option('--dry-run', 'Do not make any changes. Only output prospective updates')
    .action(handleVersionCommand)
}

function handleVersionCommand(opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage version =====')

  // Ensure all tags are up-to-date with the remote
  exec('git fetch --tags')

  const updatedWorkspaces = getUpdatedWorkspaces()

  if (updatedWorkspaces.length === 0) {
    console.error('Nothing to do')
    echoJobOutput([])
    return
  }

  if (!opts.dryRun) {
    // We have work to do so change branch to a temp one
    exec('git switch --create micromanage-temp')
  }

  const newVersions = versionWorkspaces(updatedWorkspaces, opts.dryRun)

  if (!opts.dryRun) {
    // Ensure lock file remains up-to-date
    exec('npm install')

    exec(
      'git commit --allow-empty -am "chore(release): update package-lock.json with new versions"'
    )

    exec('git switch -')

    exec('git merge --squash --autostash micromanage-temp')

    // Commit the results as a single commit with an appropriate commit message
    exec(
      "sed 's/Squashed commit of the following:/chore(release): new package and service versions/' " +
        '.git/SQUASH_MSG | git commit -F -'
    )

    // Create tags
    newVersions.forEach((newVersionObj) => {
      exec(`git tag --delete ${newVersionObj.tag}`) // Delete the one from above so we can consolidate
      exec(`git tag -m "${newVersionObj.tag}" ${newVersionObj.tag}`)
      console.error(`tagged HEAD as ${newVersionObj.tag}`)
    })

    exec('git push')
    exec('git push --tags origin')

    // Clean up the temp branch
    exec('git branch -D micromanage-temp')
  }

  // Output all updated workspaces to stdout
  echoJobOutput(newVersions)
}

function getUpdatedWorkspaces() {
  const allTags = getTags()

  // Find all workspace packages/services with updates since their latest tag
  const updatedWorkspaces = getWorkspaces().filter((ws) => {
    const tags = allTags.filter((tag) => {
      const taggedWorkspaceName = tag.substring(0, tag.lastIndexOf('@'))
      return taggedWorkspaceName === ws.name
    })
    const latestTag = tags[tags.length - 1]
    const changed =
      !latestTag || !!exec(`git diff --quiet HEAD ${latestTag} -- ${ws.path} || echo changed`)
    if (changed) {
      console.error(`*** ${ws.name} has changed since ${latestTag}`)
      return true
    } else {
      console.error(`No changes in ${ws.name} since ${latestTag}`)
      return false
    }
  })

  // If the list of updates contains any "packages", mark all "services" as needing an update too
  const isAnyPackageUpdated = updatedWorkspaces.find((pkg) => {
    return pkg.path.startsWith('packages/')
  })

  if (isAnyPackageUpdated) {
    console.error(
      '*** One or more packages have been updated. All services will be marked for re-version'
    )
    getWorkspaces()
      // Filter out workspaces already included in the list
      .filter((ws) => !updatedWorkspaces.find((updated) => updated.name === ws.name))
      // Filter out workspaces that are not "services"
      .filter((ws) => ws.path.startsWith('services/'))
      .forEach((updatedService) => {
        updatedWorkspaces.push(updatedService)
      })
  }

  return updatedWorkspaces
}

function versionWorkspaces(updatedWorkspaces, isDryRun) {
  const dryRun = isDryRun ? '--dry-run' : ''

  return updatedWorkspaces.map((ws) => {
    // Create the new version and changelog
    const versionOutput = exec(
      `npx standard-version \
      ${dryRun} \
      --path . \
      --tag-prefix="${ws.name}@" \
      --releaseCommitMessageFormat="release: ${ws.name}@{{currentTag}}"`,
      { cwd: ws.path }
    )
    const newVersion = versionOutput.split('\n')[0].split(' ').pop()
    const newTag = `${ws.name}@${newVersion}`

    console.error(`new version created: ${newTag}`)

    return {
      name: ws.name,
      tag: newTag
    }
  })
}

function echoJobOutput(newVersions) {
  const output = {}
  newVersions.forEach((newVersionObj) => {
    output[newVersionObj.name] = newVersionObj.tag
  })

  console.log(`::set-output name=changed_workspaces::${JSON.stringify(output)}`)
}

module.exports = {
  buildVersionCommand
}
