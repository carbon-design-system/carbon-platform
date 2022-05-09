/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './page-description.module.scss'

/**
 * The `<PageDescription>` component is generally used for intro text at the top
 * of the page using the type token `fluid-heading-03`.
 */
const PageDescription = ({ children, className, ...rest }) => (
  <Grid>
    <Column sm={4} md={6} lg={8} className={clsx(styles['page-description'], className)} {...rest}>
      {children}
    </Column>
  </Grid>
)

PageDescription.propTypes = {
  /**
   * Provide the contents of PageDescription
   */
  children: PropTypes.node,
  /**
   * Optional class name.
   */
  className: PropTypes.string
}

export default PageDescription
