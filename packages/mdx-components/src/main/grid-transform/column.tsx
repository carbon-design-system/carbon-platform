/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column as CarbonColumn } from '@carbon/react'
import PropTypes from 'prop-types'
import React, { ElementType, ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'

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
  lg?: number | boolean | null
  max?: number | boolean | null
  md?: number | boolean | null
  sm?: number | boolean | null
  xlg?: number | boolean | null
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
    <CarbonColumn {...colSizes} as={as}>
      {children}
    </CarbonColumn>
  )
}

Column.defaultProps = {
  sm: 4,
  md: 8,
  lg: 12,
  as: 'div'
}

const spanPropType = PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.number.isRequired])

Column.propTypes = {
  /**
   * Provide a custom element to render instead of the default
   */
  as: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.elementType.isRequired]),
  /**
   * Specify children passed into the Column component
   */
  children: PropTypes.node,
  /**
   * Specify total columns at viewport large (legacy)
   */
  colLg: PropTypes.number,
  /**
   * Specify total columns at viewport max (legacy)
   */
  colMax: PropTypes.number,
  /**
   * Specify total columns at viewport medium (legacy)
   */
  colMd: PropTypes.number,
  /**
   * Specify total columns at viewport small (legacy)
   */
  colSm: PropTypes.number,
  /**
   * Specify total columns at viewport extra large (legacy)
   */
  colXl: PropTypes.number,
  /**
   * Specify total columns at viewport large
   */
  lg: spanPropType,
  /**
   * Specify total columns at viewport max
   */
  max: spanPropType,
  /**
   * Specify total columns at viewport medium
   */
  md: spanPropType,
  /**
   * Specify total column offset at viewport large (legacy)
   */
  offsetLg: PropTypes.number,
  /**
   * Specify total column offset at viewport max (legacy)
   */
  offsetMax: PropTypes.number,
  /**
   * Specify total column offset at viewport medium (legacy)
   */
  offsetMd: PropTypes.number,
  /**
   * Specify total column offset at viewport small (legacy)
   */
  offsetSm: PropTypes.number,
  /**
   * Specify total column offset at viewport extra large (legacy)
   */
  offsetXl: PropTypes.number,
  /**
   * Specify total columns at viewport small
   */
  sm: spanPropType,
  /**
   * Specify total columns at viewport extra large
   */
  xlg: spanPropType
}

export { ColumnProps }
export default Column
