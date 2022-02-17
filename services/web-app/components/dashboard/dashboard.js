/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './dashboard.module.scss'

export const Dashboard = ({ children, className }) => {
  const isLg = useMatchMedia(mediaQueries.lg)
  const isMd = useMatchMedia(mediaQueries.md)

  let columns = 1
  if (isMd) columns = 2
  if (isLg) columns = 3

  return (
    <Grid
      className={clsx(styles.grid, className)}
      columns={columns}
      condensed={!isMd}
      narrow={isMd}
    >
      {children}
    </Grid>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
