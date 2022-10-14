/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface H4Props {
  children: string | string[]
  className?: string | null
  headingClassName?: string | null
  [otherProp: string]: unknown
}

const H4: MdxComponent<H4Props> = ({ children, className, headingClassName, ...rest }) => {
  return (
    <Grid className={clsx(withPrefix('h4-container'), className)} {...rest}>
      <Column sm={4} md={8} lg={8}>
        <h4 className={clsx(withPrefix('h4'), headingClassName)}>{children}</h4>
      </Column>
    </Grid>
  )
}

H4.propTypes = {
  /**
   * String title for Header
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  /**
   * Specify optional className for container element
   */
  className: PropTypes.string,
  /**
   * Specify optional className for header element
   */
  headingClassName: PropTypes.string
}

export { H4Props }
export default H4
