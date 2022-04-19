/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column as CarbonColumn } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './grid.module.scss'

const Column = ({
  children,
  className,
  colSm,
  colMd,
  colLg,
  colXl,
  colMax,
  offsetSm,
  offsetMd,
  offsetLg,
  offsetXl,
  offsetMax
}) => {
  let sm = ''
  if (offsetSm !== undefined) {
    sm = { span: colSm, offset: offsetSm }
  } else {
    sm = colSm
  }

  let md = ''
  if (offsetLg !== undefined) {
    md = { span: colMd, offset: offsetMd }
  } else {
    md = colMd
  }

  let lg = ''
  if (offsetLg !== undefined) {
    lg = { span: colLg, offset: offsetLg }
  } else {
    lg = colLg
  }

  let xlg = ''
  if (offsetXl !== undefined) {
    xlg = { span: colXl, offset: offsetXl }
  } else {
    xlg = colXl
  }

  let max = ''
  if (offsetMax !== undefined) {
    max = { span: colMax, offset: offsetMax }
  } else {
    max = colMax
  }

  return (
    <CarbonColumn
      sm={sm}
      md={md}
      lg={lg}
      xlg={xlg}
      max={max}
      className={clsx(styles.column, className)}
    >
      {children}
    </CarbonColumn>
  )
}

Column.defaultProps = {
  colSm: 4,
  colMd: 8,
  colLg: 12
}

Column.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  colLg: PropTypes.number,
  colMax: PropTypes.number,
  colMd: PropTypes.number,
  colSm: PropTypes.number,
  colXl: PropTypes.number,
  offsetLg: PropTypes.number,
  offsetMax: PropTypes.number,
  offsetMd: PropTypes.number,
  offsetSm: PropTypes.number,
  offsetXl: PropTypes.number
}
export default Column
