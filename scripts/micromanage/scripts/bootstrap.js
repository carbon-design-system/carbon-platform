/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { exec } = require('child_process')
const path = require('path')

const runPath = path.join(__dirname, '..')

const p = exec('npm install', { cwd: runPath })
p.stdout.pipe(process.stdout)
p.stderr.pipe(process.stderr)
