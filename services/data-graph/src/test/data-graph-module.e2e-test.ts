/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { gql } from '@carbon-platform/api/data-graph'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { DataGraphModule } from '../main/data-graph-module'

describe('basic resolvers test', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DataGraphModule]
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('returns multiple libraries', async () => {
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

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toHaveProperty('libraries')
    expect(response.body.data.libraries).toContainEqual(expect.objectContaining({ id: 'lib1' }))
  })

  it('returns single user', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: gql`
          query Test($thing: ID) {
            users(id: $thing) {
              id
              name
            }
          }
        `,
        variables: {
          thing: '2'
        }
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toHaveProperty('users')
    expect(response.body.data.users).toContainEqual(expect.objectContaining({ id: '2' }))
  })

  afterAll(async () => {
    await app.close()
  })
})
