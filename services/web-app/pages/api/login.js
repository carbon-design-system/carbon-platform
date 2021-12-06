/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { passport } from '@carbon-platform/auth'

import requireSession from '../../middleware/requireSession'

const login = requireSession().get((req, res, next) => {
  // hold onto next route, if specified, or delete any stale one from the session
  if (req.query.next) {
    req.session.next = req.query.next
  } else if (req.session.next) {
    delete req.session.next
  }

  next()
}, passport.authenticate('prepiam.ice.ibmcloud.com'))

export default login
