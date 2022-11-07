/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command, Help } from 'commander'

import { getDependentServices } from './package/dependents.js'
import { exec, filters, getTags, getWorkspaces } from './utils.js'

function buildChangedCommand() {
  return new Command('changed')
    .configureHelp({ helpWidth: 100 })
    .summary('List changed workspaces')
    .description(
      new Help().wrap(
        'List each workspace that has changed since its most recent tag. An optional base ' +
          'workspace name can be provided which will be considered as a dependency of all other ' +
          'workspaces.',
        100,
        0
      )
    )
    .option(
      '--base-workspace <workspace_name>',
      'Workspace considered as the "base" on which all others depend'
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
  const additional = await getChangedDependentWorkspaces(changedWorkspaces, opts.baseWorkspace)

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

async function getChangedDependentWorkspaces(changedWorkspaces, baseWorkspaceName) {
  const additional = []

  // Add in services that depend on changed packages
  console.error('Checking for dependent services')
  for (const pkg of changedWorkspaces.filter(filters.PACKAGES)) {
    const dependentServices = await getDependentServices(pkg)
    dependentServices.forEach((dep) => !additional.includes(dep) && additional.push(dep))
  }

  // If a base workspace was provided and it has changed, mark all other workspaces as changed
  if (baseWorkspaceName) {
    console.error('Checking for base workspace changes')

    if (changedWorkspaces.find((ws) => ws.name === baseWorkspaceName)) {
      console.error('Base workspace has changed. Marking all workspaces as changed')

      getWorkspaces().forEach((dep) => !additional.includes(dep) && additional.push(dep))
    }
  }

  return additional
}

function getChangedWorkspaces(sinceRef) {
  const allTags = getTags()

  // Find all workspace packages/services with updates since their latest tag
  return getWorkspaces().filter((ws) => {
    const tags = allTags.filter((tag) => {
      const taggedWorkspaceName = tag.substring(0, tag.lastIndexOf('@'))
      return taggedWorkspaceName === ws.name
    })
    const latestTag = tags[tags.length - 1]

    const compareRef = sinceRef || latestTag

    const changed =
      !latestTag || !!exec(`git diff --quiet HEAD ${compareRef} -- ${ws.path} || echo changed`)

    if (changed) {
      console.error(`❗ ${ws.name} has changed since ${compareRef}`)
      return true
    } else {
      console.error(`✅ No changes in ${ws.name} since ${compareRef}`)
      return false
    }
  })
}

export { buildChangedCommand, getChangedDependentWorkspaces, getChangedWorkspaces }
