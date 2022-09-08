/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Octokit } from 'octokit'

import { getChangedWorkspaces } from '../packages/micromanage-cli/lib/changed.js'
import { exec, getWorkspaceForFile } from '../packages/micromanage-cli/lib/utils.js'

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

function applyCommitData(updatedWorkspaces, commitData) {
  // For each commit, find the packages (folders) changed by it
  commitData.forEach((data) => {
    const changedFiles = exec(`git show --format=format:"" --name-only ${data.ref}`).split('\n')

    changedFiles.forEach((changedFile) => {
      const ws = getWorkspaceForFile(changedFile)
      if (!ws) {
        return
      }

      if (!updatedWorkspaces[ws.name]) {
        return
      }

      // If it's a higher-order version bump, update the value in the workspaces map
      if (commitTypes.indexOf(data.type) > commitTypes.indexOf(updatedWorkspaces[ws.name])) {
        updatedWorkspaces[ws.name] = data.type
      }
    })
  })
}

function getResultText(workspacesMap) {
  let text = ''

  if (Object.keys(workspacesMap).length > 0) {
    text = '❗ **The commits in this PR will result in the following version changes:**\n\n'
  } else {
    text = 'The commits in this PR will not result in any workspace version changes.'
  }

  Object.entries(workspacesMap)
    .sort(([nameA, typeA], [nameB, typeB]) => {
      if (commitTypes.indexOf(typeB) === commitTypes.indexOf(typeA)) {
        return nameA.localeCompare(nameB)
      }
      return commitTypes.indexOf(typeB) - commitTypes.indexOf(typeA)
    })
    .forEach(([wsName, type]) => {
      switch (type) {
        case 'fix':
          text += `🐛 PATCH release: \`${wsName}\`\n`
          break
        case 'feat':
          text += `🌟 MINOR release: \`${wsName}\`\n`
          break
        case 'breaking':
          text += `💣 MAJOR release: \`${wsName}\`\n`
          break
        default:
          break
      }
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
  return octokit.rest.issues.createComment({
    body: commentBody,
    issue_number: prNumber,
    owner: repoOwner,
    repo: repoName
  })
}

//
// Start of script
//

checkVars()

console.log(`Comparing ${headRef} to ${baseRef}`)

const commitData = getCommitData()

console.log('Considering the following commits:')
commitData.forEach((commit) => console.log(commit))
console.log()

const updatedWorkspaces = {}

getChangedWorkspaces(`${remote}/${baseRef}`).forEach((ws) => {
  updatedWorkspaces[ws.name] = 'fix'
})

applyCommitData(updatedWorkspaces, commitData)

const resultText = getResultText(updatedWorkspaces)

const response = await addPrComment(resultText)
console.log(response)

console.log(resultText)
