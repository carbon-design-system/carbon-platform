/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { breakpoints } from '@carbon/layout'
import { useEffect, useState } from 'react'

export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm.width})`,
  md: `(min-width: ${breakpoints.md.width})`,
  lg: `(min-width: ${breakpoints.lg.width})`,
  xlg: `(min-width: ${breakpoints.xlg.width})`,
  max: `(min-width: ${breakpoints.max.width})`
}

function getMatchMedia(query) {
  return typeof window !== 'undefined' ? window.matchMedia(query) : null
}

export const useMatchMedia = (query) => {
  const [matches, setMatches] = useState(getMatchMedia(query)?.matches)

  useEffect(() => {
    const matchMediaResult = getMatchMedia(query)
    const updateMatch = (e) => {
      setMatches(e.matches)
    }

    matchMediaResult?.addEventListener('change', updateMatch)

    return () => {
      matchMediaResult?.removeEventListener('change', updateMatch)
    }
  }, [query])

  return matches
}
