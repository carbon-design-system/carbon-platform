/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import connectSqlite3 from 'connect-sqlite3'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import nextConnect from 'next-connect'

import passport from '../lib/passport'

const SQLiteStore = connectSqlite3(expressSession)

export default function requireAuth(needsUser = true) {
  return nextConnect({
    onError: (err, req, res) => {
      console.error(err.stack)
      res.status(500).end('Something broke!')
    }
  })
    .use(cookieParser())
    .use(
      expressSession({
        store: new SQLiteStore({ dir: 'data', db: 'sessiondb.sqlite' }),
        secret: process.env.SQL_SESSION_SECRET,
        cookie: {
          path: '/',
          secure: process.env.NODE_ENV === 'production'
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
