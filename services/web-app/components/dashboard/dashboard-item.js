/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio } from '@carbon/react'
import clsx from 'clsx'
import isEmpty from 'lodash/isEmpty'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './dashboard-item.module.scss'

export const DashboardItem = ({
  as: element = 'span',
  aspectRatio = {},
  children,
  href,
  spacer: showSpacer
}) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isXlg = useMatchMedia(mediaQueries.xlg)

  let ratio = aspectRatio.sm
  if (isMd) ratio = aspectRatio.md
  if (isLg) ratio = aspectRatio.lg
  if (isXlg) ratio = aspectRatio.xlg

  const Element = isEmpty(aspectRatio) || ratio === 'none' ? element : AspectRatio
  const props = {}

  if (ratio) {
    props.ratio = ratio

    if (element !== 'div') {
      props.as = element
    }
  }

  const renderElement = () => (
    <Element className={clsx(styles.element, showSpacer && styles['element--spacer'])} {...props}>
      {children}
    </Element>
  )

  if (href) {
    return (
      <Link href={href}>
        <a className={styles.anchor}>{renderElement()}</a>
      </Link>
    )
  }

  return renderElement()
}

DashboardItem.propTypes = {
  as: PropTypes.string,
  aspectRatio: PropTypes.object,
  children: PropTypes.node,
  href: PropTypes.string,
  spacer: PropTypes.any
}
