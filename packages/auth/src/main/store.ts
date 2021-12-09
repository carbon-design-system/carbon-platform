/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import expressSession, { Store } from 'express-session'

import { SESSION_SECRET } from './config/constants'
config()

// TODO: replace env variable check with run-mode package
let store: Store
if (process.env.NODE_ENV === 'production') {
  const REQUIRED_ENV_VARS = ['MONGO_DB_URL', 'MONGO_DB_NAME']
  REQUIRED_ENV_VARS.forEach((param) => {
    if (!process.env[param]) {
      throw new Error(`${param} must be exported as an environment variable or in the .env file`)
    }
  })

  const MongoStore = require('connect-mongo')
  // this will likely be replaced by database package (?)
  const { MongoClient } = require('mongodb')
  const mongoClientPromise = new MongoClient(process.env.MONGO_DB_URL).connect()
  store = MongoStore.create({
    clientPromise: mongoClientPromise,
    dbName: process.env.MONGO_DB_NAME
  })
} else {
  if (!process.env.LOCAL_DB_DIRECTORY) {
    throw new Error(
      `${'LOCAL_DB_DIRECTORY'} must be exported as an environment variable or in the .env file`
    )
  }
  const Sequelize = require('sequelize')
  const SequelizeStore = require('connect-session-sequelize')(expressSession.Store)
  const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: `${process.env.LOCAL_DB_DIRECTORY}/sessiondb.sqlite`
  })
  store = new SequelizeStore({
    db: sequelize
  })
  ;(store as any).sync()
}

const getUserSessionByKey = (sessionKey: string) => {
  const userSessionPromise = new Promise((resolve) => {
    store.get(sessionKey, (_: any, session: any) => {
      resolve(session)
    })
  })
  return userSessionPromise
}

const getUserBySessionKey = (sessionKey: string) => {
  const userPromise = new Promise((resolve) => {
    store.get(sessionKey, (_: any, session: any) => {
      resolve(session?.passport?.user)
    })
  })
  return userPromise
}

const updateUserBySessionKey = (sessionKey: string, userInfo: Object) => {
  const updatePromise = new Promise((resolve) => {
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
          store.set(sessionKey, newSessionVal, (err: any) => {
            resolve(!err)
          })
        } else {
          resolve(false)
        }
      })
      .catch(() => {
        resolve(false)
      })
  })
  return updatePromise
}

const unsignSessionCookie = (sessionCookie: string) => {
  return cookieParser.signedCookie(sessionCookie, SESSION_SECRET)
}

const getUserBySessionCookie = (sessionCookie: string) => {
  const sessionId = unsignSessionCookie(sessionCookie)
  return sessionId ? getUserBySessionKey(sessionId) : Promise.resolve(null)
}

const updateUserBySessionCookie = (sessionCookie: string, userInfo: any) => {
  const sessionId = unsignSessionCookie(sessionCookie)
  return sessionId ? updateUserBySessionKey(sessionId, userInfo) : Promise.resolve(false)
}

export default store
export { getUserBySessionCookie, updateUserBySessionCookie }
