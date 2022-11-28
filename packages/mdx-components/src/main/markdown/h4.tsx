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

interface H4Props {
  autolink?: boolean | null
  children: ReactNode
}

const H4: MdxComponent<H4Props> = ({ autolink = true, children }) => {
  const Component = autolink ? 'h4' : 'p'

  return (
    <Grid
      className={clsx(withPrefix('header'), withPrefix('h4-container'), {
        [withPrefix('as-paragraph')]: !autolink
      })}
    >
      <Column sm={4} md={8} lg={8}>
        <Component className={clsx(withPrefix('h4'))}>{children}</Component>
      </Column>
    </Grid>
  )
}

H4.propTypes = {
  /**
   * Specify autolink
   */
  autolink: PropTypes.bool,
  /**
   * String title for Header
   */
  children: PropTypes.node.isRequired
}

export { H4Props }
export default H4
