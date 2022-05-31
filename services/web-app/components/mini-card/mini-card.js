/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column } from '@carbon/react'
import { ArrowRight, Calendar, Download, Email, Launch } from '@carbon/react/icons'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'

import * as styles from './mini-card.module.scss'

const getIcon = ({ actionIcon }) => {
  switch (actionIcon) {
    case 'arrowRight':
      return <ArrowRight size={20} aria-label="Open resource" />
    case 'download':
      return <Download size={20} aria-label="Download" />
    case 'email':
      return <Email size={20} aria-label="Email" />
    case 'calendar':
      return <Calendar size={20} aria-label="Calendar" />
    default:
      return <Launch size={20} aria-label="Open resource" />
  }
}

const MiniCard = ({ children, href, title, actionIcon, className, linkProps, ...rest }) => {
  const cardContent = (
    <div className={clsx(className, styles.card)}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        {children === undefined && <div className={styles.icon}>{getIcon({ actionIcon })}</div>}
        {children !== undefined && <div className={styles.image}>{children}</div>}
      </div>
    </div>
  )

  let isLink
  if (href !== undefined) {
    isLink = href.charAt(0) === '/'
  }

  return (
    <Column md={4} lg={4} sm={4} {...rest}>
      {isLink && (
        <Link href={href} passHref>
          <CarbonLink to={href} className={'cds--tile--clickable'} {...linkProps}>
            {cardContent}
          </CarbonLink>
        </Link>
      )}
      {!isLink && (
        <a href={href} className={'cds--tile--clickable'} {...linkProps}>
          {cardContent}
        </a>
      )}
    </Column>
  )
}

MiniCard.propTypes = {
  /**
   * Action icon to render.
   */
  actionIcon: PropTypes.oneOf(['arrowRight', 'download', 'email', 'calendar', 'launch']),
  /**
   * Provide the contents of your `Card`.
   */
  children: PropTypes.node,
  /**
   * Optional container class name.
   */
  className: PropTypes.string,
  /**
   * url to link to on click
   */
  href: PropTypes.string,
  /**
   * Props to pass onto Link component.
   */
  linkProps: PropTypes.object,
  /**
   * Provide the title of your `Card`.
   */
  title: PropTypes.string.isRequired
}
export default MiniCard
