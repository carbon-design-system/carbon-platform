/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

const useColumnCount = ({ assetType }) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isTablet = isMd && !isLg
  const isDesktop = isLg

  let colCount = 2

  if (assetType === 'pictograms' && isDesktop) {
    colCount = 4
  }

  if (assetType === 'icons') {
    if (isTablet) {
      colCount = 4
    } else if (isDesktop) {
      colCount = 6
    }
  }

  return colCount
}

export default useColumnCount
