/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import test from 'ava'
import request from 'supertest'

import { StatusModule } from '../../../main/microservice/status-endpoint/status-module.js'

let app: INestApplication

test.before(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [StatusModule]
  }).compile()

  app = moduleRef.createNestApplication()
  await app.init()
})

test.after.always(async () => {
  await app.close()
})

test("it doesn't crash", (t) => {
  t.not(app, undefined)
})

test('gets /liveness and returns 204', async (t) => {
  const response = await request(app.getHttpServer()).get('/liveness')

  t.is(response.statusCode, 204)
})

test('gets /readiness and returns 204', async (t) => {
  const response = await request(app.getHttpServer()).get('/readiness')

  t.is(response.statusCode, 204)
})
