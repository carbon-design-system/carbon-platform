/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'

interface ColorPaletteColorProps {
  index: number
  lightText: boolean | null
  hex: string | null
  name: string | null
  isNumbered?: boolean | null
  isSequential?: boolean | null
  continuous?: boolean | null
}

const ColorPaletteColor: MdxComponent<ColorPaletteColorProps> = ({
  index,
  lightText,
  hex,
  name,
  isNumbered,
  isSequential,
  continuous
}) => {
  // determine styles
  const defaultStyle = { background: `${hex}` }
  const sequentialStyle = !continuous ? defaultStyle : {}

  // determine number
  const checkDigit = index >= 9 ? `${index + 1}. ` : `0${index + 1}. `
  const number = isNumbered ? checkDigit : null

  return (
    <div
      key={index}
      className={clsx('color-palette-color', { 'text-light': lightText })}
      style={isSequential ? sequentialStyle : defaultStyle}
    >
      <span>
        {number}
        {name}
      </span>
      <span>{hex?.replace('#', '')}</span>
    </div>
  )
}

ColorPaletteColor.propTypes = {
  continuous: PropTypes.bool,
  hex: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isNumbered: PropTypes.bool,
  isSequential: PropTypes.bool,
  lightText: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
}

export { ColorPaletteColorProps }
export default ColorPaletteColor
