/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { build } = require('esbuild')
const path = require('path')

build({
  entryPoints: [path.resolve(__dirname, 'dist', 'main', 'index.js')],
  outfile: path.resolve(__dirname, 'dist', 'out.js'),
  platform: 'node',
  target: 'es2020',
  bundle: true,
  external: [
    '@grpc/*',
    '@nestjs/websockets/*',
    'class-transformer',
    'class-validator',
    'kafkajs',
    'mqtt',
    'nats',
    'redis'
  ]
}).catch(() => process.exit(1))
