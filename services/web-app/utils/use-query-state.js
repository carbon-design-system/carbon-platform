/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useCallback, useEffect, useMemo } from 'react'

import { isJsonString } from './string'

const commonSerializer = () => {
  return (key, value, query) => {
    const stringifiedVal = queryString.stringify({ [key]: value }, { arrayFormat: 'bracket' })
    const [queryKey, val] = stringifiedVal.split('=')
    query.set(queryKey, val)
  }
}

const commonParser = (valueParser) => {
  return (key, query, storageValue) => {
    const queryValue = query.get(key)
    console.log(
      queryString.parse(query.toString(), { arrayFormat: 'bracket' })[key],
      valueParser(undefined)
    )
    // why is this causing an inifinite loop ?
    // const queryValue = queryString.parse(query.toString(), { arrayFormat: 'bracket' })[key]

    return queryValue !== null ? valueParser(queryValue) : storageValue
  }
}

export const queryTypes = {
  string: {
    parse: commonParser((v) => v),
    serialize: commonSerializer()
  },
  integer: {
    parse: commonParser((v) => parseInt(v)),
    serialize: commonSerializer()
  },
  float: {
    parse: commonParser((v) => parseFloat(v)),
    serialize: commonSerializer()
  },
  boolean: {
    parse: commonParser((v) => v === 'true'),
    serialize: commonSerializer()
  },
  timestamp: {
    parse: commonParser((v) => new Date(parseInt(v))),
    serialize: commonSerializer()
  },
  isoDateTime: {
    parse: commonParser((v) => new Date(v)),
    serialize: commonSerializer()
  },
  object: {
    parse: commonParser((v) => (isJsonString(v) ? JSON.parse(v) : {})),
    serialize: commonSerializer()
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
    const storageValue = saveToStorage ? localStorage.getItem(`${router.pathname}:${key}`) : null
    return parse(key, query, storageValue)
  }, [key, parse, router.pathname, saveToStorage])

  // Update the "state" when the router.query key changes
  const value = useMemo(getValue, [getValue, router.query[key]])

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
        serialize(key, newValue, query)
      }

      router.replace(`?${query.toString()}`, undefined, { shallow: true, scroll: false })
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
