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

import styles from './resource-card.module.scss'
import groupStyles from './resource-card-group.module.scss'

const ResourceCard = (props) => {
  const {
    children,
    href,
    subTitle,
    title,
    color,
    disabled,
    aspectRatio,
    actionIcon,
    className,
    ...rest
  } = props

  const ResourceCardClassNames = clsx(
    className,
    styles['resource-card'],
    groupStyles['resource-card'],
    {
      [styles.disabled]: disabled
    }
  )

  const carbonTileclassNames = clsx(['cds--tile'], {
    'cds--tile--clickable': href !== undefined
  })

  const cardContent = (
    <>
      {subTitle && <h5 className={styles.subtitle}>{subTitle}</h5>}
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles['icon-img']}>{children}</div>
      <div className={styles['icon-action']}>
        {actionIcon === 'launch' && !disabled && <Launch size={20} aria-label="Open resource" />}
        {actionIcon === 'arrowRight' && !disabled && (
          <ArrowRight size={20} aria-label="Open resource" />
        )}
        {actionIcon === 'download' && !disabled && <Download size={20} aria-label="Download" />}
        {actionIcon === 'email' && !disabled && <Email size={20} aria-label="Email" />}
        {actionIcon === 'calendar' && !disabled && <Calendar size={20} aria-label="Calendar" />}
        {actionIcon === 'disabled' ||
          (disabled === true && <Error size={20} aria-label="disabled" />)}
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
    <Theme theme={color === 'dark' && 'g100'}>
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
   * Action icon, default is launch, options are Launch, ArrowRight, Download, Error
   */
  actionIcon: PropTypes.string,
  /**
   * Set card aspect ratio, default is 2:1, options are 1:1, 16:9, 4:3
   */
  aspectRatio: PropTypes.string,
  children: PropTypes.node,
  /**
   * Specify a custom class
   */
  className: PropTypes.string,
  /**
   * set to "dark" for dark background card
   */
  color: PropTypes.string,

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
  aspectRatio: '2:1',
  actionIcon: 'launch'
}

export default ResourceCard
