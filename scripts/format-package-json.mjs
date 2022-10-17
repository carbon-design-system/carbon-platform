#!/usr/bin/env node
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs'
import path from 'path'

const beginningKeys = [
  'name',
  'description',
  'version',
  'license',
  'author',
  'keywords',
  'private',
  'publishConfig',
  'homepage',
  'repository',
  'bugs',
  'type',
  'main',
  'bin',
  'exports',
  'files'
]
const endKeys = ['scripts', 'dependencies', 'peerDependencies', 'devDependencies']

function sortTopLevelKeys(packageJson) {
  const copy = { ...packageJson }
  const beginning = {}
  const end = {}

  for (const key of beginningKeys) {
    if (key in copy) {
      beginning[key] = copy[key]
      delete copy[key]
    }
  }

  for (const key of endKeys) {
    if (key in copy) {
      end[key] = copy[key]
      delete copy[key]
    }
  }

  return {
    ...beginning,
    ...copy,
    ...end
  }
}

function sortScripts(packageJson) {
  if (!('scripts' in packageJson)) {
    return packageJson
  }

  const copy = { ...packageJson }
  const scriptKeys = Object.keys(copy.scripts)
  const sorted = {}

  scriptKeys.sort((a, b) => a.localeCompare(b))

  for (const scriptKey of scriptKeys) {
    sorted[scriptKey] = copy.scripts[scriptKey]
  }

  copy.scripts = sorted

  return copy
}

function processFile(packageJsonPath) {
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

  packageJson = sortTopLevelKeys(packageJson)
  packageJson = sortScripts(packageJson)

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, undefined, '  ') + '\n')
}

//
// Start of script
//
const args = process.argv.slice(2)

if (args.length <= 0) {
  throw new Error('Must specify at least one package.json path')
}

for (const arg of args) {
  const packageJsonPath = path.resolve(arg)
  processFile(packageJsonPath)
}
