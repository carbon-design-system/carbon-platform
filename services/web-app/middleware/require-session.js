/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Auth, SESSION_SECRET, store } from '@carbon-platform/api/auth'
import { Logging } from '@carbon-platform/api/logging'
import { RunMode, Runtime } from '@carbon-platform/api/runtime'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import nextConnect from 'next-connect'

const logging = new Logging({ component: 'requireSession' })

/**
 * Bootstraps session into request, returns 404 if user is required for resource
 *
 * @param {boolean?} needsUser Enforces user in request, defaults to false
 * @returns {import('next-connect').NextConnect} NextConnect middleware with session configuration
 */
export default function requireSession(needsUser = false) {
  const runtime = new Runtime()

  return nextConnect({
    onError: (err, _req, res) => {
      logging.error(err.stack)
      res.status(500).end('Something broke!')
    }
  })
    .use(cookieParser())
    .use(async (...args) => {
      const storeInstance = await store.getStore(runtime)
      expressSession({
        cookie: {
          httpOnly: true,
          maxAge: 60 * 60 * 2 * 1000, // 2 hours
          path: '/',
          secure: runtime.runMode === RunMode.Standard
        },
        proxy: true,
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        store: storeInstance
      })(...args)
    })
    .use(async (...args) => (await new Auth().getPassport()).initialize()(...args))
    .use(async (...args) => (await new Auth().getPassport()).session()(...args))
    .use((req, res, next) => {
      if (needsUser && !req.user) {
        res.status(404)
        res.end('not found')
      } else {
        req.session.save()
        next?.()
      }
    })
}
