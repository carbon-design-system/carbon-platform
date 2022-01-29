/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cookieParser from 'cookie-parser'
import { SessionData, Store } from 'express-session'

import { enforceEnvVars, getEnvVar } from '../enforce-env-vars'
import { getRunMode, PROD } from '../run-mode'
import { PROD_SESSION_REQUIRED_ENV_VARS, SESSION_SECRET } from './config/constants'
import { User } from './models/user.model'

let storeInstance: Store

async function createMongoStore(): Promise<Store> {
  const { MongoClient } = await import('mongodb')
  const MongoStore = (await import('connect-mongo')).default

  const mongoClientPromise = new MongoClient(getEnvVar('CARBON_MONGO_DB_URL')).connect()

  return MongoStore.create({
    clientPromise: mongoClientPromise,
    dbName: getEnvVar('CARBON_MONGO_DB_NAME')
  })
}

async function createSequelizeStore(): Promise<Store> {
  const path = await import('path')
  const fs = await import('fs')
  const { Sequelize } = await import('sequelize')
  const SequelizeStore = (await import('connect-session-sequelize')).default(Store)
  const sqlite3 = await import('sqlite3')

  const dir = path.join(process.cwd(), '.dev')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    dialectModule: sqlite3,
    storage: path.join(dir, 'sessiondb.sqlite')
  })

  const store = new SequelizeStore({
    db: sequelize
  })
  // The type definition doesn't recognize the fact that the underlying module impl being used here
  // is actually returning a promise that must be awaited
  await (store.sync as () => Promise<void>)()

  return store
}

/**
 * Initializes a store object (if needed), caches it, and returns it.
 *
 * @returns {Promise<Store>} Promise that resolves to a store instance.
 */
const getStore = async (): Promise<Store> => {
  if (!storeInstance) {
    if (getRunMode() === PROD) {
      enforceEnvVars(PROD_SESSION_REQUIRED_ENV_VARS)

      storeInstance = await createMongoStore()
    } else {
      storeInstance = await createSequelizeStore()
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
const getUserSessionByKey = async (sessionKey: string): Promise<SessionData | null> => {
  const retrievedStore = await getStore()
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
 * @param {Object} userInfo Additional/Updated user info
 * @returns {Promise<boolean>} Promise that resolves to boolean indicating success status
 */
const updateUserBySessionKey = (sessionKey: string, userInfo: Object): Promise<boolean> => {
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
          getStore().then((retrievedStore) => {
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
