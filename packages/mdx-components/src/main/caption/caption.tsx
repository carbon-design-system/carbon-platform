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

interface CaptionProps {
  children: ReactNode
  className?: string | null
}

/**
 * The `<Caption>` component is typically used below images or videos.
 */
const Caption: MdxComponent<CaptionProps> = ({ children, className }) => (
  <Grid className={clsx(className, withPrefix('caption-container'))}>
    <Column sm={4} md={6} lg={6}>
      <p className={withPrefix('caption')}>{children}</p>
    </Column>
  </Grid>
)

Caption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export { CaptionProps }
export default Caption
