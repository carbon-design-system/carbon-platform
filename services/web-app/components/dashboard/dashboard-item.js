/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio } from '@carbon/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './dashboard-item.module.scss'

export const DashboardItem = ({
  aspectRatio = {},
  border = [],
  children,
  spacer: showSpacer,
  clickable
}) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isXlg = useMatchMedia(mediaQueries.xlg)

  let ratio = aspectRatio.sm
  if (isMd) ratio = aspectRatio.md
  if (isLg) ratio = aspectRatio.lg
  if (isXlg) ratio = aspectRatio.xlg

  let showBorder = !isMd ? border.includes('sm') : border.includes('md')
  if (isLg) showBorder = border.includes('lg')
  if (isXlg) showBorder = border.includes('xlg')

  const Element = isEmpty(aspectRatio) || ratio === 'none' ? 'div' : AspectRatio
  const props = {}

  if (ratio) {
    props.ratio = ratio
  }

  return (
    <Element
      className={clsx(
        styles.container,
        showBorder && styles.containerBorder,
        showSpacer && styles.containerSpacer,
        clickable && styles.clickable
      )}
      {...props}
    >
      {children}
    </Element>
  )
}
