/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getPassportInstance, SESSION_SECRET, store } from '@carbon-platform/auth'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import nextConnect from 'next-connect'

const passport = await getPassportInstance()
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
        store: store.getStore(),
        secret: SESSION_SECRET,
        cookie: {
          path: '/',
          // TODO: use run-mode package
          secure: process.env.CARBON_NODE_ENV === 'production'
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
