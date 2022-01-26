/*
 * Copyright IBM Corp. 2022, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { retrieveUser } from '../retrieveUser'
import { isValidIbmEmail } from '../string'

/**
 * Determines if user is authorized based on IBM email
 * @param {GetServerSidePropsContext} context - getServerSideProps context object
 * @returns {boolean} boolean indicating whether user is authorized to view resource or not
 */
const isValidIbmUser = async (context) => {
  const user = await retrieveUser(context)
  if (user) {
    return isValidIbmEmail(user.email ?? '')
  }
  return false
}

export default isValidIbmUser
