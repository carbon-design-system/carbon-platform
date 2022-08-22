/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import markdownStyles from '@/components/markdown/markdown.module.scss'

/**
 * The `<Title>` component is used to provide a title to a subsequent component
 * (table, image, video, code block). The Title should be used in favor of other
 * techniques for bolded text (h4s) to preserve page structure and heading hierarchy.
 */
const Title = ({ children, className }) => (
  <Grid className={clsx(className, markdownStyles['h4-container'])}>
    <Column sm={4} md={6} lg={8}>
      <p className={markdownStyles.h4}>{children}</p>
    </Column>
  </Grid>
)

Title.propTypes = {
  /**
   * Provide the contents of Title
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional class name on the title.
   */
  className: PropTypes.string
}
export default Title
