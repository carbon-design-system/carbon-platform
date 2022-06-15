/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import queryString from 'query-string'
import { useCallback, useState } from 'react'

// see "bracket-separator" entry on https://www.npmjs.com/package/query-string
const queryStringConfig = {
  arrayFormat: 'bracket-separator',
  arrayFormatSeparator: '|'
}

/**
 * Write to query state and get updates on query state change
 *
 * This hook allows to manage the state of a key/value in the browser query,
 *  with the following considerations:
 * 1- the value contained in `value` will automatically be updated when the browser query changes
 * 2- subscribing components can manipulate the query value by calling the `update`
 * function with a desired value
 * 3 - The `validateValue` function receives the current query string value
 * and should return true if the value is valid or false otherwise. If the value is invalid,
 * the hook will return the defaultValue or undefinded if the defaultValue hasn't been provided
 * 4- Supplying options `parseNumbers` or `parseBoolean` = `true` will cause the type of value
 * to be cast to desired type if possible, otherwise type will be string
 * @param {string} key Key to use in the query string
 * @param {{defaultValue: string, parseNumbers: boolean,
 * parseBooleans: boolean}} options Extra config options
 *
 * @returns {[queryState, setQueryState]} Current value and update function
 */
const useQueryState = (
  key,
  { defaultValue, parseNumbers = false, parseBooleans = false },
  validateValue = () => true
) => {
  const getValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return null
    }

    const query = queryString.parseUrl(window.location.search, {
      ...queryStringConfig,
      parseNumbers,
      parseBooleans
    }).query

    const val = query[key]

    if (typeof validateValue === 'function' && !validateValue(val)) {
      // invalid val , returning null
      return null
    }
    return val
  }, [key, parseBooleans, parseNumbers, validateValue])

  const [value, setValue] = useState(getValue())

  // Replace the route to then update the "state"
  const setQueryState = useCallback(
    (stateUpdater) => {
      const oldValue = getValue()
      const newValue = typeof stateUpdater === 'function' ? stateUpdater(oldValue) : stateUpdater

      // Don't rely on router.query here because that would cause unnecessary renders when other
      // query parameters change
      const query = queryString.parseUrl(window.location.search, {
        ...queryStringConfig,
        parseNumbers,
        parseBooleans
      }).query

      query[key] = newValue

      // Change query state without rerendering page
      history.pushState(null, null, `?${queryString.stringify(query, queryStringConfig)}`)

      setValue(getValue())
    },
    [getValue, key, parseBooleans, parseNumbers]
  )

  return [value ?? defaultValue ?? undefined, setQueryState]
}

export default useQueryState
