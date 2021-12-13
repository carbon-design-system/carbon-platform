/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getPassportInstance, SESSION_SECRET, store } from '@carbon-platform/auth'
import { getRunMode, PRODUCTION } from '@carbon-platform/run-mode'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import nextConnect from 'next-connect'

const passport = await getPassportInstance()
const storeInstance = await store.getStore()
export default function requireSession(needsUser = false) {
  return nextConnect({
    onError: (err, req, res) => {
      console.error(err.stack)
      res.status(500).end('Something broke!')
    }
  })
    .use(cookieParser())
    .use(
      expressSession({
        store: storeInstance,
        secret: SESSION_SECRET,
        cookie: {
          path: '/',
          secure: getRunMode() === PRODUCTION
          // maxAge: 60 * 60 * 2 // 2 hours
        }
      })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
      if (needsUser && !req.user) {
        res.status(404)
        res.end('not found')
      } else {
        next()
      }
    })
}
