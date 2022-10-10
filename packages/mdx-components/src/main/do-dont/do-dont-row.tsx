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

interface DoDontRowProps {
  children: ReactNode
  className?: string | null
}

/**
 * The `<DoDont>` component includes built in columns and is used within
 * the `<DoDontRow>` component. You can provide an image or video as children,
 * or text using the `text` prop.
 */
const DoDontRow: MdxComponent<DoDontRowProps> = ({ children, className }) => {
  return <Grid className={clsx(className, withPrefix('do-dont-row'))}>{children}</Grid>
}

DoDontRow.propTypes = {
  /** set children */
  children: PropTypes.node.isRequired,
  /** set optional custom class */
  className: PropTypes.string
}

export { DoDontRowProps }
export default DoDontRow
