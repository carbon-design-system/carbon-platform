/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import PropTypes from 'prop-types'

import * as styles from './divider.module.scss'

const Divider = ({ children }) => {
  return (
    <Grid className={styles['list-row']}>
      <Column sm={4} md={2} lg={4}>
        <div>{children[0]}</div>
      </Column>
      <Column sm={4} md={6} lg={8}>
        <div>{children.slice(1, children.length)}</div>
      </Column>
    </Grid>
  )
}

Divider.propTypes = {
  children: PropTypes.node
}

export default Divider
