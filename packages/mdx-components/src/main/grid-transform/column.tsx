/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column as CarbonColumn } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ElementType, ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface ColumnProps {
  children: ReactNode
  colSm?: number | null
  colMd?: number | null
  colLg?: number | null
  colXl?: number | null
  colMax?: number | null
  offsetSm?: number | null
  offsetMd?: number | null
  offsetLg?: number | null
  offsetXl?: number | null
  offsetMax?: number | null
  as?: string | ElementType | null
  lg?: number | null
  max?: number | null
  md?: number | null
  sm?: number | null
  xlg?: number | null
}

const Column: MdxComponent<ColumnProps> = ({
  children,
  colSm,
  colMd,
  colLg,
  colXl,
  colMax,
  offsetSm,
  offsetMd,
  offsetLg,
  offsetXl,
  offsetMax,
  as,
  lg,
  max,
  md,
  sm,
  xlg
}) => {
  const colSizes = {
    sm: offsetSm ? { span: colSm ?? sm, offset: offsetSm } : colSm ?? sm,
    md: offsetMd ? { span: colMd ?? md, offset: offsetMd } : colMd ?? md,
    lg: offsetLg ? { span: colLg ?? lg, offset: offsetLg } : colLg ?? lg,
    xlg: offsetXl ? { span: colXl ?? xlg, offset: offsetXl } : colXl ?? xlg,
    max: offsetMax ? { span: colMax ?? max, offset: offsetMax } : colMax ?? max
  }

  return (
    <CarbonColumn {...colSizes} as={as} className={clsx(withPrefix('column'))}>
      {children}
    </CarbonColumn>
  )
}

Column.defaultProps = {
  colSm: 4,
  colMd: 8,
  colLg: 12,
  as: 'div'
}

Column.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.elementType.isRequired]),
  /**
   * Specify children passed into the Column component
   */
  children: PropTypes.node,
  /**
   * Specify total columns and viewport large
   */
  colLg: PropTypes.number.isRequired,
  /**
   * Specify total columns and viewport max
   */
  colMax: PropTypes.number,
  /**
   * Specify total columns and viewport medium
   */
  colMd: PropTypes.number.isRequired,
  /**
   * Specify total columns and viewport sall
   */
  colSm: PropTypes.number.isRequired,
  /**
   * Specify total columns and viewport extra large
   */
  colXl: PropTypes.number,
  lg: PropTypes.number,
  max: PropTypes.number,
  md: PropTypes.number,
  offsetLg: PropTypes.number,
  offsetMax: PropTypes.number,
  offsetMd: PropTypes.number,
  offsetSm: PropTypes.number,
  offsetXl: PropTypes.number,
  sm: PropTypes.number,
  xlg: PropTypes.number
}

export { ColumnProps }
export default Column
