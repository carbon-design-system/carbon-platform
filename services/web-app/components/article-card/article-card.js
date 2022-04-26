/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Theme } from '@carbon/react'
import { ArrowRight, Download, Email, Error, Launch } from '@carbon/react/icons'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './article-card.module.scss'

export default class ArticleCard extends React.Component {
  render() {
    const {
      children,
      href,
      title,
      subTitle,
      author,
      date,
      readTime,
      color,
      disabled,
      actionIcon,
      className,
      ...rest
    } = this.props

    let isLink
    if (href !== undefined) {
      isLink = href.charAt(0) === '/'
    }

    const ArticleCardClassNames = clsx(className, styles['article-card'], {
      [styles.disabled]: disabled
    })

    const aspectRatioClassNames = clsx('cds--aspect-ratio', 'cds--aspect-ratio--2x1')

    const cardContentClassNames = clsx('cds--tile', 'cds--tile--clickable')

    const cardContent = (
      <>
        <div className={styles.img}>{children}</div>
        <div className={aspectRatioClassNames}>
          <div className={clsx('cds--aspect-ratio--object', styles.tile)}>
            {subTitle && <h5 className={styles.subtitle}>{subTitle}</h5>}
            {title && <h4 className={styles.title}>{title}</h4>}
            <div className={styles.info}>
              {author && <p>{author}</p>}
              {date && <p>{date}</p>}
              {readTime && <p>{readTime}</p>}
            </div>
            <div className={styles['icon-action']}>
              {actionIcon === 'launch' && !disabled && <Launch size={20} aria-label="Open" />}
              {actionIcon === 'arrowRight' && !disabled && (
                <ArrowRight size={20} aria-label="Open" />
              )}
              {actionIcon === 'download' && !disabled && (
                <Download size={20} aria-label="Download" />
              )}
              {actionIcon === 'email' && !disabled && <Email size={20} aria-label="Email" />}
              {actionIcon === 'disabled' ||
                (disabled === true && <Error size={20} aria-label="disabled" />)}
            </div>
          </div>
        </div>
      </>
    )

    let cardContainer
    if (disabled === true) {
      cardContainer = <div className={cardContentClassNames}>{cardContent}</div>
    } else if (isLink === true) {
      cardContainer = (
        <Link href={href}>
          <a href={href} className={cardContentClassNames} {...rest}>
            {cardContent}
          </a>
        </Link>
      )
    } else {
      cardContainer = (
        <a href={href} className={cardContentClassNames} {...rest}>
          {cardContent}
        </a>
      )
    }

    return (
      <Theme theme={color === 'dark' && 'g100'}>
        <div className={ArticleCardClassNames}>{cardContainer}</div>
      </Theme>
    )
  }
}

ArticleCard.defaultProps = {
  color: 'light',
  disabled: false,
  actionIcon: ''
}

ArticleCard.propTypes = {
  /**
   * Action icon, default is blank, options are Launch, ArrowRight, Download
   */
  actionIcon: PropTypes.string,
  /**
   * Author
   */
  author: PropTypes.string,
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
   * date
   */
  date: PropTypes.string,

  /**
   * Use for disabled card
   */
  disabled: PropTypes.bool,

  /**
   * Set url for card
   */
  href: PropTypes.string,

  /**
   * Reat time of article
   */
  readTime: PropTypes.string,

  /**
   * sub title
   */
  subTitle: PropTypes.string,

  /**
   * Title
   */
  title: PropTypes.string
}
