/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { StatusModule } from '../../../main/microservice/status-endpoint/status.module'

describe('Status', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StatusModule]
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('gets /liveness and returns 204', async () => {
    const response = await request(app.getHttpServer()).get('/liveness')

    expect(response.statusCode).toBe(204)
  })

  it('gets /readiness and returns 204', async () => {
    const response = await request(app.getHttpServer()).get('/readiness')

    expect(response.statusCode).toBe(204)
  })

  afterAll(async () => {
    await app.close()
  })
})
