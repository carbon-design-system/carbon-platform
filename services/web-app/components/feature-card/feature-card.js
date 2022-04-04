/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import PropTypes from 'prop-types'

import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './feature-card.module.scss'

export const FeatureCard = ({
  as: element = 'span',
  aspectRatio = {},
  href,
  children,
  description,
  title
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
    <Element className={styles.tile} {...props}>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.description}>{description}</p>
      <ArrowRight
        className={clsx(dashboardStyles.positionBottomRight, styles.arrowRight)}
        size={20}
      />
    </Element>
  )

  if (href) {
    return (
      <Link href={href}>
        <a className={styles.anchor}>
          {renderElement()}
          {children}
        </a>
      </Link>
    )
  }

  return renderElement()
}

FeatureCard.propTypes = {
  as: PropTypes.string,
  aspectRatio: PropTypes.object,
  children: PropTypes.node,
  description: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string
}
