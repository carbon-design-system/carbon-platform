/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface RowProps {
  children: ReactNode
}

const Row: MdxComponent<RowProps> = ({ children }) => {
  return <Grid className={clsx(withPrefix('grid'))}>{children}</Grid>
}

Row.propTypes = {
  /**
   * Pass in content that will be rendered within the Row
   */
  children: PropTypes.node
}

export { RowProps }
export default Row
