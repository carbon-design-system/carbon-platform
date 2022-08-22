/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Theme } from '@carbon/react'
import { ArrowRight, Calendar, Download, Email, Error, Launch } from '@carbon/react/icons'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import H4 from '../markdown/h4'
import H5 from '../markdown/h5'
import styles from './resource-card.module.scss'
import groupStyles from './resource-card-group.module.scss'

/**
 * The `<ResourceCard>` component should be wrapped with `<Grid>` and `<Column>` components,
 * with a className of `resource-card-group` to allow correct border placement between cards.
 */
const ResourceCard = (props) => {
  const {
    children,
    href,
    subTitle,
    title,
    color,
    disabled,
    aspectRatio: aspectRatioProp,
    actionIcon,
    className,
    ...rest
  } = props

  const isLg = useMatchMedia(mediaQueries.lg)
  const isXlg = useMatchMedia(mediaQueries.xlg)

  const ResourceCardClassNames = clsx(
    className,
    styles['resource-card'],
    groupStyles['resource-card'],
    {
      [styles.disabled]: disabled
    }
  )

  // if aspectRatio is not specified and it's a card with title displaying at Lg breakpoint,
  // default aspectRatio to 16:9, all other cases default to 2:1
  const aspectRatio = aspectRatioProp || (!!title && isLg && !isXlg ? '16:9' : '2:1')

  const carbonTileclassNames = clsx(['cds--tile'], {
    'cds--tile--clickable': href !== undefined,
    [styles['card-with-title']]: !!title
  })

  const cardContent = (
    <>
      {subTitle && (
        <H5 headingClassName={styles.subtitle} narrow>
          {subTitle}
        </H5>
      )}
      {title && (
        <H4 headingClassName={styles.title} className={styles['h4-container']} narrow>
          {title}
        </H4>
      )}
      <div className={styles['icon-img']}>{children}</div>
      <div className={styles['icon-action']}>
        {!disabled &&
          {
            launch: <Launch size={20} aria-label="Open resource" />,
            arrowRight: <ArrowRight size={20} aria-label="Open resource" />,
            download: <Download size={20} aria-label="Download" />,
            email: <Email size={20} aria-label="Email" />,
            calendar: <Calendar size={20} aria-label="Calendar" />,
            disabled: <Error size={20} aria-label="disabled" />
          }[actionIcon]}
        {disabled === true && <Error size={20} aria-label="disabled" />}
      </div>
    </>
  )

  let cardContainer
  if (disabled === true || href === undefined) {
    cardContainer = <div className={carbonTileclassNames}>{cardContent}</div>
  } else {
    cardContainer = (
      <Link href={href}>
        <a className={carbonTileclassNames} {...rest}>
          {cardContent}
        </a>
      </Link>
    )
  }

  return (
    <Theme theme={color === 'dark' ? 'g100' : 'g10'}>
      <div className={ResourceCardClassNames}>
        <AspectRatio ratio={`${aspectRatio.replace(':', 'x')}`}>
          <div className="cds--aspect-ratio--object">{cardContainer}</div>
        </AspectRatio>
      </div>
    </Theme>
  )
}

ResourceCard.propTypes = {
  /**
   * Action icon
   */
  actionIcon: PropTypes.oneOf(['launch', 'arrowRight', 'download', 'email', 'calendar', 'error']),
  /**
   * Set card aspect ratio
   */
  aspectRatio: PropTypes.oneOf(['2:1', '1:1', '16:9', '4:3']),
  /**
   * Add an image to display in lower left
   */
  children: PropTypes.node,
  /**
   * Optional class name
   */
  className: PropTypes.string,
  /**
   * set to "dark" for dark background card
   */
  color: PropTypes.oneOf(['light', 'dark']),

  /**
   * Use for disabled card
   */
  disabled: PropTypes.bool,
  /**
   * Set url for card
   */
  href: PropTypes.string,
  /**
   * Smaller heading
   */
  subTitle: PropTypes.string,
  /**
   * Large heading
   */
  title: PropTypes.string
}

ResourceCard.defaultProps = {
  color: 'light',
  disabled: false,
  actionIcon: 'launch'
}

export default ResourceCard
