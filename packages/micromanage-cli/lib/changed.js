/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command, Help } from 'commander'

import { getDependentServices } from './package/dependents.js'
import { exec, filters, getRootWorkspace, getTags, getWorkspaces } from './utils.js'

function buildChangedCommand() {
  return new Command('changed')
    .configureHelp({ helpWidth: 100 })
    .summary('List changed workspaces')
    .description(
      new Help().wrap(
        'List each workspace that has changed since its most recent tag. The root workspace is ' +
          'considered for changes as well. Any change to the root workspace triggers a "change" ' +
          'to all other workspaces. The root workspace is considered as "changed" if any file ' +
          'from the `files` array in its package.json has changed.',
        100,
        0
      )
    )
    .option('--since <git_ref>', 'Compare workspaces to a ref instead')
    .option('--json', 'Output as a JSON array')
    .action(handleChangedCommand)
}

async function handleChangedCommand(opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage changed =====')

  if (opts.since) {
    console.error(`🔎 Comparing HEAD against ${opts.since}`)
  }

  // Get changed workspaces based on commits
  const changedWorkspaces = getChangedWorkspaces(opts.since)

  // Get changed workspaces based on cascading dependencies
  const additional = await getChangedDependentWorkspaces(changedWorkspaces)

  additional.forEach((ws) => {
    !changedWorkspaces.includes(ws) && changedWorkspaces.push(ws)
  })

  const results = changedWorkspaces.map((dep) => dep.name)

  // Put some space between the progress output and the actual stdout results
  console.error()

  if (opts.json) {
    console.log(JSON.stringify(results))
  } else {
    console.log(results.join('\n'))
  }
}

async function getChangedDependentWorkspaces(changedWorkspaces) {
  const additional = []

  // Add in services that depend on changed packages
  console.error('Checking for dependent services')
  for (const pkg of changedWorkspaces.filter(filters.PACKAGES)) {
    const dependentServices = await getDependentServices(pkg)
    dependentServices.forEach((dep) => !additional.includes(dep) && additional.push(dep))
  }

  return additional
}

function getChangedWorkspaces(sinceRef) {
  const allTags = getTags()

  const hasRootChanged = hasRootWorkspaceChanged(sinceRef, allTags)

  // Find all workspace packages/services with updates since their latest tag
  const resultSet = getWorkspaces().filter((ws) => {
    const latestTag = getLatestWorkspaceTag(ws, allTags)

    const compareRef = sinceRef || latestTag

    const changed =
      !latestTag || !!exec(`git diff --quiet HEAD ${compareRef} -- ${ws.path} || echo changed`)

    if (changed || hasRootChanged) {
      const rootChangedText = hasRootChanged ? ' (root workspace changed)' : ''
      console.error(`❗ ${ws.name} has changed since ${compareRef}${rootChangedText}`)
      return true
    }

    console.error(`✅ No changes in ${ws.name} since ${compareRef}`)
    return false
  })

  // Add in the root workspace if it has changed
  if (hasRootChanged) {
    resultSet.push(getRootWorkspace())
  }

  return resultSet
}

/**
 * Checks if the root workspace has changed either since the provided ref or since its latest tag.
 */
function hasRootWorkspaceChanged(sinceRef, allTags) {
  const rootWorkspace = getRootWorkspace()
  const latestTag = getLatestWorkspaceTag(rootWorkspace, allTags)
  const compareRef = sinceRef || latestTag

  // Regardless of sinceRef, if there's no existing tag for the workspace, it is considered changed
  if (!latestTag) {
    return true
  }

  // Root workspace changes are based on changes to the files in the `files` array in the top-level

  const fileList = exec(`git diff --name-only HEAD ${compareRef} | xargs`).split(' ')

  return !!fileList.find((changedFile) => {
    return rootWorkspace.files.includes(changedFile)
  })
}

function getLatestWorkspaceTag(workspace, allTags) {
  const tags = allTags.filter((tag) => {
    const taggedWorkspaceName = tag.substring(0, tag.lastIndexOf('@'))
    return taggedWorkspaceName === workspace.name
  })

  return tags[tags.length - 1]
}

export { buildChangedCommand, getChangedDependentWorkspaces, getChangedWorkspaces }
