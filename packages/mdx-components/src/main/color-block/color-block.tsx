/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Proptypes from 'prop-types'
import React from 'react'

import { withPrefix } from '../utils.js'

interface ColorBlockProps {
  children: string
}

/**
 * The `<ColorBlock>` component displays the color of the hex value.
 * Designed to be used within a page table for documentation.
 */
const ColorBlock: React.FC<ColorBlockProps> = ({ children }) => {
  const colorBlockStyles = {
    backgroundColor: children
  }

  return (
    <div className={withPrefix('color-block')}>
      <span
        className={withPrefix('color')}
        style={colorBlockStyles}
        title={'Colored block with hex value ' + children}
      />
    </div>
  )
}

ColorBlock.propTypes = {
  /** Provide the hex value for the ColorBlock */
  children: Proptypes.string.isRequired
}

export default ColorBlock
