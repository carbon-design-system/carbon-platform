/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Auth } from '@carbon-platform/api/auth'
import { Runtime } from '@carbon-platform/api/runtime'

import requireSession from '../../middleware/require-session'

const runtime = new Runtime()
const auth = new Auth({ runtime })

const authCallback = requireSession().get(
  // TODO: the auth strategy being used should be stored in the session for the callback portion of
  // the authenticate request. That way, it can be provided to the auth.authenticate() call below.
  // For now, it's just using the strategy calculated by the Auth class itself, which is based on
  // the run mode and the PASSPORT_STRATEGY_NAME envvar.
  async (...args) => (await auth.authenticate())(...args),
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

    req.session.save(function () {
      res.redirect(nextRoute)
      res.end('')
    })
  }
)

export default authCallback
