/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { build } from 'esbuild'
import path from 'path'

import base from '../../esbuild.base.mjs'

build({
  ...base,
  entryPoints: [path.resolve(process.cwd(), 'dist', 'main', 'index.js')],
  outfile: path.resolve(process.cwd(), 'dist', 'out.js')
}).catch(() => process.exit(1))
