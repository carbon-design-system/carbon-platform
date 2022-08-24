/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Octokit } from 'octokit'

import { exec, getWorkspaceForFile } from '../lib/utils.js'

const commitTypes = ['fix', 'feat', 'breaking']
const commentingUserLogin = 'carbon-bot'
const remote = 'origin'
const accessToken = process.env.PR_COMMENT_BOT_TOKEN
const headRef = process.env.GITHUB_HEAD_REF
const baseRef = process.env.GITHUB_BASE_REF
const prNumber = process.env.GITHUB_REF.split('/')[2] // refs/pull/<pr_number>/merge
const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/')

function checkVars() {
  if (!headRef) {
    throw new Error('No head ref found in GITHUB_HEAD_REF environment variable')
  }
  if (!baseRef) {
    throw new Error('No base ref found in GITHUB_BASE_REF environment variable')
  }
  if (!prNumber) {
    throw new Error('No pr number found in GITHUB_REF environment variable')
  }
  if (!repoName) {
    throw new Error('No repo name found in GITHUB_REPOSITORY environment variable')
  }
  if (!repoOwner) {
    throw new Error('No repo owner found in GITHUB_REPOSITORY environment variable')
  }
}

function getCommitData() {
  // Get the commits between the current ref and the base ref
  const commits = exec(
    `git log --format=format:"%H %s" ${remote}/${headRef} ^${remote}/${baseRef}`
  ).split('\n')

  // determine the type (feat, fix, or breaking) of each commit and store it along with its ref
  return commits
    .map((commit) => {
      let type
      const [ref, commitTitle] = commit.split(/\s/, 2)
      const fullCommitText = exec(`git log -1 --format=medium ${ref}`)

      if (fullCommitText.includes('BREAKING CHANGE')) {
        type = 'breaking'
      } else {
        type = commitTitle.match(/^(feat|fix)(\(.*\))?:/)?.[1]
      }

      return { ref, type }
    })
    .filter((data) => commitTypes.includes(data.type))
}

function getUpdatedWorkspacesMap(commits) {
  const results = {}

  // For each commit, find the packages to which its changed files apply
  commits.forEach((data) => {
    // Get changed files
    const changedFiles = exec(`git show --format=format:"" --name-only ${data.ref}`).split('\n')

    changedFiles.forEach((changedFile) => {
      const ws = getWorkspaceForFile(changedFile)
      if (!ws) {
        return
      }

      // Add a new set at the key if one does not already exist
      if (!results[data.type]) {
        results[data.type] = new Set()
      }

      // Add the workspace name to the set if it is not already a part of it
      if (!results[data.type].has(ws.name)) {
        results[data.type].add(ws.name)
      }
    })
  })

  return results
}

function removeDuplicates(workspacesMap) {
  workspacesMap.fix?.forEach((wsName) => {
    if (workspacesMap.feat?.has(wsName) || workspacesMap.breaking?.has(wsName)) {
      workspacesMap.fix.delete(wsName)
    }
  })

  workspacesMap.feat?.forEach((wsName) => {
    if (workspacesMap.breaking?.has(wsName)) {
      workspacesMap.feat.delete(wsName)
    }
  })
}

function getResultText(workspacesMap) {
  let text = ''

  if (
    workspacesMap.breaking?.size > 0 ||
    workspacesMap.feat?.size > 0 ||
    workspacesMap.fix?.size > 0
  ) {
    text =
      '❗ **The commit titles in this PR will result in the following package and service version changes:**\n\n' +
      '> **Note:** A change to a "package" version will result in a patch release of **all** services.\n\n'
  } else {
    text = 'The commit messages in this PR will not result in any package/service version changes.'
  }

  workspacesMap.breaking?.forEach((breakingWorkspace) => {
    text += `💣 MAJOR release: \`${breakingWorkspace}\`\n`
  })

  workspacesMap.feat?.forEach((featWorkspace) => {
    text += `🌟 MINOR release: \`${featWorkspace}\`\n`
  })

  workspacesMap.fix?.forEach((fixWorkspace) => {
    text += `🐛 PATCH release: \`${fixWorkspace}\`\n`
  })

  return text
}

async function addPrComment(commentBody) {
  let response
  const octokit = new Octokit({ auth: accessToken })

  const existingComments = await octokit.rest.issues.listComments({
    issue_number: prNumber,
    owner: repoOwner,
    repo: repoName
  })

  const existingBotComments = existingComments.data.filter((comment) => {
    return comment.user.login === commentingUserLogin
  })

  // Delete existing comments
  for (const comment of existingBotComments) {
    response = await octokit.rest.issues.deleteComment({
      comment_id: comment.id,
      owner: repoOwner,
      repo: repoName
    })
    console.log(response)
  }

  // Create new comment
  response = await octokit.rest.issues.createComment({
    body: commentBody,
    issue_number: prNumber,
    owner: repoOwner,
    repo: repoName
  })
  console.log(response)
}

//
// Start of script
//

checkVars()

console.log(`Comparing ${headRef} to ${baseRef}`)
const commitData = getCommitData()
console.log(commitData)

const updatedWorkspacesMap = getUpdatedWorkspacesMap(commitData)
removeDuplicates(updatedWorkspacesMap)
console.log(updatedWorkspacesMap)

const resultText = getResultText(updatedWorkspacesMap)

await addPrComment(resultText)

console.log(resultText)
