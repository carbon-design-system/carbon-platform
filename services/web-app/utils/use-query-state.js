/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { set } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'

import { IsJsonString } from './string'

const commonSerializer = (valueSerializer) => {
  return (key, value, query) => {
    query.set(key, valueSerializer(value))
  }
}

const commonParser = (valueParser) => {
  return (key, query, storageValue) => {
    const queryValue = query.get(key)

    return queryValue !== null ? valueParser(queryValue) : storageValue
  }
}

const parsePrettyObject = (name, query, storageValue) => {
  const obj = {}
  const keys = Array.from(query.keys()).filter((key) => key.startsWith(`${name}[`))
  if (!keys.length) {
    return storageValue
  }
  keys.forEach((key) => {
    const val = query.getAll(key)
    set(obj, key, val)
  })
  return obj[name]
}

const serializePrettyObject = (name, object, query) => {
  const ExistingKeys = Array.from(query.keys()).filter((key) => key.startsWith(`${name}[`))
  ExistingKeys.forEach((key) => query.delete(key))

  const getPairs = (obj, keys = []) =>
    Object.entries(obj).reduce((pairs, [key, value]) => {
      if (value.constructor.name === 'Array') {
        pairs.push([[...keys, key], value])
      } else if (typeof value === 'object') {
        pairs.push(...getPairs(value, [...keys, key]))
      } else {
        pairs.push([[...keys, key], value])
      }
      return pairs
    }, [])

  getPairs(object).forEach(([keys, value]) => {
    const key = `${name}${keys.map((nextKey) => '[' + nextKey + ']').join('')}`
    if (value.constructor.name === 'Array') {
      value.forEach((val) => {
        query.append(key, val)
      })
      return
    }
    query.set(key, value)
  })
}

export const queryTypes = {
  string: {
    parse: commonParser((v) => v),
    serialize: commonSerializer((v) => `${v}`)
  },
  integer: {
    parse: commonParser((v) => parseInt(v)),
    serialize: commonSerializer((v) => Math.round(v).toFixed())
  },
  float: {
    parse: commonParser((v) => parseFloat(v)),
    serialize: commonSerializer((v) => v.toString())
  },
  boolean: {
    parse: commonParser((v) => v === 'true'),
    serialize: commonSerializer((v) => (v ? 'true' : 'false'))
  },
  timestamp: {
    parse: commonParser((v) => new Date(parseInt(v))),
    serialize: commonSerializer((v) => v.valueOf().toString())
  },
  isoDateTime: {
    parse: commonParser((v) => new Date(v)),
    serialize: commonSerializer((v) => v.toISOString())
  },
  object: {
    parse: commonParser((v) => (IsJsonString(v) ? JSON.parse(v) : {})),
    serialize: commonSerializer((v) => JSON.stringify(v))
  },
  prettyObject: {
    parse: parsePrettyObject,
    serialize: serializePrettyObject
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
