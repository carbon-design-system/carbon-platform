/*
 * Copyright IBM Corp. 2022, 2023
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
import AutolinkHeader from './autolink-header/autolink-header.js'

interface H3Props {
  children: ReactNode
  className?: string | null
  headingClassName?: string | null
  [otherProp: string]: unknown
}

const H3: MdxComponent<H3Props> = ({ children, className, headingClassName, ...rest }) => {
  return (
    <Grid className={clsx(withPrefix('header'), withPrefix('h3-container'), className)} {...rest}>
      <Column sm={4} md={8} lg={8}>
        <AutolinkHeader is="h3" className={clsx(withPrefix('h3'), headingClassName)}>
          {children}
        </AutolinkHeader>
      </Column>
    </Grid>
  )
}

H3.propTypes = {
  /**
   * String title for Header
   */
  children: PropTypes.node.isRequired,
  /**
   * Specify optional className for container element
   */
  className: PropTypes.string,
  /**
   * Specify optional className for header element
   */
  headingClassName: PropTypes.string
}

export { H3Props }
export default H3
