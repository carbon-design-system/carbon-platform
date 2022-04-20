/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { Children } from 'react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './grid.module.scss'

const Row = ({ children, className }) => {
  const isSm = useMatchMedia(mediaQueries.sm)
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isXlg = useMatchMedia(mediaQueries.xlg)
  const isMax = useMatchMedia(mediaQueries.max)

  const arrayChildren = Children.toArray(children)

  let narrow = false
  let condensed = false
  Children.map(arrayChildren, (child) => {
    for (const prop in child.props) {
      if (prop === 'noGutterSm') {
        condensed = isSm
      }
      if (prop === 'noGutterMd') {
        condensed = isMd
      }
      if (prop === 'noGutterLg') {
        condensed = isLg
      }
      if (prop === 'noGutterXl') {
        condensed = isXlg
      }
      if (prop === 'noGutterMax') {
        condensed = isMax
      }
      if (prop === 'noGutterSmLeft') {
        narrow = isSm
      }
      if (prop === 'noGutterMdLeft') {
        narrow = isMd
      }
      if (prop === 'noGutterLgLeft') {
        narrow = isLg
      }
      if (prop === 'noGutterXlLeft') {
        narrow = isXlg
      }
      if (prop === 'noGutterMaxLeft') {
        narrow = isMax
      }
      if (prop === 'gutterLg') {
        narrow = !isLg
        condensed = !isLg
      }
    }
  })

  return (
    <Grid narrow={narrow} condensed={condensed} className={clsx(styles.grid, className)}>
      {children}
    </Grid>
  )
}

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Row
