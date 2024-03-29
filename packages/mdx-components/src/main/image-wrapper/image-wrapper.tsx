/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

type ImageType = 'fixed'

interface ImageWrapperProps {
  children: ReactNode
  className?: string | null
  type: ImageType
}

/**
 * The `<ImageWrapper>` component allows the user to set a `type='fixed'`
 * which forces a fixed max width inside the container, and scales down
 * to smaller sizes at tablet and mobile.
 */
const ImageWrapper: MdxComponent<ImageWrapperProps> = ({ children, className, type }) => {
  const wrapperClassNames = clsx(className, {
    [withPrefix('fixed')]: type === 'fixed'
  })

  return <div className={wrapperClassNames}>{children}</div>
}

ImageWrapper.propTypes = {
  /** set children */
  children: PropTypes.node.isRequired,
  /** set optional custom class */
  className: PropTypes.string,
  /** set type */
  type: PropTypes.oneOf<ImageType>(['fixed']).isRequired
}

export { ImageWrapperProps }
export default ImageWrapper
