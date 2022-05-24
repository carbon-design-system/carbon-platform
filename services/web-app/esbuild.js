/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { build } = require('esbuild')
const path = require('path')
const base = require('../../esbuild.base')

build({
  ...base,
  entryPoints: [path.resolve(__dirname, 'proxy-server.js')],
  outfile: path.resolve(__dirname, 'dist', 'out.js')
}).catch(() => process.exit(1))
