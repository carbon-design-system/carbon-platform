/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs'
import passport from 'passport'
import path from 'path'

import {
  authenticateWithPassport,
  getPassportInstance,
  SESSION_SECRET,
  store
} from '../../main/auth'
import { PASSPORT_STRATEGY_NAME } from '../../main/auth/constants'
import { __test__ } from '../../main/auth/passport'
import { getRunMode, RunMode } from '../../main/runtime'

const signature = require('cookie-signature')

describe('getPassportInstance', () => {
  it('crashes on PROD when no env vars have been set', async () => {
    const oldCarbonRunMode = getRunMode()
    process.env.CARBON_RUN_MODE = RunMode.Prod
    await expect(async () => getPassportInstance()).rejects.toThrow()
    process.env.CARBON_RUN_MODE = oldCarbonRunMode
    __test__.destroyInstance()
  })
  it('can be retrieved without crashing on DEV', async () => {
    const passportInstance = await getPassportInstance()
    expect(passportInstance).toBeDefined()
    __test__.destroyInstance()
  })
})

describe('authenticateWithPassport', () => {
  it('gets called with expected params', async () => {
    const passportAuthenticateFn = passport.authenticate
    passport.authenticate = jest.fn().mockReturnValue(null)
    await authenticateWithPassport()
    await expect(passport.authenticate).toHaveBeenCalledWith(PASSPORT_STRATEGY_NAME)
    passport.authenticate = passportAuthenticateFn
    __test__.destroyInstance()
  })
  it('Populates user correctly on req object', async () => {
    const mockedUser = {
      name: 'Jane Doe',
      email: 'email@example.com'
    }

    const mockedUserPath = path.join(process.cwd(), 'mocked-user.json')
    let oldUser
    await new Promise((resolve, reject) => {
      if (fs.existsSync(mockedUserPath)) {
        fs.readFile(mockedUserPath, (err, data) => {
          if (data) {
            oldUser = JSON.parse(data as any)
            resolve(null)
          }
          reject(err)
        })
      } else {
        resolve(null)
      }
    })

    await new Promise((resolve, reject) => {
      fs.writeFile(mockedUserPath, JSON.stringify(mockedUser), (err) => {
        if (err) reject(err)
        resolve(null)
      })
    })

    const req = {}
    const authHandler = await authenticateWithPassport()
    await new Promise((resolve) => {
      authHandler(req, {}, () => {
        resolve(null)
      })
    })
    await expect((req as any).user).toEqual(mockedUser)
    __test__.destroyInstance()
    if (fs.existsSync(mockedUserPath)) {
      fs.rmSync(mockedUserPath)
    }
    if (oldUser) {
      fs.writeFile(mockedUserPath, JSON.stringify(oldUser), () => {})
    }
  })

  it('Throws error when using custom strategy and mocked-user is not found', async () => {
    const mockedUserPath = path.join(process.cwd(), 'mocked-user.json')
    let oldUser
    await new Promise((resolve, reject) => {
      if (fs.existsSync(mockedUserPath)) {
        fs.readFile(mockedUserPath, (err, data) => {
          if (data) {
            oldUser = JSON.parse(data as any)
            resolve(null)
          }
          reject(err)
        })
      } else {
        resolve(null)
      }
    })

    if (fs.existsSync(mockedUserPath)) {
      fs.rmSync(mockedUserPath)
    }

    const authHandler = await authenticateWithPassport()

    let nextRequest

    await new Promise((resolve) => {
      authHandler({}, {}, (req) => {
        nextRequest = req
        resolve(null)
      })
    })

    await expect(nextRequest instanceof Error).toBeTruthy()
    __test__.destroyInstance()
    if (oldUser) {
      fs.writeFile(mockedUserPath, JSON.stringify(oldUser), () => {})
    }
  })
})

describe('getStore', () => {
  it('on production mode without env variables throws error', async () => {
    const oldCarbonRunMode = getRunMode()
    process.env.CARBON_RUN_MODE = RunMode.Prod
    await expect(() => store.getStore()).rejects.toThrow()
    process.env.CARBON_RUN_MODE = oldCarbonRunMode
  })

  it('can be retrieved without crashing in Dev mode', async () => {
    await expect(store.getStore()).resolves.toBeDefined()
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

  it('user update saves data successfully', async () => {
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
