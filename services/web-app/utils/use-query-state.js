/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useCallback, useEffect, useState } from 'react'

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
 * 2- subscribing components can mamipulate the query value by calling the `update`
 * function with a desired value
 * 3 - The `validateValue` function receives the current query string value
 * and should return true if the value is valid or false otherwise. If the value is invalid,
 * the hook will return a value of `undefined`
 * 3- Supplying options `parseNumbers` or `parseBoolean` = `true` will cause the type of value
 * to be casted to desired type if possible, otherwise type will be string
 * 4 - Supplying option `saveToStorage` = `true` will cause the value
 * to be stored within browser's localStorage. This value will be used instead of
 * the query string value if it happens to be invalid or undefined
 * 5 - Calling the update function with a `null`, or `undefined` value
 * will cause the localStorage entry to be removed (if any)
 * @param {string} key Key to use in the query string
 * @param {{defaultValue: string, saveToStorage: boolean,
 * parseNumbers: boolean, parseBooleans: boolean}} options Extra config options
 *
 * @returns {{value, update}} Current value and update function
 */
const useQueryState = (
  key,
  { defaultValue = '', saveToStorage = false, parseNumbers = false, parseBooleans = false },
  validateValue = () => true
) => {
  const router = useRouter()

  const getValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return null
    }

    const query = queryString.parseUrl(window.location.search, {
      ...queryStringConfig,
      parseNumbers,
      parseBooleans
    }).query

    const storageValue = saveToStorage
      ? localStorage.getItem(`${router.pathname}:${key}`)
      : undefined

    let val = query[key]

    if (val !== undefined && typeof validateValue === 'function' && !validateValue(val)) {
      val = undefined
    }

    if (val === undefined) {
      val = storageValue
    }

    return val
  }, [key, parseBooleans, parseNumbers, router.pathname, saveToStorage, validateValue])

  const [value, setValue] = useState(getValue())

  // Replace the route to then update the "state"
  const update = useCallback(
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

      if ((newValue === null || newValue === undefined) && saveToStorage) {
        const localStorageKey = `${router.pathname}:${key}`

        // user has removed selection, remove localStorage item
        if (localStorage.getItem(localStorageKey)) {
          localStorage.removeItem(localStorageKey)
        }
      }

      // Change query state without rerendering page
      history.pushState(null, null, `?${queryString.stringify(query, queryStringConfig)}`)

      setValue(getValue())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getValue, key]
  )

  // Save the value to local storage as it changes
  useEffect(() => {
    if (saveToStorage && value !== null && value !== undefined) {
      localStorage.setItem(`${router.pathname}:${key}`, value)
    }
  }, [key, router.pathname, saveToStorage, value])

  return [value ?? defaultValue ?? null, update]
}

export default useQueryState
