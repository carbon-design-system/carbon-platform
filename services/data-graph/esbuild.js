/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { build } from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'

import base from '../../esbuild.base.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

build({
  ...base,
  entryPoints: [path.resolve(__dirname, 'dist', 'main', 'index.js')],
  outfile: path.resolve(__dirname, 'dist', 'out.js'),
  external: [
    ...base.external,
    '@apollo/gateway',
    '@apollo/subgraph',
    'apollo-server-fastify',
    'ts-morph'
  ]
}).catch(() => process.exit(1))
