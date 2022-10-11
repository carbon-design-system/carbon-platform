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

// TODO: ask Joe 🙋‍♀️
// import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'
import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface RowProps {
  children: ReactNode
  className?: string | null
}

const Row: MdxComponent<RowProps> = ({ children, className }) => {
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
    const condensedProps = Object.keys(child.props).filter(
      (prop) => prop.startsWith('noGutter') && !prop.endsWith('Left')
    )
    condensedProps.forEach((prop) => {
      const size = prop.replace('noGutter', '')
      condensed = sizeMappings[size]
    })
    const narrowProps = Object.keys(child.props).filter(
      (prop) => prop.startsWith('noGutter') && prop.endsWith('Left')
    )
    narrowProps.forEach((prop) => {
      const size = prop.replace('noGutter', '').replace('Left', '')
      narrow = sizeMappings[size]
    })
  })

  return (
    <Grid narrow={narrow} condensed={condensed} className={clsx(withPrefix('grid'), className)}>
      {children}
    </Grid>
  )
}

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export { RowProps }
export default Row
