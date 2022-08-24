/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import AutolinkHeader from '@/components/autolink-header'

import styles from './markdown.module.scss'

const H3 = ({ children, className, headingClassName, ...rest }) => {
  return (
    <Grid className={clsx(styles['h3-container'], className)} {...rest}>
      <Column sm={4} md={6} lg={8}>
        <AutolinkHeader is="h3" className={clsx(styles.h3, headingClassName)}>
          {children}
        </AutolinkHeader>
      </Column>
    </Grid>
  )
}

export default H3
