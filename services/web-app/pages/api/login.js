/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { authenticateWithPassport, shouldUseOpenIdStrategy } from '@carbon-platform/api/auth'

import requireSession from '../../middleware/requireSession'

const login = requireSession().get(
  async (req, res, next) => {
    // hold onto next route, if specified, or delete any stale one from the session
    if (req.query.next) {
      req.session.next = req.query.next
    } else if (req.session.next) {
      delete req.session.next
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
