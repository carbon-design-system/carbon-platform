/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const getStatus = (status) => {
  if (status === 'stable') return 'Stable'

  return 'To do'
}

export const getRepo = (repo) => {
  if (repo === 'carbon') return 'Carbon'

  return 'To do'
}
