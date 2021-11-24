/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { breakpoints } from '@carbon/layout'
import { createContext, useContext, useMemo } from 'react'
import useMedia from 'use-media'

export const MediaQueryContext = createContext(null)

const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm.width})`,
  md: `(min-width: ${breakpoints.md.width})`,
  lg: `(min-width: ${breakpoints.lg.width})`,
  xlg: `(min-width: ${breakpoints.xlg.width})`,
  max: `(min-width: ${breakpoints.max.width})`
}

const MediaQueryProvider = ({ children }) => {
  const isSm = useMedia(mediaQueries.sm)
  const isMd = useMedia(mediaQueries.md)
  const isLg = useMedia(mediaQueries.lg)
  const isXlg = useMedia(mediaQueries.xlg)
  const isMax = useMedia(mediaQueries.max)

  const value = useMemo(
    () => ({ isSm, isMd, isLg, isXlg, isMax }),
    [isSm, isMd, isLg, isXlg, isMax]
  )

  return <MediaQueryContext.Provider value={value}>{children}</MediaQueryContext.Provider>
}

export default MediaQueryProvider

export const useMediaQueryContext = () => {
  return useContext(MediaQueryContext)
}
