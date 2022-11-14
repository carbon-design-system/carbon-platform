import { Column } from '@carbon-platform/mdx-components'

/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const ColumnMapper = ({
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
}) => (
  <Column
    colSm={colSm}
    colMd={colMd}
    colLg={colLg}
    colXl={colXl}
    colMax={colMax}
    offsetSm={offsetSm}
    offsetMd={offsetMd}
    offsetLg={offsetLg}
    offsetXl={offsetXl}
    offsetMax={offsetMax}
    as={as}
    lg={lg}
    max={max}
    md={md}
    sm={sm}
    xlg={xlg}
  >
    {children}
  </Column>
)
