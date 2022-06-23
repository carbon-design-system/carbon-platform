/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TokenSet, UserinfoResponse } from 'openid-client'

import { User } from '../interfaces.js'

function openIdAuthStrategy(
  _tokenset: TokenSet,
  userinfo: UserinfoResponse,
  done: (err: any, user?: User) => void
) {
  // this has more info, right now just saving name & email
  done(null, { name: userinfo.name || '', email: userinfo.email || '' })
}

export { openIdAuthStrategy }
