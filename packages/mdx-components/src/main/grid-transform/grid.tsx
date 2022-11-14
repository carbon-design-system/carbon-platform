/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid as CarbonGrid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ElementType, ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface GridProps {
  children: ReactNode
  condensed?: boolean | null
  fullWidth?: boolean | null
  narrow?: boolean | null
  as?: string | ElementType | null
}

/**
 * The Platform allows for easy use of the Carbon `<Grid>` and `<Column>`
 * components. See full docs in the Carbon React Storybook.
 * https://react.carbondesignsystem.com/?path=/story/elements-grid--default
 */
const Grid: MdxComponent<GridProps> = ({ children, condensed, fullWidth, narrow, as }) => (
  <CarbonGrid
    condensed={condensed}
    fullWidth={fullWidth}
    narrow={narrow}
    as={as}
    className={clsx(withPrefix('grid'))}
  >
    {children}
  </CarbonGrid>
)

Grid.propTypes = {
  /**
   * Provide a custom element to render instead of the default
   */
  as: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.elementType.isRequired]),
  /**
   * Pass in content that will be rendered within the Grid
   */
  children: PropTypes.node,
  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,
  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: PropTypes.bool,
  /**
   * Container hangs 16px into the gutter.
   * Useful for typographic alignment with and without containers.
   */
  narrow: PropTypes.bool
}

export { GridProps }
export default Grid
