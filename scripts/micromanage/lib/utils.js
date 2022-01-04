/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { exec: execAsync, execSync } = require('child_process')
const path = require('path')

function buildCurlUrlParams(params) {
  const encodedParams = Object.entries(params).map(([key, val]) => {
    return `${key}=${encodeURIComponent(val)}`
  })

  return encodedParams.join('&')
}

/**
 * Execute a command line command.
 *
 * @param {string} cmd Command to execute.
 * @param {object} options Additional options provided to execSync
 * @returns {string} Output of the command.
 */
function exec(cmd, options = {}) {
  const execOptions = {
    env: {
      ...process.env
    },
    ...options
  }
  return execSync(cmd, execOptions).toString().trim()
}

/**
 * Execute a command line command asynchronously, piping its output to the calling process.
 *
 * @param {string} cmd Command to execute.
 * @param {object} options Additional options provided to execSync
 * @returns {Promise} Promise of the command completing.
 */
function execWithOutput(cmd, options = {}) {
  const execOptions = {
    env: {
      ...process.env
    },
    ...options
  }

  return new Promise((resolve, reject) => {
    // Build the base image
    const childProcess = execAsync(cmd, execOptions, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
  })
}

/**
 * Given a workspace name, find the corresponding package.json object.
 *
 * @param {string} workspaceName The name of the workspace to find.
 * @returns A workspace with the corresponding name; or undefined if one was not found.
 */
function getWorkspaceByName(workspaceName) {
  return getWorkspaces().find((ws) => ws.name === workspaceName)
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
 * @returns {Object} The package.json file as a JSON object.
 */
function getPackageJson() {
  return require(path.join(process.cwd(), 'package.json'))
}

/**
 * Get an object for each workspace, as defined in the top-level package.json file.
 *
 * @returns {Array} Array of workspace info objects.
 */
function getWorkspaces() {
  const workspacePaths = getPackageJson().workspaces

  return workspacePaths.map((workspacePath) => {
    const p = require(path.join(process.cwd(), workspacePath, 'package.json'))

    return {
      name: p.name,
      dependencies: p.dependencies,
      devDependencies: p.devDependencies,
      path: workspacePath,
      private: !!p.private,
      version: p.version
    }
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
 * Output information contained in an error object, if present.
 *
 * @param {Object} err Error object from which to obtain and output data.
 */
function logErrorInfo(err) {
  console.error(err)
  err.stdout && console.log('stdout: ' + err.stdout.toString())
  err.stderr && console.log('stderr: ' + err.stderr.toString())
}

module.exports = {
  buildCurlUrlParams,
  exec,
  execWithOutput,
  getFiles,
  getWorkspaceByName,
  getWorkspaceForFile,
  getPackageJson,
  getWorkspaces,
  getTags,
  logErrorInfo
}
