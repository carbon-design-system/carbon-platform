/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export const queryTypes = {
  string: {
    parse: (v) => v,
    serialize: (v) => `${v}`
  },
  integer: {
    parse: (v) => parseInt(v),
    serialize: (v) => Math.round(v).toFixed()
  },
  float: {
    parse: (v) => parseFloat(v),
    serialize: (v) => v.toString()
  },
  boolean: {
    parse: (v) => v === 'true',
    serialize: (v) => (v ? 'true' : 'false')
  },
  timestamp: {
    parse: (v) => new Date(parseInt(v)),
    serialize: (v) => v.valueOf().toString()
  },
  isoDateTime: {
    parse: (v) => new Date(v),
    serialize: (v) => v.toISOString()
  },
  object: {
    parse: (v) => JSON.parse(v),
    serialize: (v) => JSON.stringify(v)
  }
}

export const useQueryState = (
  key,
  {
    defaultValue = '',
    parse = queryTypes.string.parse,
    serialize = queryTypes.string.serialize,
    saveToStorage = false
  }
) => {
  const router = useRouter()

  // When not in a SSR context, get the query value directly from URLSearchParams so there's no
  // reliance on router.query which may not be populated yet.
  const getValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return null
    }

    const query = new URLSearchParams(window.location.search)
    const queryValue = query.get(key)
    const storageValue = saveToStorage ? localStorage.getItem(`${router.pathname}:${key}`) : null

    return queryValue !== null ? parse(queryValue) : storageValue
  }, [key, parse, router.pathname, saveToStorage])

  const [value, setValue] = useState(getValue())

  // Replace the route to then update the "state"
  const update = useCallback(
    (stateUpdater) => {
      const oldValue = getValue()
      const newValue = typeof stateUpdater === 'function' ? stateUpdater(oldValue) : stateUpdater

      // Don't rely on router.query here because that would cause unnecessary renders when other
      // query parameters change
      const query = new URLSearchParams(window.location.search)

      if (newValue === null || newValue === undefined) {
        query.delete(key)
      } else {
        query.set(key, serialize(newValue))
      }

      // change query state without rerendering page
      history.replaceState(null, null, `?${query.toString()}`)

      setValue(getValue())
    },
    // The Next.js router updates `router.replace`, which should not trigger re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getValue, key, serialize]
  )

  // Save the value to local storage as it changes
  useEffect(() => {
    if (saveToStorage && value) {
      localStorage.setItem(`${router.pathname}:${key}`, value)
    }
  }, [key, router.pathname, saveToStorage, value])

  return [value ?? defaultValue ?? null, update]
}
