/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './page-table.module.scss'

export default class PageTable extends React.Component {
  render() {
    const { children } = this.props
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

    let md = ''
    if (gridSize > 3) {
      md = 8
    } else {
      md = 6
    }

    return (
      <Grid condensed>
        <Column sm={4} md={md} lg={lg}>
          <div className={styles.container}>
            <table className={styles.pageTable}>{children}</table>
          </div>
        </Column>
      </Grid>
    )
  }
}

PageTable.propTypes = {
  children: PropTypes.node
}
