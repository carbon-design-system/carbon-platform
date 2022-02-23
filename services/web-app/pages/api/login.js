/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { authenticateWithPassport, shouldUseOpenIdStrategy } from '@carbon-platform/api/auth'

import { ALLOWED_REFERERS } from '@/config/constants'

import requireSession from '../../middleware/requireSession'

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

    if (!shouldUseOpenIdStrategy()) {
      res.redirect('/api/auth-callback')
      res.end('')
    }

    next()
  },
  async (...args) => (await authenticateWithPassport())(...args)
)

export default login
