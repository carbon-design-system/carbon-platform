/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'

import styles from './color-block.module.scss'

/**
 * The `<ColorBlock>` component displays the color of the hex value.
 * Designed to be used within a page table for documentation.
 */
export default class ColorBlock extends React.Component {
  render() {
    const hex = this.props.children

    const colorBlockStyles = {
      backgroundColor: hex
    }

    return (
      <div className={styles.colorBlock}>
        <span className={styles.color} style={colorBlockStyles} />
      </div>
    )
  }
}
