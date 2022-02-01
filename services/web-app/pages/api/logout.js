/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import requireSession from '../../middleware/requireSession'

const logout = requireSession().get((req, res) => {
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
