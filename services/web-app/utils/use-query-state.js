/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useCallback, useEffect, useMemo } from 'react'

export const useQueryState = (
  key,
  { defaultValue = '', saveToStorage = false, parseNumbers = false, parseBooleans = false },
  validateValue = () => true
) => {
  const router = useRouter()

  // When not in a SSR context, get the query value directly from URLSearchParams so there's no
  // reliance on router.query which may not be populated yet.
  const getValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return null
    }

    const query = queryString.parseUrl(window.location.search, {
      arrayFormat: 'bracket',
      parseNumbers,
      parseBooleans
    }).query
    const storageValue = saveToStorage ? localStorage.getItem(`${router.pathname}:${key}`) : null

    let val = query[key]

    if (val === null || (validateValue && !validateValue(val))) {
      val = storageValue
    }

    return val
  }, [key, parseBooleans, parseNumbers, router.pathname, saveToStorage, validateValue])

  // Update the "state" when the router.query key changes
  const value = useMemo(getValue, [getValue, router.query[key], router.query[`${key}[]`]])

  // Replace the route to then update the "state"
  const update = useCallback(
    async (stateUpdater) => {
      const oldValue = getValue()
      const newValue = typeof stateUpdater === 'function' ? stateUpdater(oldValue) : stateUpdater

      // Don't rely on router.query here because that would cause unnecessary renders when other
      // query parameters change
      const query = queryString.parseUrl(window.location.search, {
        arrayFormat: 'bracket',
        parseNumbers,
        parseBooleans
      }).query

      query[key] = newValue

      await router.replace(
        `?${queryString.stringify(query, { arrayFormat: 'bracket' })}`,
        undefined,
        { shallow: true, scroll: false }
      )
    },
    // The Next.js router updates `router.replace`, which should not trigger re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getValue, key]
  )

  // Save the value to local storage as it changes
  useEffect(() => {
    if (saveToStorage && value) {
      localStorage.setItem(`${router.pathname}:${key}`, value)
    }
  }, [key, router.pathname, saveToStorage, value])

  return [value ?? defaultValue ?? null, update]
}
