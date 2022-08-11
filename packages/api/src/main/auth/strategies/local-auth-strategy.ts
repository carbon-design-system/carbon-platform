/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Request } from 'express'
import fs from 'fs'
import { VerifiedCallback } from 'passport-custom'
import path from 'path'

// TODO: can this extend CustomStrategy or can we easily make our own that complies with what
// passport needs?
function localAuthStrategy(_: Request, done: VerifiedCallback) {
  const dir = path.join(process.cwd(), 'mocked-user.json')
  if (!fs.existsSync(dir)) {
    throw new Error('mocked-user.json file could not be found')
  }
  fs.readFile(dir, (err, data) => {
    if (data) {
      const user = JSON.parse(data.toString())
      done(err, user)
    } else {
      done(err, null)
    }
  })
}

export { localAuthStrategy }
