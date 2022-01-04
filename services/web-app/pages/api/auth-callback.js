/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getPassportInstance } from '@carbon-platform/api/auth'

import requireSession from '../../middleware/requireSession'

const authCallback = requireSession().get(
  (await getPassportInstance()).authenticate('prepiam.ice.ibmcloud.com'),
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
