/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from '@carbon/react'
import PropTypes from 'prop-types'

import InlineNotification from '@/components/inline-notification'

import styles from './inline-error.module.scss'

export const InlineError = ({ title, description, content, href, link }) => {
  return (
    <InlineNotification kind="error" hideCloseButton={false}>
      <div className={styles.container}>
        <strong className={styles.title}>{title}</strong>
        <Link className={styles.link} href={href}>
          {link}
        </Link>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.content}>{content}</div>
    </InlineNotification>
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
