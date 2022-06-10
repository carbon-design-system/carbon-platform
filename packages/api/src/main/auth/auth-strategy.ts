/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
enum AuthStrategy {
  ibmIdProd = 'login.ibm.com',
  local = 'local'
}

function getAuthStrategyFromString(strategy: string): AuthStrategy {
  const key = strategy as keyof typeof AuthStrategy

  if (AuthStrategy[key]) {
    return AuthStrategy[key]
  }

  throw new Error('No such auth strategy: ' + strategy)
}

export { AuthStrategy, getAuthStrategyFromString }
