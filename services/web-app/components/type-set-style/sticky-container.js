/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './typeset-style.module.scss'

const StickyContainer = ({ children, banner, navBar, secondary, top, className }) => {
  const stickyClass = classnames(styles['cds--sticky-container'], className, {
    [styles['cds--sticky-container-banner']]: banner,
    [styles['cds--sticky-container-visible']]: navBar,
    [styles['cds--sticky-container-hidden']]: !navBar,
    [styles['cds--sticky-container-secondary']]: secondary,
    [styles['cds--sticky-container-secondary-visible']]: navBar && secondary,
    [styles['cds--sticky-container-secondary-hidden']]: !navBar && secondary
  })

  return (
    <div className={stickyClass} style={{ top: top || null }}>
      {children}
    </div>
  )
}

StickyContainer.propTypes = {
  // if site has banner at top ( ex. go to v1)
  banner: PropTypes.bool,

  // if page navBar is showing / hiding, toggle this on/off
  navBar: PropTypes.bool,

  // for items that are on pages that already have a sticky item
  secondary: PropTypes.bool,

  // if custom top is necessary, must include units - (rem, px)
  top: PropTypes.string
}

export default StickyContainer
