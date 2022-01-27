/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AspectRatio, Grid } from '@carbon/react'
import clsx from 'clsx'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './dashboard.module.scss'

const Dashboard = () => {
  const isXlg = useMatchMedia(mediaQueries.xlg)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isMd = useMatchMedia(mediaQueries.md)

  let columns = 1
  if (isMd) columns = 2
  if (isLg) columns = 3

  const aspectRatioTop = () => {
    if (isMd) return '1x1'
    if (isMd) return '3x4'
    if (isXlg) return '1x1'
    return '2x1'
  }

  const aspectRatioBottom = () => {
    if (isMd) return '2x1'
    if (isMd) return '16x9'
    if (isXlg) return '2x1'
    return '1x1'
  }

  return (
    <Grid className={styles.container} condensed columns={columns}>
      <AspectRatio className={styles.column} ratio={aspectRatioTop()}>
        {'ONE'}
      </AspectRatio>
      <AspectRatio
        className={clsx(styles.columnTwo, styles.column)}
        ratio={isMd ? aspectRatioTop() : aspectRatioBottom()}
      >
        <div className={clsx(styles.columnTwoContainer)}>
          <div>{'TWO'}</div>
          <div>{'THREE'}</div>
        </div>
      </AspectRatio>
      <AspectRatio className={clsx(styles.bottomRow, styles.column)} ratio={aspectRatioBottom()}>
        {'FOUR'}
      </AspectRatio>
      <AspectRatio className={clsx(styles.bottomRow, styles.column)} ratio={aspectRatioBottom()}>
        {'FIVE'}
      </AspectRatio>
      <AspectRatio className={clsx(styles.bottomRow, styles.column)} ratio={aspectRatioBottom()}>
        {'SIX'}
      </AspectRatio>
    </Grid>
  )
}

export default Dashboard
