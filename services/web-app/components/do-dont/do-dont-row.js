/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './do-dont.module.scss'

const DoDontRow = ({ children, className }) => {
  return <Grid className={clsx(className, styles['do-dont-row'])}>{children}</Grid>
}

DoDontRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
}

export default DoDontRow
