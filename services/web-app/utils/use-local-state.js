/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useCallback, useState } from 'react'

import { isJsonString } from './string'

/**
 * Write and read to/from local storage
 *
 * This hook allows to manage the state of a key/value in the local storage,
 *  with the following considerations:
 * 1 - subscribing components can manipulate the value by calling the `update`
 * function with a desired value
 * 2 - All state key/values will be saved to localStorage
 * 3 - The `validateValue` function receives the current query string value
 * and should return true if the value is valid or false otherwise. If the value is invalid,
 * the hook will return the defaultValue ('' if not set)
 * 4 - Supplying options `parseNumbers` or `parseBoolean` = `true` will cause the type of value
 * to be cast to desired type if possible, otherwise type will be string
 * @param {string} key Key to use in the query string
 * @param {{defaultValue: string, parseNumbers: boolean,
 * parseBooleans: boolean}} options Extra config options
 *
 * @returns {{value, update}} Current value and update function
 */
const useLocalState = (
  key,
  { defaultValue = '', parseNumbers = false, parseBooleans = false },
  validateValue = () => true
) => {
  const router = useRouter()

  const getValue = useCallback(() => {
    if (typeof window === 'undefined') {
      // localStorage is not available at this point
      return null
    }
    let val
    const storageValue = localStorage.getItem(`${router.pathname}:${key}`)
    const parsedValue = isJsonString(storageValue) ? JSON.parse(storageValue) : storageValue
    if (parsedValue !== undefined) {
      const queryStringFromStorage = queryString.stringify({ key: parsedValue })

      val = queryString.parseUrl(`?${queryStringFromStorage}`, {
        parseNumbers,
        parseBooleans
      }).query.key
    }

    if (typeof validateValue === 'function' && !validateValue(val)) {
      // invalid val, returning null
      return null
    }
    return val
  }, [key, parseBooleans, parseNumbers, router.pathname, validateValue])

  const [value, setValue] = useState(getValue())

  // Replace the route to then update the "state"
  const update = useCallback(
    (stateUpdater) => {
      const oldValue = getValue()
      const newValue = typeof stateUpdater === 'function' ? stateUpdater(oldValue) : stateUpdater

      if (typeof validateValue === 'function' && !validateValue(newValue)) {
        // invalid val, aborting update
        return
      }

      localStorage.setItem(`${router.pathname}:${key}`, JSON.stringify(newValue))
      setValue(newValue)
    },
    [getValue, key, router.pathname, validateValue]
  )

  return [value ?? defaultValue ?? null, update]
}

export default useLocalState
