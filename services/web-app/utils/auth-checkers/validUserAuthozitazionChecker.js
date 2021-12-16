import { retrieveUser } from '../retrieveUser'

/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const validUserAuthorizationChecker = async (context) => {
  const user = await retrieveUser(context)
  if (user) {
    return user.email?.endsWith('ibm.com')
  }
  return false
}

export default validUserAuthorizationChecker
