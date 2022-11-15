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

interface PageDescriptionProps {
  children: ReactNode
}

/**
 * The `<PageDescription>` component is generally used for intro text at the top
 * of the page using the type token `fluid-heading-03`.
 */
const PageDescription: MdxComponent<PageDescriptionProps> = ({ children }) => (
  <Grid>
    <Column sm={4} md={8} lg={8} className={clsx(withPrefix('page-description'))}>
      {children}
    </Column>
  </Grid>
)

PageDescription.propTypes = {
  /**
   * Provide the contents of PageDescription
   */
  children: PropTypes.node
}

export { PageDescriptionProps }
export default PageDescription
