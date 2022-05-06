/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'
import { Children } from 'react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

/**
 * On the web, art direction refers to changing the image rendered at different
 * display sizes. The `ArtDirection `component allows you to provide multiple images
 * achieve this goal.
 *
 * You can place up to three images inside of the ArtDirection component. The first
 * will be used for mobile, the second for tablet, and the third for desktop. If only
 * two images are provided, the second image will be used for both tablet and desktop.
 */
const ArtDirection = ({ children }) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)

  const childrenArray = Children.toArray(children)

  if ((!isMd && !isLg) || !childrenArray[1]) {
    return <div>{childrenArray[0]}</div>
  }

  if ((isMd && !isLg) || !childrenArray[2]) {
    return <div>{childrenArray[1]}</div>
  }

  return <div>{childrenArray[2]}</div>
}

ArtDirection.propTypes = {
  /**
   * You can place up to three images inside of the ArtDirection component. The first
   * will be used for mobile, the second for tablet, and the third for desktop. If only
   * two images are provided, the second image will be used for both tablet and desktop.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default ArtDirection
