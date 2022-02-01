/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs'
import passport from 'passport'

import {
  __test__,
  authenticateWithPassport,
  getPassportInstance,
  SESSION_SECRET,
  store
} from '../../main/auth'
import {
  CUSTOM_LOCAL_STRATEGY,
  IBM_AUTHENTICATION_STRATEGY
} from '../../main/auth/config/constants'
import { RunMode } from '../../main/run-mode'

jest.mock('passport')
const mockedPassport = passport as jest.Mocked<typeof passport>

const signature = require('cookie-signature')

describe('getPassportInstance', () => {
  it('throws error when env variables have not been configured on PROD mode', async () => {
    const oldClientId = process.env.CARBON_IBM_VERIFY_CLIENT_ID
    const oldClientSecret = process.env.CARBON_IBM_VERIFY_CLIENT_SECRET
    const oldRunMode = process.env.CARBON_RUN_MODE
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = ''
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = ''
    process.env.CARBON_RUN_MODE = RunMode.Prod
    await expect(getPassportInstance()).rejects.toThrow()
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
    process.env.CARBON_RUN_MODE = oldRunMode
  })
  it('can be retrieved without crashing using OpenId strategy', async () => {
    const oldClientId = process.env.CARBON_IBM_VERIFY_CLIENT_ID
    const oldClientSecret = process.env.CARBON_IBM_VERIFY_CLIENT_SECRET
    const oldRunMode = process.env.CARBON_RUN_MODE
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = 'MOCK_CLIENT'
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = 'MOCK_SECRET'
    process.env.CARBON_RUN_MODE = RunMode.Dev
    const passportInstance = await getPassportInstance()
    expect(passportInstance).toBeDefined()
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
    process.env.CARBON_RUN_MODE = oldRunMode
    __test__.destroyInstance()
  })
  it('can be retrieved without crashing using custom local strategy', async () => {
    const oldClientId = process.env.CARBON_IBM_VERIFY_CLIENT_ID
    const oldClientSecret = process.env.CARBON_IBM_VERIFY_CLIENT_SECRET
    const oldRunMode = process.env.CARBON_RUN_MODE
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = ''
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = ''
    process.env.CARBON_RUN_MODE = RunMode.Dev
    const passportInstance = await getPassportInstance()
    expect(passportInstance).toBeDefined()
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
    process.env.CARBON_RUN_MODE = oldRunMode
    __test__.destroyInstance()
  })
})

describe('authenticateWithPassport', () => {
  it('gets called with IBM auth strategy when using OpenID strategy', async () => {
    const oldClientId = process.env.CARBON_IBM_VERIFY_CLIENT_ID
    const oldClientSecret = process.env.CARBON_IBM_VERIFY_CLIENT_SECRET
    const oldRunMode = process.env.CARBON_RUN_MODE
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = 'MOCK_CLIENT'
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = 'MOCK_SECRET'
    process.env.CARBON_RUN_MODE = RunMode.Dev
    mockedPassport.authenticate.mockReturnValue(null)
    await authenticateWithPassport()
    await expect(mockedPassport.authenticate).toHaveBeenCalledWith(IBM_AUTHENTICATION_STRATEGY)
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
    process.env.CARBON_RUN_MODE = oldRunMode
    __test__.destroyInstance()
  })
  it('gets called with custom auth strategy when not using OpenID strategy', async () => {
    const oldClientId = process.env.CARBON_IBM_VERIFY_CLIENT_ID
    const oldClientSecret = process.env.CARBON_IBM_VERIFY_CLIENT_SECRET
    const oldRunMode = process.env.CARBON_RUN_MODE
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = ''
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = ''
    process.env.CARBON_RUN_MODE = RunMode.Dev
    mockedPassport.authenticate.mockReturnValue(null)
    await authenticateWithPassport()
    await expect(mockedPassport.authenticate).toHaveBeenCalledWith(CUSTOM_LOCAL_STRATEGY)
    process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
    process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
    process.env.CARBON_RUN_MODE = oldRunMode
    __test__.destroyInstance()
  })
})

describe('getStore', () => {
  it('on production mode without env variables throws error', async () => {
    const oldMongoDbUrl = process.env.CARBON_MONGO_DB_URL
    const oldMongoDbName = process.env.CARBON_MONGO_DB_NAME
    const oldRunMode = process.env.CARBON_RUN_MODE
    process.env.CARBON_MONGO_DB_URL = ''
    process.env.CARBON_MONGO_DB_NAME = ''
    process.env.CARBON_RUN_MODE = RunMode.Prod
    await expect(() => store.getStore()).rejects.toThrow()
    process.env.CARBON_RUN_MODE = oldRunMode
    process.env.CARBON_MONGO_DB_URL = oldMongoDbUrl
    process.env.CARBON_MONGO_DB_NAME = oldMongoDbName
  })

  it('can be retrieved without crashing in Dev mode', async () => {
    const oldRunMode = process.env.CARBON_RUN_MODE
    process.env.CARBON_RUN_MODE = RunMode.Dev
    await expect(store.getStore()).resolves.toBeDefined()
    process.env.CARBON_RUN_MODE = oldRunMode
  })
})

describe('session', () => {
  it('retrieve attempt by cookie retrieves correct object when session not expired', async () => {
    const mockedSessionId = 'SESSION_ID1'
    const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
    const storeInstance = await store.getStore()
    const mockedUserSession = {
      passport: { user: { name: 'test123' } },
      cookie: { expires: new Date(Date.now() + 30 * 60000).toISOString() }
    }
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

  it('retireve attempt by cookie is undefined when session has expired', async () => {
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

  it('retrieve attempt by cookie is undefined when session is not set', async () => {
    const mockedSessionId = 'SESSION_ID3'
    const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
    await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toBeUndefined()
  })

  it('user update saves data succesfully', async () => {
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

  it('user update returns false when there is no session', async () => {
    const mockedSessionId = 'SESSION_ID5'
    const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
    const updateResult = await store.updateUserBySessionCookie(signedSessionCookie, {
      newProperty: '1234'
    })
    expect(updateResult).toBeFalsy()
    await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toBeUndefined()
  })
})

afterAll(() => {
  fs.rmSync('.dev', { recursive: true })
})
