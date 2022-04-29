/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Children } from 'react'

import styles from './anchor-links.module.scss'

/**
 * The `<AnchorLinks>` and `<AnchorLink>` components are used together to display a list of anchor
 * links for navigation within the page. Use these to link to `<h2>` or `<h3>` anywhere within your
 * page. As long as the anchor link text and header text matches the link will work.
 *
 * For most pages, we recommend starting with a `PageDescription` followed by `AnchorLinks` if the
 * content is long enough.
 */
const AnchorLinks = ({ children, small, className }) => {
  const isColumn = Children.count(children) > 6
  const classNames = clsx(className, {
    [styles['list--small']]: small,
    [styles['multiple-columns']]: isColumn
  })

  return (
    <Grid className={styles.list}>
      <Column sm={4} md={8} lg={8}>
        <ul className={classNames}>
          {Children.map(children, (link, i) => (
            <li key={i}>{link}</li>
          ))}
        </ul>
      </Column>
    </Grid>
  )
}

AnchorLinks.propTypes = {
  /**
   * `<AnchorLink>` components.
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional class name on the `ul`.
   */
  className: PropTypes.string,
  /**
   * Display small font size.
   */
  small: PropTypes.bool
}

export default AnchorLinks
