/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { black100, colors, green60, orange40, red60, white0, yellow20 } from '@carbon/colors'
import PropTypes from 'prop-types'

import styles from './color-grid.module.scss'

function ColorSwatch({ hex, ...rest }) {
  return <div {...rest} className={styles.swatch} style={{ backgroundColor: hex }} />
}
ColorSwatch.propTypes = {
  /**
   * hex value of the color swatch
   */
  hex: PropTypes.string
}

export default function ColorGrid({ colorFamily, ...rest }) {
  if (colorFamily === 'alerts') {
    return (
      <div {...rest} className={styles.colorGrid}>
        <ColorSwatch hex={red60} />
        <ColorSwatch hex={orange40} />
        <ColorSwatch hex={yellow20} />
        <ColorSwatch hex={green60} />
      </div>
    )
  }
  return (
    <div {...rest} className={styles.colorGrid}>
      <ColorSwatch hex={black100} />
      {Object.values(colors[colorFamily])
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
  colorFamily: PropTypes.oneOf([
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
  ])
}
