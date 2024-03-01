/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import nextConnect from 'next-connect'

const readiness = nextConnect().get((_, res) => {
  res.status(204).end()
})

export default readiness
