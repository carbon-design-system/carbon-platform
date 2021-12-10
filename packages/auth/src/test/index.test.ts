/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
  expect(passportInstance).not.toBeUndefined()
  process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
  process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
})

test('attempt to get store on production mode without env variables throws error', () => {
  const oldMongoDbUrl = process.env.CARBON_MONGO_DB_URL
  const oldMongoDbName = process.env.CARBON_MONGO_DB_NAME
  const oldNodeENv = process.env.CARBON_NODE_ENV
  process.env.CARBON_MONGO_DB_URL = ''
  process.env.CARBON_MONGO_DB_NAME = ''
  process.env.CARBON_NODE_ENV = 'production'
  expect(() => store.getStore()).toThrow()
  process.env.CARBON_NODE_ENV = oldNodeENv
  process.env.CARBON_MONGO_DB_URL = oldMongoDbUrl
  process.env.CARBON_MONGO_DB_NAME = oldMongoDbName
})

test('attempt to get store on dev mode without env variables throws error', () => {
  const oldNodeENv = process.env.CARBON_NODE_ENV
  const oldLocalDbDirectory = process.env.CARBON_LOCAL_DB_DIRECTORY
  process.env.CARBON_LOCAL_DB_DIRECTORY = ''
  process.env.CARBON_NODE_ENV = 'development'
  expect(() => store.getStore()).toThrow()
  process.env.CARBON_NODE_ENV = oldNodeENv
  process.env.CARBON_LOCAL_DB_DIRECTORY = oldLocalDbDirectory
})

test('store instance can be retrieved without crashing', () => {
  const oldLocalDbDirectory = process.env.CARBON_LOCAL_DB_DIRECTORY
  process.env.CARBON_LOCAL_DB_DIRECTORY = 'MOCK_DIRECTORY'
  expect(store.getStore()).not.toBeUndefined()
  process.env.CARBON_LOCAL_DB_DIRECTORY = oldLocalDbDirectory
})

test('retrieve user session by cookie retrieves correct object', async () => {
  const oldLocalDbDirectory = process.env.CARBON_LOCAL_DB_DIRECTORY
  process.env.CARBON_LOCAL_DB_DIRECTORY = 'MOCK_DIRECTORY'
  const mockedSessionId = 'SESSION_ID1'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  const storeInstance = store.getStore()
  const mockedUserSession = { passport: { user: { name: 'test123' } } }
  await new Promise((resolve) => {
    storeInstance.set(mockedSessionId, mockedUserSession as any, async () => {
      expect(await store.getUserBySessionCookie(signedSessionCookie)).toEqual({
        name: 'test123'
      })
      process.env.CARBON_LOCAL_DB_DIRECTORY = oldLocalDbDirectory
      storeInstance.destroy(mockedSessionId, () => {
        resolve(null)
      })
    })
  })
})

test('retrieve user session by cookie is undefined when session is not set', async () => {
  const oldLocalDbDirectory = process.env.CARBON_LOCAL_DB_DIRECTORY
  process.env.CARBON_LOCAL_DB_DIRECTORY = 'MOCK_DIRECTORY'
  const mockedSessionId = 'SESSION_ID2'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  expect(await store.getUserBySessionCookie(signedSessionCookie)).toBe(undefined)
  process.env.CARBON_LOCAL_DB_DIRECTORY = oldLocalDbDirectory
})

test('updating user session saves data succesfully', async () => {
  const oldLocalDbDirectory = process.env.CARBON_LOCAL_DB_DIRECTORY
  process.env.CARBON_LOCAL_DB_DIRECTORY = 'MOCK_DIRECTORY'
  const mockedSessionId = 'SESSION_ID3'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  const storeInstance = store.getStore()
  const mockedUserSession = { passport: { user: { name: 'test123' } } }
  await new Promise((resolve) => {
    storeInstance.set(mockedSessionId, mockedUserSession as any, async () => {
      const updateResult = await store.updateUserBySessionCookie(signedSessionCookie, {
        newProperty: '1234'
      })
      expect(updateResult).toBeTruthy()
      // give db time to sync
      setTimeout(async () => {
        const retrievedUser = await store.getUserBySessionCookie(signedSessionCookie)
        expect(retrievedUser).toEqual({
          name: 'test123',
          newProperty: '1234'
        })
        process.env.CARBON_LOCAL_DB_DIRECTORY = oldLocalDbDirectory
        storeInstance.destroy(mockedSessionId, () => {
          resolve(null)
        })
      }, 100)
    })
  })
})

test('updating user session returns false when there is no session', async () => {
  const oldLocalDbDirectory = process.env.CARBON_LOCAL_DB_DIRECTORY
  process.env.CARBON_LOCAL_DB_DIRECTORY = 'MOCK_DIRECTORY'
  const mockedSessionId = 'SESSION_ID4'
  const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
  const updateResult = await store.updateUserBySessionCookie(signedSessionCookie, {
    newProperty: '1234'
  })
  expect(updateResult).toBeFalsy()
  expect(await store.getUserBySessionCookie(signedSessionCookie)).toBe(undefined)
  process.env.CARBON_LOCAL_DB_DIRECTORY = oldLocalDbDirectory
})
