/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './color-palette.module.scss'

const PalettesContainer = ({ children, color, continuous, dark, index, twoColumn = false }) => {
  const paletteContainerClassNames = clsx(styles['palettes-container'], {
    [styles.sequential]: color,
    [styles['dark-mode']]: dark,
    [styles['gradient-blue']]: color === 'blue' && continuous,
    [styles['gradient-purple']]: color === 'purple' && continuous,
    [styles['gradient-red']]: color === 'red' && continuous,
    [styles['gradient-teal']]: color === 'teal' && continuous,
    [styles['gradient-cyan']]: color === 'cyan' && continuous,
    [styles['gradient-teal-only']]: color === 'teal-only' && continuous,
    [styles['alert-container']]: twoColumn
  })

  return (
    <div className={paletteContainerClassNames} key={index}>
      {children}
    </div>
  )
}

PalettesContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  color: PropTypes.string,
  continuous: PropTypes.bool,
  dark: PropTypes.bool,
  index: PropTypes.number,
  twoColumn: PropTypes.bool
}

export default PalettesContainer
