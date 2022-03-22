/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useCallback, useEffect, useState } from 'react'

import { isJsonString } from './string'

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
 * 3 - All queryState key/values will be saved to localStorage
 * 4 - The `validateValue` function receives the current query string value
 * and should return true if the value is valid or false otherwise. If the value is invalid,
 * the hook will return the last value saved to localStorage (null if not set)
 * 5 - By default, queryStates are always saved to localStorage and this value is reset
 * to the provided `defaultValue` every time a new page navigation to the path occurs;
 * supplying option `resetOnLoad` = `false` will cause the value to never be reset
 * 6- Supplying options `parseNumbers` or `parseBoolean` = `true` will cause the type of value
 * to be cast to desired type if possible, otherwise type will be string
 * @param {string} key Key to use in the query string
 * @param {{defaultValue: string, parseNumbers: boolean,
 * parseBooleans: boolean, resetOnLoad: boolean}} options Extra config options
 *
 * @returns {{value, update}} Current value and update function
 */
const useQueryState = (
  key,
  { defaultValue = '', parseNumbers = false, parseBooleans = false, resetOnLoad = true },
  validateValue = () => true
) => {
  const router = useRouter()

  const getValue = useCallback(
    (isInternalCall = false) => {
      if (typeof window === 'undefined') {
        return null
      }

      const query = queryString.parseUrl(window.location.search, {
        ...queryStringConfig,
        parseNumbers,
        parseBooleans
      }).query

      if (!isInternalCall && resetOnLoad) {
        localStorage.setItem(`${router.pathname}:${key}`, defaultValue)
      }

      const val = query[key]

      if (typeof validateValue === 'function' && !validateValue(val)) {
        const storageValue = localStorage.getItem(`${router.pathname}:${key}`)
        const parsedValue = isJsonString(storageValue) ? JSON.parse(storageValue) : storageValue
        const queryStringFromStorage = queryString.stringify(
          { key: parsedValue },
          queryStringConfig
        )

        return queryString.parseUrl(`?${queryStringFromStorage}`, {
          ...queryStringConfig,
          parseNumbers,
          parseBooleans
        }).query.key
      }

      return val
    },
    [key, parseBooleans, parseNumbers, router.pathname, resetOnLoad, validateValue, defaultValue]
  )

  const [value, setValue] = useState(getValue())

  // Replace the route to then update the "state"
  const update = useCallback(
    (stateUpdater) => {
      const oldValue = getValue(true)
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

      setValue(getValue(true))
    },
    [getValue, key, parseBooleans, parseNumbers]
  )

  // Save the value to local storage as it changes
  useEffect(() => {
    if (typeof validateValue === 'function' && validateValue(value)) {
      // stringifying because localStorage can't handle arrays
      localStorage.setItem(`${router.pathname}:${key}`, JSON.stringify(value))
    }
  }, [key, router.pathname, value, validateValue])

  return [value ?? defaultValue ?? null, update]
}

export default useQueryState
