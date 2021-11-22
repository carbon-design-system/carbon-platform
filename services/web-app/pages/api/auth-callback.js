/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import passport from '../../lib/passport'
import requireAuth from '../../middleware/auth'

const handler = requireAuth(false).get(
  passport.authenticate('prepiam.ice.ibmcloud.com'),
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

export default handler
