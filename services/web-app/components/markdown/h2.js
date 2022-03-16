/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import cx from 'classnames'

import AutolinkHeader from '@/components/autolink-header'

import styles from './markdown.module.scss'

const H2 = ({ children, className, ...rest }) => {
  return (
    <Grid className={cx(className, styles.h2Container)} {...rest}>
      <Column sm={4} md={6} lg={8}>
        <AutolinkHeader is="h2" className={styles.h2}>
          {children}
        </AutolinkHeader>
      </Column>
    </Grid>
  )
}

export default H2
