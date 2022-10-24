/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { black100, colors, green60, orange40, red60, white0, yellow20 } from '@carbon/colors'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface ColorSwatchProps {
  hex: string
  [otherProp: string]: unknown
}

const ColorSwatch: MdxComponent<ColorSwatchProps> = ({ hex, ...rest }) => {
  const divStyle = hex ? { backgroundColor: hex } : {}
  return <div {...rest} className={'swatch'} style={divStyle} />
}

ColorSwatch.propTypes = {
  /**
   * hex value of the color swatch
   */
  hex: PropTypes.string.isRequired
}

/**
 * The `<ColorGrid>` component is used to display color swatches showing
 * all color steps or alert colors.
 */

type ColorFamily =
  | 'alerts'
  | 'red'
  | 'magenta'
  | 'purple'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'coolGray'
  | 'gray'
  | 'warmGray'
interface ColorGridProps {
  colorFamily: ColorFamily
  [otherProp: string]: unknown
}

const ColorGrid: MdxComponent<ColorGridProps> = ({ colorFamily, ...rest }) => {
  if (colorFamily === 'alerts') {
    return (
      <div {...rest} className={withPrefix('color-grid')}>
        <ColorSwatch hex={red60} />
        <ColorSwatch hex={orange40} />
        <ColorSwatch hex={yellow20} />
        <ColorSwatch hex={green60} />
      </div>
    )
  }
  return (
    <div {...rest} className={withPrefix('color-grid')}>
      <ColorSwatch hex={black100} />
      {Object.values(colors[colorFamily] as { [key: number]: string })
        .reverse()
        .map((hex, i) => (
          <ColorSwatch key={i} hex={hex} />
        ))}
      <ColorSwatch hex={white0} />
    </div>
  )
}

ColorGrid.propTypes = {
  /**
   * Carbon color family name or "alerts"
   */
  colorFamily: PropTypes.oneOf<ColorFamily>([
    'alerts',
    'red',
    'magenta',
    'purple',
    'blue',
    'cyan',
    'teal',
    'green',
    'coolGray',
    'gray',
    'warmGray'
  ]).isRequired
}

export { ColorGridProps }
export default ColorGrid
