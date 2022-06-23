/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Auth } from '../../main/auth/index.js'
import { RunMode, Runtime } from '../../main/runtime/index.js'

test('getPassport crashes in "Standard" mode when no env vars have been set', async (t) => {
  t.plan(1)

  const runtime = new Runtime({ runMode: RunMode.Standard })

  const auth = new Auth({ runtime })

  try {
    await auth.getPassport()
  } catch (err) {
    t.true(err instanceof TypeError)
  }
})

test('getPassport works in "Dev" mode without env vars', async (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev })

  const auth = new Auth({ runtime })
  const p = await auth.getPassport()

  t.not(p, undefined)
})

test('authenticate correctly uses a provided auth strategy', async (t) => {
  t.plan(1)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const auth = new Auth({ runtime })

  const authHandler = await auth.authenticate('not real' as any)

  try {
    await new Promise((resolve, reject) => {
      authHandler('', '', (err: any, user: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(user)
        }
      })
    })
  } catch (err: any) {
    t.is((err as Error).message, 'Unknown authentication strategy "not real"')
  }
})

/*
 * TODO: This is more of an e2e test. It should be refactored to have smaller functions that can be
 * tested in isolation
 */
//
//   it('Populates user correctly on req object', async () => {
//     const mockedUser = {
//       name: 'Jane Doe',
//       email: 'email@example.com'
//     }

//     const mockedUserPath = path.join(process.cwd(), 'mocked-user.json')
//     let oldUser

//     await new Promise((resolve, reject) => {
//       if (fs.existsSync(mockedUserPath)) {
//         fs.readFile(mockedUserPath, (err, data) => {
//           if (data) {
//             oldUser = JSON.parse(data as any)
//             resolve(null)
//           }
//           reject(err)
//         })
//       } else {
//         resolve(null)
//       }
//     })

//     await new Promise((resolve, reject) => {
//       fs.writeFile(mockedUserPath, JSON.stringify(mockedUser), (err) => {
//         if (err) reject(err)
//         resolve(null)
//       })
//     })

//     const req = {}
//     const authHandler = await authenticateWithPassport()
//     await new Promise((resolve) => {
//       authHandler(req, {}, () => {
//         resolve(null)
//       })
//     })
//     await expect((req as any).user).toEqual(mockedUser)
//     __test__.destroyInstance()
//     if (fs.existsSync(mockedUserPath)) {
//       fs.rmSync(mockedUserPath)
//     }
//     if (oldUser) {
//       fs.writeFile(mockedUserPath, JSON.stringify(oldUser), () => {})
//     }
//   })

/*
 * TODO: This should be tested at the local-auth-strategy.ts level as opposed to the Auth class
 * level.
 */
//   it('Throws error when using custom strategy and mocked-user is not found', async () => {
//     const mockedUserPath = path.join(process.cwd(), 'mocked-user.json')
//     let oldUser
//     await new Promise((resolve, reject) => {
//       if (fs.existsSync(mockedUserPath)) {
//         fs.readFile(mockedUserPath, (err, data) => {
//           if (data) {
//             oldUser = JSON.parse(data as any)
//             resolve(null)
//           }
//           reject(err)
//         })
//       } else {
//         resolve(null)
//       }
//     })

//     if (fs.existsSync(mockedUserPath)) {
//       fs.rmSync(mockedUserPath)
//     }

//     const authHandler = await authenticateWithPassport()

//     let nextRequest: any

//     await new Promise((resolve) => {
//       authHandler({}, {}, (req: any) => {
//         nextRequest = req
//         resolve(null)
//       })
//     })

//     await expect(nextRequest instanceof Error).toBeTruthy()
//     __test__.destroyInstance()
//     if (oldUser) {
//       fs.writeFile(mockedUserPath, JSON.stringify(oldUser), () => {})
//     }
//   })
// })

/*
 * TODO: Break this into a function that checks expiration, given a set of inputs and unit test that
 */
// describe('session', () => {
//   it('retrieves the correct session data when getting a non-expired session', async () => {
//     const mockedSessionId = 'SESSION_ID1'
//     const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
//     const storeInstance = await store.getStore()
//     const mockedUserSession = {
//       passport: { user: { name: 'test123' } },
//       cookie: { expires: new Date(Date.now() + 30 * 60000).toISOString() }
//     }
//     await new Promise((resolve) => {
//       storeInstance.set(mockedSessionId, mockedUserSession as any, async () => {
//         await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toEqual({
//           name: 'test123'
//         })
//         storeInstance.destroy(mockedSessionId, () => {
//           resolve(null)
//         })
//       })
//     })
//   })

/*
 * TODO: Test this by testing the function that checks expiration (like the above test)
 */
//   it('returns undefined when getting an expired session', async () => {
//     const mockedSessionId = 'SESSION_ID2'
//     const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
//     const storeInstance = await store.getStore()
//     const mockedUserSession = {
//       passport: { user: { name: 'test123' } },
//       cookie: { expires: new Date().toISOString() }
//     }
//     await new Promise((resolve) => {
//       storeInstance.set(mockedSessionId, mockedUserSession as any, async () => {
//         await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toBeUndefined()
//         resolve(null)
//       })
//     })
//   })

/*
 * TODO: This is mostly just testing whether or not we can retrieve values correctly from an
 * underlying data store, which boils down to mostly testing code that we didn't write. Recommend
 * removing this test.
 */
//   it('returns undefined when there is no session', async () => {
//     const mockedSessionId = 'SESSION_ID3'
//     const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
//     await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toBeUndefined()
//   })

/*
 * TODO: This is mostly testing whether or not the underlying store implementation can correctly
 * save and retrieve data. Recommend testing this at the store level if it is a store we've written
 * and we own or removing the test if the store is always 3rd party code. (Currently, it's either a
 * mongo store or a file store, neither of which we own).
 */
//   it('user update saves data successfully', async () => {
//     const mockedSessionId = 'SESSION_ID4'
//     const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
//     const storeInstance = await store.getStore()
//     const mockedUserSession = { passport: { user: { name: 'test123' } } }
//     await new Promise((resolve) => {
//       storeInstance.set(mockedSessionId, mockedUserSession as any, async () => {
//         const updateResult = await store.updateUserBySessionCookie(signedSessionCookie, {
//           newProperty: '1234'
//         })
//         expect(updateResult).toBeTruthy()
//         const retrievedUser = await store.getUserBySessionCookie(signedSessionCookie)
//         expect(retrievedUser).toEqual({
//           name: 'test123',
//           newProperty: '1234'
//         })
//         storeInstance.destroy(mockedSessionId, () => {
//           resolve(null)
//         })
//       })
//     })
//   })

/*
 * TODO: This is mostly re-testing updateUserBySessionKey and unsignSessionCookie. Recommend
 * removing this test
 */
//   it('user update returns false when there is no session', async () => {
//     const mockedSessionId = 'SESSION_ID5'
//     const signedSessionCookie = `s:${signature.sign(mockedSessionId, SESSION_SECRET)}`
//     const updateResult = await store.updateUserBySessionCookie(signedSessionCookie, {
//       newProperty: '1234'
//     })
//     expect(updateResult).toBeFalsy()
//     await expect(store.getUserBySessionCookie(signedSessionCookie)).resolves.toBeUndefined()
//   })
// })

// afterAll(() => {
//   fs.rmSync('.dev', { recursive: true })
// })
