/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './typeset-style.module.scss'

const StickyContainer = ({ children, banner, navBar, secondary, top, className }) => {
  const stickyClass = clsx(styles['sticky-container'], className, {
    [styles['sticky-container-banner']]: banner,
    [styles['sticky-container-visible']]: navBar,
    [styles['sticky-container-hidden']]: !navBar,
    [styles['sticky-container-secondary']]: secondary,
    [styles['sticky-container-secondary-visible']]: navBar && secondary,
    [styles['sticky-container-secondary-hidden']]: !navBar && secondary
  })

  return (
    <div className={stickyClass} style={{ top: top || null }}>
      {children}
    </div>
  )
}

StickyContainer.propTypes = {
  /**
   * if site has banner at top ( ex. go to v1)
   */
  banner: PropTypes.bool,

  /**
   * if page navBar is showing / hiding, toggle this on/off
   */
  navBar: PropTypes.bool,

  /**
   * for items that are on pages that already have a sticky item
   */
  secondary: PropTypes.bool,

  /**
   * if custom top is necessary, must include units - (rem, px)
   */
  top: PropTypes.string
}

export default StickyContainer
