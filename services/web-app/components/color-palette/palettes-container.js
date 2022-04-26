/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import {
  alertContainer,
  darkMode,
  gradientBlue,
  gradientCyan,
  gradientPurple,
  gradientRed,
  gradientTeal,
  gradientTealOnly,
  palettesContainer,
  sequential
} from './color-palette.module.scss'

const PalettesContainer = ({ children, color, continuous, dark, index, twoColumn = false }) => {
  const paletteContainerClassNames = clsx(palettesContainer, {
    [sequential]: color,
    [darkMode]: dark,
    [gradientBlue]: color === 'blue' && continuous,
    [gradientPurple]: color === 'purple' && continuous,
    [gradientRed]: color === 'red' && continuous,
    [gradientTeal]: color === 'teal' && continuous,
    [gradientCyan]: color === 'cyan' && continuous,
    [gradientTealOnly]: color === 'teal-only' && continuous,
    [alertContainer]: twoColumn
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
