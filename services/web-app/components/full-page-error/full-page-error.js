/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './full-page-error.module.scss'

export const FullPageError = ({ title, subtitle, description, content }) => {
  return (
    <Grid>
      <Column className={styles.column} sm={4} md={8} lg={{ start: 6, span: 6 }}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.content}>{content}</div>
      </Column>
    </Grid>
  )
}

FullPageError.propTypes = {
  /**
   * Provide error details
   */
  content: PropTypes.node,
  /**
   * Provide a description for the FullPageError
   */
  description: PropTypes.string,
  /**
   * Provide optional href for the FullPageError
   */
  href: PropTypes.string,
  /**
   * Provide optional link label for the FullPageError
   */
  link: PropTypes.string,
  /**
   * Provide a title for the FullPageError
   */
  subtitle: PropTypes.string,
  /**
   * Provide a title for the FullPageError
   */
  title: PropTypes.string
}

export default FullPageError
