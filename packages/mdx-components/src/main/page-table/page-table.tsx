/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface PageTableProps {
  children: ReactNode[]
}

/**
 * For MDX files, steer away from using JSX components
 * for tables in favor of standard markdown syntax:
 *
 *```
 * | Header 1 | Header 2 | Header 3 |
 * | ---- | ---- | ----------- |
 * | Cell 1-1 | Cell 1-2 | Cell 1-3 |
 * | Cell 2-1 | Cell 2-2 | Cell 2-3 |
 * ```
 */
const PageTable: MdxComponent<PageTableProps> = (props) => {
  const { children } = props

  if (!children[1]) {
    return null
  }
  if (typeof children[1] === 'string') {
    return null
  }
  if (typeof children[1] === 'boolean') {
    return null
  }
  if (typeof children[1] === 'number') {
    return null
  }
  if (!('props' in children[1])) {
    return null
  }

  let gridSize
  if (Array.isArray(children[1].props.children)) {
    gridSize = children[1].props.children[0].props.children.length
  } else {
    gridSize = children[1].props.children.props.children.length
  }

  let lg = null
  if (gridSize > 3) {
    lg = 12
  } else {
    lg = 8
  }

  return (
    <Grid condensed className={withPrefix('page-table-container')}>
      <Column sm={4} md={8} lg={lg}>
        <div>
          <table className={withPrefix('page-table')}>{children}</table>
        </div>
      </Column>
    </Grid>
  )
}

PageTable.propTypes = {
  /** Provide the contents of the PageTable */
  children: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired
}

export { PageTableProps }
export default PageTable
