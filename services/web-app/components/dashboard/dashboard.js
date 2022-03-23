/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './dashboard.module.scss'

export const Dashboard = ({ children, className }) => {
  return (
    <Grid className={clsx(styles.grid, className)} condensed>
      {children}
    </Grid>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
