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
import AutolinkHeader from './autolink-header/autolink-header.js'

interface H2Props {
  children: ReactNode
  noAnchor?: boolean | null
}

const H2: MdxComponent<H2Props> = ({ children, noAnchor }) => {
  return (
    <Grid className={clsx(withPrefix('header'), withPrefix('h2-container'))}>
      <Column sm={4} md={8} lg={8}>
        {noAnchor && <h2 className={clsx(withPrefix('h2'))}>{children}</h2>}
        {!noAnchor && (
          <AutolinkHeader is="h2" className={clsx(withPrefix('h2'))}>
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
  children: PropTypes.node.isRequired,
  /**
   * Do not render the autolink anchor
   */
  noAnchor: PropTypes.bool
}

export { H2Props }
export default H2
