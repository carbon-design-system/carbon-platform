/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './image-wrapper.module.scss'

/**
 * The `<ImageWrapper>` component allows the user to set a `type='fixed'`
 * which forces a fixed max width inside the container, and scales down
 * to smaller sizes at tablet and mobile.
 */
const ImageWrapper = ({ children, className, type }) => {
  const wrapperClassNames = clsx(className, {
    [styles.fixed]: type === 'fixed'
  })

  return <div className={wrapperClassNames}>{children}</div>
}

ImageWrapper.propTypes = {
  /** set children */
  children: PropTypes.node.isRequired,
  /** set optional custom class */
  className: PropTypes.string,
  /** set type */
  type: PropTypes.oneOf(['fixed']).isRequired
}

export default ImageWrapper
