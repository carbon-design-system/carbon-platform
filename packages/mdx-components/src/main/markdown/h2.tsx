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
import AutolinkHeader from './autolink-header/autolink-header.js'

interface H2Props {
  children: string | string[]
  className?: string | null
  headingClassName?: string | null
  noAnchor?: boolean | null
  [otherProp: string]: unknown
}

const H2: MdxComponent<H2Props> = ({
  children,
  className,
  headingClassName,
  noAnchor,
  ...rest
}) => {
  return (
    <Grid className={clsx(withPrefix('h2-container'), className)} {...rest}>
      <Column sm={4} md={8} lg={8}>
        {noAnchor && <h2 className={clsx(withPrefix('h2'), headingClassName)}>{children}</h2>}
        {!noAnchor && (
          <AutolinkHeader is="h2" className={clsx(withPrefix('h2'), headingClassName)}>
            {children}
          </AutolinkHeader>
        )}
      </Column>
    </Grid>
  )
}

H2.propTypes = {
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
  headingClassName: PropTypes.string,
  /**
   * Do not render the autolink anchor
   */
  noAnchor: PropTypes.bool
}

export { H2Props }
export default H2
