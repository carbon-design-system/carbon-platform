/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Link } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import AutolinkHeader from '@/components/autolink-header'

import styles from './full-page-error.module.scss'

export const FullPageError = ({ children, title, subtitle, link, href }) => {
  return (
    <Grid>
      <Column sm={4} md={8} lg={8}>
        <Grid className={clsx(styles.header, styles['h1-container'])}>
          <Column sm={4} md={8} lg={8}>
            <AutolinkHeader is="h1" className={clsx(styles.h1, styles.title)}>
              {title}
            </AutolinkHeader>
          </Column>
        </Grid>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.content}>{children}</div>
        <Link className={styles.link} href={href}>
          {link}
        </Link>
      </Column>
    </Grid>
  )
}

FullPageError.propTypes = {
  /**
   * Provide error details
   */
  children: PropTypes.node,
  /**
   * Provide optional url for the FullPageError
   */
  href: PropTypes.string,
  /**
   * Provide optional label for the FullPageError link
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
