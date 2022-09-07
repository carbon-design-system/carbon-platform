/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Proptypes from 'prop-types'
import React from 'react'

import { withPrefix } from '../utils.js'

/**
 * The `<ColorBlock>` component displays the color of the hex value.
 * Designed to be used within a page table for documentation.
 */
const ColorBlock = (props: any) => {
  const { children } = props

  const hex = children

  const colorBlockStyles = {
    backgroundColor: hex
  }

  return (
    <div className={withPrefix('color-block')}>
      <span
        className={withPrefix('color')}
        style={colorBlockStyles}
        title={'Colored block with hex value ' + hex}
      />
    </div>
  )
}

ColorBlock.propTypes = {
  /** Provide the hex value for the ColorBlock */
  children: Proptypes.node
}

export default ColorBlock
