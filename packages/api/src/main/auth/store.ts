/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cookieParser from 'cookie-parser'
import expressSession, { Store } from 'express-session'

import { enforceEnvVars } from '../enforce-env-vars'
import { getRunMode, PRODUCTION } from '../run-mode'
import { PROD_SESSION_REQUIRED_ENV_VARS, SESSION_SECRET } from './config/constants'
import { User } from './models/user.model'

let currStore: Store
/**
 * Initializes a store object and assigns it to currStore
 *
 * @returns {Promise<expressSession.Store>} Promise that resolves to an express store instance.
 */
const init = async (): Promise<expressSession.Store> => {
  if (getRunMode() === PRODUCTION) {
    enforceEnvVars({ PRODUCTION: PROD_SESSION_REQUIRED_ENV_VARS })

    const MongoStore = require('connect-mongo')
    // this will likely be replaced by database package (?)
    const { MongoClient } = require('mongodb')
    const mongoClientPromise = new MongoClient(process.env.CARBON_MONGO_DB_URL).connect()
    currStore = MongoStore.create({
      clientPromise: mongoClientPromise,
      dbName: process.env.CARBON_MONGO_DB_NAME
    })
  } else {
    // connect-session-sequelize doesn't have type definitions work-around
    type ISequelizeStore = Store & { sync: () => Promise<void> }
    const fs = require('fs')
    const Sequelize = require('sequelize')
    const SequelizeStore = require('connect-session-sequelize')(expressSession.Store)
    const sqlite3 = require('sqlite3')

    const dir = 'data'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    const sequelize = new Sequelize('database', 'username', 'password', {
      dialect: 'sqlite',
      dialectModule: sqlite3,
      storage: 'data/sessiondb.sqlite'
    })
    currStore = new SequelizeStore({
      db: sequelize
    })
    await (currStore as ISequelizeStore).sync()
  }
  return currStore
}

/**
 * Gets and Returns current store instance
 *
 * @returns {Promise<expressSession.Store>} Promise that resolves to current express store instance.
 */
const getStore = async (): Promise<expressSession.Store> => {
  if (!currStore) {
    return init()
  }
  return currStore
}

/**
 * Retrieves a user session object for a given sessionKey
 *
 * @param {string} sessionKey Session Key
 * @returns {Promise<expressSession.SessionData | null>} Promise that resolves to the session object
 *  (or null if not found)
 */
const getUserSessionByKey = async (
  sessionKey: string
): Promise<expressSession.SessionData | null> => {
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
const updateUserBySessionKey = async (sessionKey: string, userInfo: Object): Promise<boolean> => {
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
  return sessionId ? getUserBySessionKey(sessionId) : undefined
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
  return sessionId ? updateUserBySessionKey(sessionId, userInfo) : false
}

export { getStore, getUserBySessionCookie, updateUserBySessionCookie }
