/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import requireAuth from '../../middleware/requireAuth'

const logout = requireAuth(false).get((req, res) => {
  req.logout()
  let nextRoute = '/'

  if (req.session.next) {
    nextRoute = req.session.next
    delete req.session.next
  }

  res.redirect(nextRoute)
  res.end('')
})

export default logout
