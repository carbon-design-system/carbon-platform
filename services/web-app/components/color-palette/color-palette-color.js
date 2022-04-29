/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './color-palette.module.scss'

const ColorPaletteColor = ({
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
  const sequentialStyle = !continuous ? defaultStyle : null

  // determine number
  const checkDigit = index >= 9 ? `${index + 1}. ` : `0${index + 1}. `
  const number = isNumbered ? checkDigit : null

  return (
    <div
      key={index}
      className={clsx(styles['color-palette-color'], { [styles['text-light']]: lightText })}
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
  hex: PropTypes.string,
  index: PropTypes.number,
  isNumbered: PropTypes.bool,
  isSequential: PropTypes.bool,
  lightText: PropTypes.bool,
  name: PropTypes.string
}

export default ColorPaletteColor
