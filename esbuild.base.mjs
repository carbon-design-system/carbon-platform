/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default {
  platform: 'node',
  target: 'es2021',
  bundle: true,
  external: [
    '@grpc/*',
    '@nestjs/websockets/*',
    'class-transformer',
    'class-validator',
    'fsevents',
    'ioredis',
    'kafkajs',
    'mqtt',
    'nats'
  ]
}
