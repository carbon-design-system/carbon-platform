/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { authenticateWithPassport } from '@carbon-platform/api/auth'

import requireSession from '../../middleware/requireSession'

const authCallback = requireSession().get(
  async (...args) => (await authenticateWithPassport())(...args),
  (req, res) => {
    if (!req.user) {
      res.redirect(`/login?${req.session.next || ''}`)
      res.end('')
      return
    }

    let nextRoute = '/'
    if (req.session.next) {
      nextRoute = req.session.next
      delete req.session.next
    }

    res.redirect(nextRoute)
    res.end('')
  }
)

export default authCallback
