/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { build } = require('esbuild')
const path = require('path')

build({
  entryPoints: [path.resolve(__dirname, 'proxy-server.js')],
  outfile: path.resolve(__dirname, 'dist', 'out.js'),
  platform: 'node',
  target: 'es2020',
  bundle: true
}).catch(() => process.exit(1))
