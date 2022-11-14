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

interface H5Props {
  children: ReactNode
}

const H5: MdxComponent<H5Props> = ({ children }) => {
  return (
    <Grid className={clsx(withPrefix('h5-container'))}>
      <Column sm={4} md={8} lg={8}>
        <h5 className={clsx(withPrefix('h5'))}>{children}</h5>
      </Column>
    </Grid>
  )
}

H5.propTypes = {
  /**
   * String title for Header
   */
  children: PropTypes.node.isRequired
}

export { H5Props }
export default H5
