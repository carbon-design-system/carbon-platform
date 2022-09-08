/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Command } from 'commander'

import { getDependentServices } from './package/dependents.js'
import { exec, filters, getTags, getWorkspaces } from './utils.js'

function buildChangedCommand() {
  return new Command('changed')
    .configureHelp({ helpWidth: 100 })
    .summary('List changed workspaces')
    .description('List each workspace that has changed since its most recent tag')
    .option('--base <base_ref>', 'Compare workspaces to a ref instead')
    .option('--json', 'Output as a JSON array')
    .action(handleChangedCommand)
}

async function handleChangedCommand(opts) {
  // Note: stderr is used so stdout can be used by subsequent scripts
  console.error('===== micromanage changed =====')

  if (opts.base) {
    console.error(`🔎 Comparing HEAD against ${opts.base}`)
  }

  // Get changed workspaces based on commits
  const changedWorkspaces = getChangedWorkspaces(opts.base)

  console.error('Checking for dependent services\n')

  // Add in services that depend on changed packages
  for (const pkg of changedWorkspaces.filter(filters.PACKAGES)) {
    const dependentServices = await getDependentServices(pkg)
    dependentServices.forEach(
      (dep) => !changedWorkspaces.includes(dep) && changedWorkspaces.add(dep)
    )
  }

  const results = changedWorkspaces.map((dep) => dep.name)

  if (opts.json) {
    console.log(JSON.stringify(results))
  } else {
    console.log(results.join('\n'))
  }
}

function getChangedWorkspaces(baseRef) {
  const allTags = getTags()

  // Find all workspace packages/services with updates since their latest tag
  return getWorkspaces().filter((ws) => {
    const tags = allTags.filter((tag) => {
      const taggedWorkspaceName = tag.substring(0, tag.lastIndexOf('@'))
      return taggedWorkspaceName === ws.name
    })
    const latestTag = tags[tags.length - 1]

    const compareRef = baseRef || latestTag

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

export { buildChangedCommand, getChangedWorkspaces }
