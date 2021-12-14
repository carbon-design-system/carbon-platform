/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getRunMode, PRODUCTION } from '@carbon-platform/run-mode'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import expressSession, { Store } from 'express-session'

import { SESSION_SECRET } from './config/constants'
config()

let currStore: Store
const init = async () => {
  if (getRunMode() === PRODUCTION) {
    const REQUIRED_ENV_VARS = ['CARBON_MONGO_DB_URL', 'CARBON_MONGO_DB_NAME']
    REQUIRED_ENV_VARS.forEach((param) => {
      if (!process.env[param]) {
        throw new Error(`${param} must be exported as an environment variable or in the .env file`)
      }
    })

    const MongoStore = require('connect-mongo')
    // this will likely be replaced by database package (?)
    const { MongoClient } = require('mongodb')
    const mongoClientPromise = new MongoClient(process.env.CARBON_MONGO_DB_URL).connect()
    currStore = MongoStore.create({
      clientPromise: mongoClientPromise,
      dbName: process.env.CARBON_MONGO_DB_NAME
    })
  } else {
    const Sequelize = require('sequelize')
    const SequelizeStore = require('connect-session-sequelize')(expressSession.Store)
    const sqlite3 = require('sqlite3')
    const sequelize = new Sequelize('database', 'username', 'password', {
      dialect: 'sqlite',
      dialectModule: sqlite3,
      storage: 'data/sessiondb.sqlite'
    })
    currStore = new SequelizeStore({
      db: sequelize
    })
    await (currStore as any).sync()
  }
  return Promise.resolve(currStore)
}

const getStore = () => {
  if (!currStore) {
    return init()
  }
  return Promise.resolve(currStore)
}

const getUserSessionByKey = async (sessionKey: string) => {
  return getStore().then((retrievedStore) => {
    return new Promise((resolve) => {
      retrievedStore.get(sessionKey, (_: any, session: any) => {
        resolve(session)
      })
    })
  })
}

const getUserBySessionKey = (sessionKey: string) => {
  return getStore().then((retrievedStore) => {
    return new Promise((resolve) => {
      retrievedStore.get(sessionKey, (_: any, session: any) => {
        resolve(session?.passport?.user)
      })
    })
  })
}

const updateUserBySessionKey = async (sessionKey: string, userInfo: Object) => {
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

const store = { getUserBySessionCookie, getStore, updateUserBySessionCookie }

export default store
