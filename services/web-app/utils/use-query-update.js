/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import queryString from 'query-string'

const useQueryUpdate = () => {
  const router = useRouter()
  /**
   * Updates multiple keys in the url query at once
   * @param {{[key]: val}} keyValPairs - Object containing key value pairs to update in query
   * @example
   * bulkUpdateQuery({key1: value1, key2: value2});
   * @returns {void}
   */
  return (keyValPairs) => {
    const query = queryString.parseUrl(window.location.search, {
      arrayFormat: 'bracket',
      parseNumbers: true,
      parseBooleans: true
    }).query

    Object.entries(keyValPairs).forEach(([queryKey, queryValue]) => {
      query[queryKey] = queryValue
    })

    router.replace(`?${queryString.stringify(query, { arrayFormat: 'bracket' })}`, undefined, {
      shallow: true,
      scroll: false
    })
  }
}

export default useQueryUpdate
