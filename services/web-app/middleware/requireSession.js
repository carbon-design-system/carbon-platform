/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getPassportInstance, SESSION_SECRET, store } from '@carbon-platform/api/auth'
import { getRunMode, RunMode } from '@carbon-platform/api/run-mode'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import nextConnect from 'next-connect'

/**
 * Bootstraps session into request, returns 404 if user is required for resource
 *
 * @param {boolean?} needsUser Enforces user in request, defaults to false
 * @returns {import('next-connect').NextConnect} NextConnect middleware with session configuration
 */
export default function requireSession(needsUser = false) {
  return nextConnect({
    onError: (err, req, res) => {
      console.error(err.stack)
      res.status(500).end('Something broke!')
    }
  })
    .use(cookieParser())
    .use(async (...args) => {
      const storeInstance = await store.getStore()
      expressSession({
        store: storeInstance,
        secret: SESSION_SECRET,
        cookie: {
          path: '/',
          secure: getRunMode() === RunMode.Prod,
          maxAge: 60 * 60 * 2 * 1000 // 2 hours
        },
        saveUninitialized: false,
        resave: false
      })(...args)
    })
    .use(async (...args) => (await getPassportInstance()).initialize()(...args))
    .use(async (...args) => (await getPassportInstance()).session()(...args))
    .use((req, res, next) => {
      if (needsUser && !req.user) {
        res.status(404)
        res.end('not found')
      } else {
        next?.()
      }
    })
}
