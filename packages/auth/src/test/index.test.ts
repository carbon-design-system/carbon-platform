/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DEV, PRODUCTION } from '@carbon-platform/run-mode'

import { getPassportInstance, SESSION_SECRET, store } from '../main/index'
const signature = require('cookie-signature')

test('attempt to get passport instance without env variables throws error', async () => {
  const oldClientId = process.env.CARBON_IBM_VERIFY_CLIENT_ID
  const oldClientSecret = process.env.CARBON_IBM_VERIFY_CLIENT_SECRET
  process.env.CARBON_IBM_VERIFY_CLIENT_ID = ''
  process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = ''
  await expect(getPassportInstance()).rejects.toThrow()
  process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
  process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
})

test('passport instance can be retrieved without crashing', async () => {
  const oldClientId = process.env.CARBON_IBM_VERIFY_CLIENT_ID
  const oldClientSecret = process.env.CARBON_IBM_VERIFY_CLIENT_SECRET
  process.env.CARBON_IBM_VERIFY_CLIENT_ID = 'MOCK_CLIENT'
  process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = 'MOCK_SECRET'
  const passportInstance = await getPassportInstance()
  expect(passportInstance).toBeDefined()
  process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
  process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
})

test('attempt to get store on production mode without env variables throws error', async () => {
  const oldMongoDbUrl = process.env.CARBON_MONGO_DB_URL
  const oldMongoDbName = process.env.CARBON_MONGO_DB_NAME
  const oldRunMode = process.env.CARBON_RUN_MODE
  process.env.CARBON_MONGO_DB_URL = ''
  process.env.CARBON_MONGO_DB_NAME = ''
  process.env.CARBON_RUN_MODE = PRODUCTION
  await expect(() => store.getStore()).rejects.toThrow()
  process.env.CARBON_RUN_MODE = oldRunMode
  process.env.CARBON_MONGO_DB_URL = oldMongoDbUrl
  process.env.CARBON_MONGO_DB_NAME = oldMongoDbName
})

test('store instance can be retrieved without crashing in DEV mode', async () => {
  const oldRunMode = process.env.CARBON_RUN_MODE
  process.env.CARBON_RUN_MODE = DEV
  await expect(store.getStore()).resolves.toBeDefined()
  process.env.CARBON_RUN_MODE = oldRunMode
})

test('retrieve user session by cookie retrieves correct object', async () => {
  const mockedSessionId = 'SESSION_ID1'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  const storeInstance = await store.getStore()
  const mockedUserSession = { passport: { user: { name: 'test123' } } }
  await new Promise((resolve) => {
    storeInstance.set(mockedSessionId, mockedUserSession as any, async () => {
      await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toEqual({
        name: 'test123'
      })
      storeInstance.destroy(mockedSessionId, () => {
        resolve(null)
      })
    })
  })
})

test('retrieve user session by cookie is undefined when session has expired', async () => {
  const mockedSessionId = 'SESSION_ID2'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  const storeInstance = await store.getStore()
  const mockedUserSession = {
    passport: { user: { name: 'test123' } },
    cookie: { expires: new Date().toISOString() }
  }
  await new Promise((resolve) => {
    storeInstance.set(mockedSessionId, mockedUserSession as any, async () => {
      await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toBeUndefined()
      resolve(null)
    })
  })
})

test('retrieve user session by cookie is undefined when session is not set', async () => {
  const mockedSessionId = 'SESSION_ID3'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toBeUndefined()
})

test('updating user session saves data succesfully', async () => {
  const mockedSessionId = 'SESSION_ID4'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  const storeInstance = await store.getStore()
  const mockedUserSession = { passport: { user: { name: 'test123' } } }
  await new Promise((resolve) => {
    storeInstance.set(mockedSessionId, mockedUserSession as any, async () => {
      const updateResult = await store.updateUserBySessionCookie(signedSessionCookie, {
        newProperty: '1234'
      })
      expect(updateResult).toBeTruthy()
      const retrievedUser = await store.getUserBySessionCookie(signedSessionCookie)
      expect(retrievedUser).toEqual({
        name: 'test123',
        newProperty: '1234'
      })
      storeInstance.destroy(mockedSessionId, () => {
        resolve(null)
      })
    })
  })
})

test('updating user session returns false when there is no session', async () => {
  const mockedSessionId = 'SESSION_ID5'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  const updateResult = await store.updateUserBySessionCookie(signedSessionCookie, {
    newProperty: '1234'
  })
  expect(updateResult).toBeFalsy()
  await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toBeUndefined()
})
