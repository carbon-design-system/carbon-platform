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

export const contentNameSortComparator = (a, b) => {
  if (a.content.name === b.content.name) {
    return 0
  }
  return a.content.name > b.content.name ? 1 : -1
}
