/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import path from 'path'

import { RunMode, Runtime } from '../runtime/index.js'
import { CARBON_MONGO_DB_NAME, CARBON_MONGO_DB_URL, SESSION_SECRET } from './constants.js'
import { User } from './interfaces.js'

let storeInstance: expressSession.Store

// TODO: For this file as a whole, wrap it up into a class that has its configuration "injected" so
// it is not required to reach out to the runtime itself or use environment variables, since that
// level of config-grabbing should be done at the top-level in the application.
// Also remove all `new Runtime()` instances from these functions and dependency inject them (or
// what is needed from them).

async function createMongoStore(): Promise<expressSession.Store> {
  const { MongoClient } = await import('mongodb')
  const MongoStore = (await import('connect-mongo')).default

  const mongoClientPromise = new MongoClient(CARBON_MONGO_DB_URL).connect()

  return MongoStore.create({
    clientPromise: mongoClientPromise,
    dbName: CARBON_MONGO_DB_NAME
  })
}

async function createFileStore(): Promise<expressSession.Store> {
  const FileStore = (await import('session-file-store')).default(expressSession)

  return new FileStore({
    path: path.join(process.cwd(), '.dev', 'session-store'),
    retries: 0
  })
}

/**
 * Initializes a store object (if needed), caches it, and returns it.
 *
 * @returns {Promise<Store>} Promise that resolves to a store instance.
 */
const getStore = async (runtime: Runtime): Promise<expressSession.Store> => {
  if (!storeInstance) {
    // TODO: refactor this to use dependency injection instead of needing to get an envvar. Inject
    // a configuration object that is created at a higher [application] level
    if (runtime.runMode === RunMode.Standard && process.env.CARBON_USE_LOCAL_DB !== '1') {
      storeInstance = await createMongoStore()
    } else {
      storeInstance = await createFileStore()
    }
  }

  return storeInstance
}

/**
 * Retrieves a user session object for a given sessionKey
 *
 * @param {string} sessionKey Session Key
 * @returns {Promise<SessionData | null>} Promise that resolves to the session object
 *  (or null if not found)
 */
const getUserSessionByKey = async (
  sessionKey: string
): Promise<expressSession.SessionData | null> => {
  const runtime = new Runtime()
  const retrievedStore = await getStore(runtime)
  return new Promise((resolve) => {
    retrievedStore.get(sessionKey, (_: any, session: any) => {
      if (session?.cookie?.expires) {
        const sessionExpireDate = new Date(session.cookie.expires)
        if (sessionExpireDate.getTime() <= Date.now()) {
          // session is expired
          retrievedStore.destroy(sessionKey, (err) => {
            if (err) {
              console.warn(`could not destroy expired session: ${err}`)
            }
            resolve(null)
          })
        } else {
          resolve(session)
        }
      } else {
        resolve(session)
      }
    })
  })
}

/**
 * Retrieves user information for a given session key
 *
 * @param {string} sessionKey Session Key
 * @returns {Promise<User | undefined>} Promise that resolves to User object
 * (or undefined if not found)
 */
const getUserBySessionKey = (sessionKey: string): Promise<User | undefined> => {
  return getUserSessionByKey(sessionKey).then((session: any) => {
    return session?.passport?.user as User
  })
}

/**
 * Updates the user object for a given session key
 *
 * @param {string} sessionKey Session Key
 * @param {object} userInfo Additional/Updated user info
 * @returns {Promise<boolean>} Promise that resolves to boolean indicating success status
 */
const updateUserBySessionKey = (sessionKey: string, userInfo: Object): Promise<boolean> => {
  const runtime = new Runtime()
  return new Promise((resolve) => {
    getUserSessionByKey(sessionKey)
      .then((userSession: any) => {
        if (userSession?.passport?.user) {
          const newSessionVal = {
            ...userSession,
            passport: {
              ...userSession.passport,
              user: { ...userSession.passport.user, ...userInfo }
            }
          }
          getStore(runtime).then((retrievedStore) => {
            retrievedStore.set(sessionKey, newSessionVal, (err: any) => {
              resolve(!err)
            })
          })
        } else {
          resolve(false)
        }
      })
      .catch(() => {
        resolve(false)
      })
  })
}

/**
 * Strips cookie of signature to obtain raw sessionKey
 *
 * @param {string} sessionCookie Session Cookie
 * @returns {string | false} unsigned cookie string or false if unsuccessful
 */
const unsignSessionCookie = (sessionCookie: string): string | false => {
  return cookieParser.signedCookie(sessionCookie, SESSION_SECRET)
}

/**
 * Retrieves user information for a given session cookie
 *
 * @param {string} sessionCookie Session Cookie
 * @returns {Promise<User | undefined>} Promise that resolves to User object
 * (or undefined if unsuccessful)
 */
const getUserBySessionCookie = async (sessionCookie: string): Promise<User | undefined> => {
  const sessionId = unsignSessionCookie(sessionCookie)
  let user
  if (sessionId) {
    user = await getUserBySessionKey(sessionId)
  }
  return user
}

/**
 * Updates the user object for a given session Cookie
 *
 * @param {string} sessionCookie Session Cookie
 * @returns {Promise<boolean>} Promise that resolves to boolean indicating success status
 */
const updateUserBySessionCookie = async (
  sessionCookie: string,
  userInfo: any
): Promise<boolean> => {
  const sessionId = unsignSessionCookie(sessionCookie)
  let success = false
  if (sessionId) {
    success = await updateUserBySessionKey(sessionId, userInfo)
  }
  return success
}

export { getStore, getUserBySessionCookie, updateUserBySessionCookie }
