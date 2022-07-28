/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Link } from '@carbon/react'
import { Close, ErrorFilled } from '@carbon/react/icons'
import clsx from 'classnames'
import PropTypes from 'prop-types'
import { useState } from 'react'

import styles from './inline-error.module.scss'

export const InlineError = ({ className, content, title, description, href, link }) => {
  const [showNotification, setShowNotification] = useState(true)
  const containerClassName = clsx(className, {
    'cds--inline-notification': true,
    'cds--inline-notification--low-contrast': true,
    'cds--inline-notification--error': true
  })

  const closeNotifcation = () => {
    setShowNotification(!showNotification)
  }

  return (
    showNotification && (
      <Grid>
        <Column sm={4} md={6} lg={12} className={clsx(styles.notification, className)}>
          <div className={containerClassName}>
            <Grid>
              <Column sm={3} md={4} lg={8}>
                <div className="cds--inline-notification__details">
                  <ErrorFilled className="cds--inline-notification__icon" size={20}>
                    <title>{'Error icon'}</title>
                  </ErrorFilled>
                  <div className="cds--inline-notification__text-wrapper">
                    <span className={styles.title}>{title}</span>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.content}>{content}</p>
                  </div>
                </div>
              </Column>
              <Column sm={1} md={2} lg={4}>
                <div className="cds--inline-notification__text-wrapper">
                  <div
                    className={clsx(styles['link-content'], 'cds--inline-notification__details')}
                  >
                    <Link className={styles.link} href={href}>
                      {link}
                    </Link>
                  </div>
                </div>
                <button
                  className="cds--inline-notification__close-button"
                  type="button"
                  onClick={closeNotifcation}
                >
                  <Close size={16} />
                </button>
              </Column>
            </Grid>
          </div>
        </Column>
      </Grid>
    )
  )
}

InlineError.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * Provide error details
   */
  content: PropTypes.node,
  /**
   * Provide a description for the InlineError
   */
  description: PropTypes.string,
  /**
   * Provide optional href for the InlineError
   */
  href: PropTypes.string,
  /**
   * Provide optional link label for the InlineError
   */
  link: PropTypes.string,
  /**
   * Provide a title for the InlineError
   */
  title: PropTypes.string
}

export default InlineError
