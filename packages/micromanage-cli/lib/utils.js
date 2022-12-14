/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import childProcess from 'child_process'
import { readFileSync } from 'fs'
import path from 'path'

const filters = {
  PACKAGES: (ws) => ws.path?.startsWith('packages/'),
  SERVICES: (ws) => ws.path?.startsWith('services/')
}

const workspacesCache = new Map()

/**
 * @typedef {object} Workspace
 * @property {string} name - package name from package.json
 * @property {object} dependencies - the dependencies object from package.json
 * @property {object} devDependencies - the devDependencies object from package.json
 * @property {string} path - the path of the workspace relative to the workspace root
 * @property {boolean} private - the "private" boolean from package.json
 * @property {string} version - the version from package.json
 */

function buildWorkspaceEntry(packageJson, workspacePath) {
  return {
    name: packageJson.name,
    dependencies: packageJson.dependencies,
    devDependencies: packageJson.devDependencies,
    path: workspacePath,
    private: !!packageJson.private,
    version: packageJson.version
  }
}

function buildCurlUrlParams(params) {
  const encodedParams = Object.entries(params).map(([key, val]) => {
    return `${key}=${encodeURIComponent(val)}`
  })

  return encodedParams.join('&')
}

/**
 * Execute a command line command, buffers the output, and returns it.
 *
 * @param {string} cmd Command to execute.
 * @param {object} options Additional options provided to execSync.
 * @returns {string} Output of the command.
 */
function exec(cmd, options = {}) {
  guardShell(cmd)

  const execOptions = {
    env: process.env,
    ...options
  }
  return childProcess.execSync(cmd, execOptions).toString().trim()
}

/**
 * Throws an exception if the command string contains any special shell characters that could lead
 * to command injection.
 *
 * @param {string} commandString The string to check.
 */
function guardShell(commandString) {
  if (commandString.match(/[\\$;`]/)) {
    throw new Error(
      'Shell guard prevented a command from running because it contained special characters: ' +
        commandString
    )
  }
}

/**
 * Spawns a child process with streaming output.
 *
 * @param {string} cmd Command to execute.
 * @param {object} options Additional options provided to spawn.
 * @returns {Promise} Promise of the command completing.
 */
async function spawn(cmd, options = {}) {
  guardShell(cmd)

  const spawnOptions = {
    env: process.env,
    // Send stdout to stderr by default to avoid clobbering upstream command stdout output
    stdio: ['inherit', process.stderr, 'inherit'],
    shell: true,
    ...options
  }

  return new Promise((resolve, reject) => {
    const spawnedProcess = childProcess.spawn(cmd, spawnOptions)

    spawnedProcess.on('close', (code) => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(code)
      }
    })

    spawnedProcess.on('error', (err) => {
      reject(err)
    })
  })
}

/**
 * Given a workspace name, find the corresponding package.json object.
 *
 * @param {string} workspaceName The name of the workspace to find.
 * @param {boolean} includeRoot Whether or not to include the root workspace's name when searching.
 * @returns A workspace with the corresponding name; or undefined if one was not found.
 */
function getWorkspaceByName(workspaceName, includeRoot) {
  const workspaces = getWorkspaces()

  if (includeRoot) {
    workspaces.unshift(buildWorkspaceEntry(getPackageJson(), '.'))
  }

  return workspaces.find((ws) => ws.name === workspaceName)
}

/**
 * Given a file, find the workspace under which the file resides.
 *
 * @param {string} f File path.
 * @returns {object} Workspace object of the workspace containing the file.
 */
function getWorkspaceForFile(f) {
  const workspaces = getWorkspaces()

  return workspaces.find((ws) => f.startsWith(ws.path))
}

/**
 * Get all of the files in a particular directory, given some filters using the `find` os utility.
 *
 * @param {string} dir Directory in which to look.
 * @param {Array} extensions File extensions to include.
 * @param {Array} [exclusions] Specific paths to exclude, formatted the way `find` expects for
 * `-not -path <path>` entries.
 * @returns {Array} Array of files.
 */
function getFiles(dir, extensions, exclusions = []) {
  exclusions = exclusions.map((exclusion) => `-not -path "${exclusion}"`)
  const exclusionsString = exclusions.join(' ')

  return extensions
    .map((extension) => {
      const files = exec(`find ${dir} -name "*${extension}" -type f ${exclusionsString}`)
      return files.length === 0 ? [] : files.split('\n')
    })
    .reduce((prev, cur) => [...prev, ...cur], [])
}

/**
 * Returns the top-level package.json file for the repository.
 *
 * @returns {object} The package.json file as a JSON object.
 */
function getPackageJson(workspacePath) {
  const p = path.join(process.cwd(), workspacePath || '', 'package.json')

  return JSON.parse(readFileSync(p))
}

/**
 * Get an object for each workspace, as defined in the top-level package.json file.
 *
 * @returns {Array<Workspace>} Array of workspace info objects.
 */
function getWorkspaces() {
  const workspacePaths = getPackageJson().workspaces

  return workspacePaths.map((workspacePath) => {
    const pJson = getPackageJson(workspacePath)

    if (!workspacesCache.has(pJson.name)) {
      workspacesCache.set(pJson.name, buildWorkspaceEntry(pJson, workspacePath))
    }

    return workspacesCache.get(pJson.name)
  })
}

/**
 * Get a list of all git tags, sorted by taggerdate.
 *
 * @returns {Array} Array of tags.
 */
function getTags() {
  const tagsCommandOutput = exec('git tag --sort=taggerdate')
  return tagsCommandOutput.split('\n')
}

/**
 * Determine whether or not the package is used by the workspace. Determines this by looking at the
 * tracked files in the repo and grepping them for something like: '@carbon-platform/icons.*', which
 * would be found in an import statement, for example.
 *
 * @param {import('./utils.js.js').Workspace} pkg
 * @param {import('./utils.js.js').Workspace} ws
 *
 * @returns {Promise<boolean>} Whether or not the package is used by the workspace
 */
async function isDependencyOf(pkg, ws) {
  const regex = `['\\"]${pkg.name}(/.*){0,}['\\"]`
  let isUsed = false
  try {
    await spawn(`git ls-tree -r HEAD --name-only | xargs egrep "${regex}" > /dev/null`, {
      cwd: ws.path
    })

    isUsed = true
  } catch {}

  return isUsed
}

/**
 * Output information contained in an error object, if present.
 *
 * @param {object} err Error object from which to obtain and output data.
 */
function logErrorInfo(err) {
  console.error(err)
  err.stdout && console.log('stdout: ' + err.stdout.toString())
  err.stderr && console.log('stderr: ' + err.stderr.toString())
}

export {
  buildCurlUrlParams,
  exec,
  filters,
  getFiles,
  getPackageJson,
  getTags,
  getWorkspaceByName,
  getWorkspaceForFile,
  getWorkspaces,
  isDependencyOf,
  logErrorInfo,
  spawn
}
