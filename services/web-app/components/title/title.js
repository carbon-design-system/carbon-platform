/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import markdownStyles from '@/components/markdown/markdown.module.scss'

import styles from './title.module.scss'

const Title = ({ className, ...rest }) => (
  <Grid className={clsx(className, styles.title)}>
    <Column sm={4} md={6} lg={8}>
      <span {...rest} className={markdownStyles.h4} />
    </Column>
  </Grid>
)

export default Title
