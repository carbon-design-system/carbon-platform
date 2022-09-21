/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Theme } from '@carbon/react'
import { ArrowRight, Download, Email, Error, Launch } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './article-card.module.scss'

/**
 * The `<ArticleCard>` component should generally be used inside of `<Grid narrow>` and
 * `<Column>` components.
 */
const ArticleCard = (props) => {
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
  } = props

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
            {actionIcon === 'arrowRight' && !disabled && <ArrowRight size={20} aria-label="Open" />}
            {actionIcon === 'download' && !disabled && <Download size={20} aria-label="Download" />}
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

ArticleCard.defaultProps = {
  color: 'light',
  disabled: false,
  actionIcon: ''
}

ArticleCard.propTypes = {
  /**
   * Action icon
   */
  actionIcon: PropTypes.oneOf(['launch', 'arrowRight', 'download', 'email']),
  /**
   * Author
   */
  author: PropTypes.string,

  /**
   * Provide an image to display above card
   */
  children: PropTypes.node,

  /**
   * Specify a custom class
   */
  className: PropTypes.string,

  /**
   * set to "dark" for dark background card
   */
  color: PropTypes.oneOf(['light', 'dark']),

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

export default ArticleCard
