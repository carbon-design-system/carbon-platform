/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command, Help } from 'commander'

import { exec, getWorkspaceByName } from './utils.js'

function buildVersionCommand() {
  return new Command('version')
    .configureHelp({ helpWidth: 100 })
    .summary('Update workspace versions based on conventional commits')
    .description(
      new Help().wrap(
        'Update the version of each provided workspace based on a conventional commits changelog. ' +
          'The version bump (major/minor/patch) is determined based on the conventional commits found ' +
          "since each workspace's most recent tag.",
        100,
        0
      )
    )
    .option('--dry-run', 'Do not make any changes. Only output prospective updates')
    .option('--json', 'Output as a JSON array of new tags')
    .argument('<workspace-name...>', 'List of workspace names (from package.json) to process')
    .action(handleVersionCommand)
}

function handleVersionCommand(workspaceNames, opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage version =====')

  const workspaces = workspaceNames.map((wsName) => getWorkspaceByName(wsName))

  if (!opts.dryRun) {
    // We have work to do so change branch to a temp one
    exec('git switch --create micromanage-temp')
  }

  const newVersions = versionWorkspaces(workspaces, opts.dryRun)

  if (!opts.dryRun) {
    // Ensure lock file remains up-to-date
    exec('npm install')

    exec('git commit --allow-empty -am "release: update package-lock.json with new versions"')

    exec('git switch -')

    exec('git merge --squash --autostash micromanage-temp')

    // Commit the results as a single commit with an appropriate commit message
    exec(
      "sed 's/Squashed commit of the following:/release: new package and service versions/' " +
        '.git/SQUASH_MSG | git commit -F -'
    )

    // Create tags
    newVersions.forEach((newVersionObj) => {
      exec(`git tag --delete ${newVersionObj.tag}`) // Delete the one from above so we can consolidate
      exec(`git tag -m "${newVersionObj.tag}" ${newVersionObj.tag}`)
      console.error(`tagged HEAD as ${newVersionObj.tag}`)
    })

    // Pull first in case there are more commits we don't yet have
    exec('git pull')
    exec('git push')
    exec('git push --tags origin')

    // Clean up the temp branch
    exec('git branch -D micromanage-temp')
  }

  const results = newVersions.reduce((prev, cur) => ({ ...prev, [cur.name]: cur.tag }), {})

  if (opts.json) {
    console.log(JSON.stringify(results))
  } else {
    console.log(Object.values(results).join('\n'))
  }
}

/**
 * Versions each workspace provided in the args and returns an array of objects containing updated
 * workspaces and their new tags.
 *
 * @param {Array<import('./utils.js').Workspace>} updatedWorkspaces
 * @param {boolean} isDryRun
 * @returns {Array}
 */
function versionWorkspaces(updatedWorkspaces, isDryRun) {
  const dryRun = isDryRun ? '--dry-run' : ''

  return updatedWorkspaces.map((ws) => {
    // Create the new version and changelog
    // TODO: standard-version is deprecated
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

    console.error(`🌟 new version created: ${newTag}`)

    return {
      name: ws.name,
      tag: newTag
    }
  })
}

export { buildVersionCommand }
