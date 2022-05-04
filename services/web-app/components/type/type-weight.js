/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './type-weight.module.scss'

/**
 * The `<TypeWeight>` component is used to display the various type styles.
 */
export default function TypeWeight({ type }) {
  if (type === 'types') {
    return (
      <Grid condensed>
        <Column sm={4} md={8} lg={8} className={styles['type-weight']}>
          <p>IBM Plex Sans</p>
          <p className={styles.serif}>IBM Plex Serif</p>
          <p className={styles.mono}>IBM Plex Mono</p>
        </Column>
      </Grid>
    )
  }
  if (type === 'italic') {
    return (
      <Grid condensed>
        <Column sm={4} md={8} lg={8} className={styles['type-weight']}>
          <p className={clsx(styles.semibold, styles.italic)}>Semibold Italic (600)</p>
          <p className={clsx(styles.regular, styles.italic)}>Regular (400)</p>
          <p className={clsx(styles.light, styles.italic)}>Light (300)</p>
        </Column>
      </Grid>
    )
  }
  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={8} className={styles['type-weight']}>
        <p className={styles.semibold}>Semibold (600)</p>
        <p className={styles.regular}>Regular (400)</p>
        <p className={styles.light}>Light (300)</p>
      </Column>
    </Grid>
  )
}
TypeWeight.defaultProps = {
  type: 'weight'
}
TypeWeight.propTypes = {
  /**
   * TypeWeight table options
   */
  type: PropTypes.oneOf(['types', 'italic', 'weight'])
}
