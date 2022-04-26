/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid as CarbonGrid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './grid.module.scss'

const Grid = ({ children, className, ...props }) => {
  return (
    <CarbonGrid {...props} className={clsx(styles.grid, className)}>
      {children}
    </CarbonGrid>
  )
}

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
export default Grid
