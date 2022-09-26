/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './page-table.module.scss'

const PageTable = (props) => {
  const { children } = props

  let gridSize
  if (Array.isArray(children[1].props.children)) {
    gridSize = children[1].props.children[0].props.children.length
  } else {
    gridSize = children[1].props.children.props.children.length
  }

  let lg = ''
  if (gridSize > 3) {
    lg = 12
  } else {
    lg = 8
  }

  return (
    <Grid condensed className={styles.container}>
      <Column sm={4} md={8} lg={lg}>
        <div>
          <table className={styles['page-table']}>{children}</table>
        </div>
      </Column>
    </Grid>
  )
}

PageTable.propTypes = {
  /** Provide the contents of the PageTable */
  children: PropTypes.node
}

export default PageTable
