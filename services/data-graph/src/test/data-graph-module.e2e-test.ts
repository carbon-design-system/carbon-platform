/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { gql } from '@carbon-platform/api/data-graph'
import { Runtime } from '@carbon-platform/api/runtime'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import test from 'ava'
import request from 'supertest'

import { DataGraphModule } from '../main/data-graph-module.js'

let app: INestApplication

test.before(async () => {
  const runtime = new Runtime()
  const moduleRef = await Test.createTestingModule({
    imports: [DataGraphModule.register(runtime)]
  }).compile()
  app = moduleRef.createNestApplication()
  await app.init()
})

test.after.always(async () => {
  await app.close()
})

test('it can resolve a query and return some data', async (t) => {
  const response = await request(app.getHttpServer())
    .post('/graphql')
    .set('Accept', 'application/json')
    .send({
      query: gql`
        query Asdf {
          libraries {
            id
            name
          }
        }
      `
    })

  t.not(response, undefined)
  t.is(response.statusCode, 200)
  t.not(response.body.data.libraries, undefined)
})
