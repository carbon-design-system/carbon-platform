/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Auth, AuthStrategy, getAuthStrategyFromString } from '@carbon-platform/api/auth'
import { RunMode, Runtime } from '@carbon-platform/api/runtime'

import { ALLOWED_REFERERS } from '@/config/constants'

import requireSession from '../../middleware/require-session'

const runtime = new Runtime()
const auth = new Auth({ runtime })
// TODO: this logic probably shouldn't go here. It should be in a top-level configuration class
let authStrategy
try {
  authStrategy = getAuthStrategyFromString(process.env.PASSPORT_STRATEGY_NAME || '')
} catch (e) {}

if (!authStrategy) {
  authStrategy = runtime.runMode === RunMode.Standard ? AuthStrategy.ibmIdProd : AuthStrategy.local
}

const login = requireSession().get(
  async (req, res, next) => {
    if (req.session.next) {
      delete req.session.next
    }

    let refererUrl
    try {
      refererUrl = new URL(req.headers.referer)
    } catch (_) {
      refererUrl = undefined
    }

    if (refererUrl) {
      const { hostname, protocol } = refererUrl
      if (
        ALLOWED_REFERERS.some(
          (allowedReferer) =>
            protocol === allowedReferer.protocol && hostname.endsWith(`${allowedReferer.domain}`)
        )
      ) {
        req.session.next = refererUrl
      }
    }

    if (authStrategy === AuthStrategy.local) {
      res.redirect('/api/auth-callback')
      res.end('')
    }

    next()
  },
  async (...args) => (await auth.authenticate(authStrategy))(...args)
)

export default login
