/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import requireSession from 'middleware/requireSession'

const user = requireSession(true).get((req, res) => {
  res.status(200).json(req.session.passport.user)
})

export default user
