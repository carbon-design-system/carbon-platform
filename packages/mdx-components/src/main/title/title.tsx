/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface TitleProps {
  children: ReactNode
  className?: string | null
}

/**
 * The `<Title>` component is used to provide a title to a subsequent component
 * (table, image, video, code block). The Title should be used in favor of other
 * techniques for bolded text (h4s) to preserve page structure and heading hierarchy.
 */
const Title: MdxComponent<TitleProps> = ({ children, className }) => (
  <Grid className={clsx(className, withPrefix('title'))}>
    <Column sm={4} md={8} lg={8}>
      <p className={withPrefix('h4')}>{children}</p>
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

export { TitleProps }
export default Title
