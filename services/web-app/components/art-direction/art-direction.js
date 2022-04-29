/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'
import { Children } from 'react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

const ArtDirection = ({ children }) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)

  const childrenArray = Children.toArray(children)

  if ((!isMd && !isLg) || !childrenArray[1]) {
    return childrenArray[0]
  }

  if ((isMd && !isLg) || !childrenArray[2]) {
    return childrenArray[1]
  }

  return childrenArray[2]
}

ArtDirection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default ArtDirection
