/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { Children, ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { mediaQueries, useMatchMedia, withPrefix } from '../utils.js'

interface RowProps {
  children: ReactNode
}

const Row: MdxComponent<RowProps> = ({ children }) => {
  const arrayChildren = Children.toArray(children)

  const isSm = useMatchMedia(mediaQueries.sm)
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isXlg = useMatchMedia(mediaQueries.xlg)
  const isMax = useMatchMedia(mediaQueries.max)

  const sizeMappings = {
    Sm: isSm,
    Md: isMd,
    Lg: isLg,
    Xl: isXlg,
    Max: isMax
  }

  let narrow = false
  let condensed = false

  Children.map(arrayChildren, (child) => {
    if (typeof child === 'string') {
      return
    }
    if (typeof child === 'number') {
      return
    }
    if (!('props' in child)) {
      return
    }
    const condensedProps = Object.keys(child.props).filter(
      (prop) => prop.startsWith('noGutter') && !prop.endsWith('Left')
    )
    condensedProps.forEach((prop) => {
      const size = prop.replace('noGutter', '') as keyof typeof sizeMappings
      condensed = sizeMappings[size] ?? false
    })
    const narrowProps = Object.keys(child.props).filter(
      (prop) => prop.startsWith('noGutter') && prop.endsWith('Left')
    )
    narrowProps.forEach((prop) => {
      const size = prop.replace('noGutter', '').replace('Left', '') as keyof typeof sizeMappings
      narrow = sizeMappings[size] ?? false
    })
  })

  return (
    <Grid narrow={narrow} condensed={condensed} className={clsx(withPrefix('grid'))}>
      {children}
    </Grid>
  )
}

Row.propTypes = {
  /**
   * Pass in content that will be rendered within the Row
   */
  children: PropTypes.node
}

export { RowProps }
export default Row
