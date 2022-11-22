/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ElementType, ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { mediaQueries, useMatchMedia, withPrefix } from '../utils.js'

interface CardGroupProps {
  children: ReactNode
  fullWidth?: boolean | null
  narrow?: boolean | null
  as?: string | ElementType | null
}

/**
 * The `<CardGroup>` component is used in lieu of a  `<Grid>` container
 * when laying out a set of `<ResourceCard>` components on a page. It
 * allows the cards to align in a grid at 8 columns at medium and
 * above breakpoints, and set the grid to condensed at the small
 * breakpoint.
 */
const CardGroup: MdxComponent<CardGroupProps> = ({ children, fullWidth, narrow, as }) => {
  const isSm = useMatchMedia(mediaQueries.sm)

  return (
    <Grid
      className={clsx(withPrefix('card-group'))}
      condensed={isSm}
      fullWidth={fullWidth}
      narrow={narrow}
      as={as}
    >
      <Column lg={8} md={8} sm={4}>
        <Grid condensed>{children}</Grid>
      </Column>
    </Grid>
  )
}

CardGroup.propTypes = {
  /**
   * Provide a custom element to render instead of the default
   */
  as: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.elementType.isRequired]),
  /**
   * Provide the contents of your `Card`.
   */
  children: PropTypes.node.isRequired,
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
export { CardGroupProps }
export default CardGroup
