/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './do-dont.module.scss'

export default class DoDontRow extends React.Component {
  render() {
    const { children, className } = this.props

    return <Grid className={clsx(className, styles.doDontRow)}>{children}</Grid>
  }
}

DoDontRow.propTypes = {
  children: PropTypes.node.isRequired
}
