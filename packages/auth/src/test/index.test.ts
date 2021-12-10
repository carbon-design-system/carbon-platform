/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getPassportInstance } from '../main/index'
test('it can be invoked without crashing', async () => {
  const oldClientId = process.env.CARBON_IBM_VERIFY_CLIENT_ID
  const oldClientSecret = process.env.CARBON_IBM_VERIFY_CLIENT_SECRET
  process.env.CARBON_IBM_VERIFY_CLIENT_ID = 'MOCKCLIENT123'
  process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = 'MOCKSECRET123'
  expect(await getPassportInstance()).not.toBeUndefined()
  process.env.CARBON_IBM_VERIFY_CLIENT_ID = oldClientId
  process.env.CARBON_IBM_VERIFY_CLIENT_SECRET = oldClientSecret
})
