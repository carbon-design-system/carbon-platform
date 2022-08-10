/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, InlineNotification, Link } from '@carbon/react'
import clsx from 'classnames'
import PropTypes from 'prop-types'

import styles from './inline-error.module.scss'

export const InlineError = ({ content, title, description, href, link }) => {
  const wrapperClassName = clsx({
    'cds--inline-notification': true,
    'cds--inline-notification--low-contrast': true,
    'cds--inline-notification--error': true
  })

  return (
    <Grid>
      <Column sm={4} md={6} lg={12}>
        <InlineNotification href={href} className={clsx(wrapperClassName)}>
          <Grid className={styles.grid}>
            <Column sm={4} md={6} lg={12}>
              <span className={styles.container}>
                <strong className={styles.title}>{title}</strong>
                <Link className={styles.link}>{link}</Link>
              </span>
              <p className={styles.description}>{description}</p>
              <p className={styles.content}>{content}</p>
            </Column>
          </Grid>
        </InlineNotification>
      </Column>
    </Grid>
  )
}

InlineError.propTypes = {
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
