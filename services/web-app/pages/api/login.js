/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { authenticateWithPassport } from '@carbon-platform/api/auth'

import { ALLOWED_REFERERS } from '@/config/constants'

import requireSession from '../../middleware/requireSession'

const login = requireSession().get(
  async (req, res, next) => {
    if (req.session.next) {
      delete req.session.next
    }

    const refererUrl = new URL(req.headers.referer)
    const host = refererUrl.host.split(':')[0]
    if (
      ALLOWED_REFERERS.some(
        (domain) => refererUrl.protocol === domain.protocol && host.endsWith(`${domain.domain}`)
      )
    ) {
      req.session.next = refererUrl
    }

    next()
  },
  async (...args) => (await authenticateWithPassport())(...args)
)

export default login
