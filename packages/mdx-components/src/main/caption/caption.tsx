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
}

/**
 * The `<Caption>` component is typically used below images or videos.
 */
const Caption: MdxComponent<CaptionProps> = ({ children }) => (
  <Grid className={clsx(withPrefix('caption-container'))}>
    <Column sm={4} md={6} lg={6}>
      <p className={withPrefix('caption')}>{children}</p>
    </Column>
  </Grid>
)

Caption.propTypes = {
  /**
   * Speficy any children passed into the Caption component
   */
  children: PropTypes.node
}

export { CaptionProps }
export default Caption
