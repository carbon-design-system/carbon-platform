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

let store: Store
const init = () => {
  // TODO: replace env variable check with run-mode package
  if (process.env.CARBON_NODE_ENV === 'production') {
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
    store = MongoStore.create({
      clientPromise: mongoClientPromise,
      dbName: process.env.CARBON_MONGO_DB_NAME
    })
  } else {
    if (!process.env.CARBON_LOCAL_DB_DIRECTORY) {
      throw new Error(
        `${'CARBON_LOCAL_DB_DIRECTORY'} must be exported as an environment variable or in the .env file`
      )
    }
    const Sequelize = require('sequelize')
    const SequelizeStore = require('connect-session-sequelize')(expressSession.Store)
    const sqlite3 = require('sqlite3')
    const sequelize = new Sequelize('database', 'username', 'password', {
      dialect: 'sqlite',
      dialectModule: sqlite3,
      storage: `${process.env.CARBON_LOCAL_DB_DIRECTORY}/sessiondb.sqlite`
    })
    store = new SequelizeStore({
      db: sequelize
    })
    ;(store as any).sync()
  }
  return store
}

const getStore = () => {
  if (!store) {
    return init()
  }
  return store
}

const getUserSessionByKey = (sessionKey: string) => {
  const userSessionPromise = new Promise((resolve) => {
    getStore().get(sessionKey, (_: any, session: any) => {
      resolve(session)
    })
  })
  return userSessionPromise
}

const getUserBySessionKey = (sessionKey: string) => {
  const userPromise = new Promise((resolve) => {
    getStore().get(sessionKey, (_: any, session: any) => {
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
          getStore().set(sessionKey, newSessionVal, (err: any) => {
            resolve(!err)
          })
          resolve(true)
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

const carbonStore = { getUserBySessionCookie, getStore, updateUserBySessionCookie }

export default carbonStore
