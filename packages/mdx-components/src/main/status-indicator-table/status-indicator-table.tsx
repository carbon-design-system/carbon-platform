/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  Grid,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper
} from '@carbon/react'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'
import statusIndicators from './data/status-indicators.js'
import StatusIndicatorRow from './status-indicator-row.js'

interface StatusIndicatorTableProps {
  attention: 'high' | 'medium' | 'low' | 'glyph'
}

// migrating this comment as-is:
// TODO: Organize styles, add the rest of the yaml
const StatusIndicatorTable: MdxComponent<StatusIndicatorTableProps> = ({ attention }) => (
  <Grid condensed className={withPrefix('status-indicator-table-container')}>
    <Column sm={4} md={8} lg={12}>
      <div className={'status-indicator-table-wrapper'}>
        <StructuredListWrapper className={'table'}>
          <StructuredListHead className="cds--grid">
            <StructuredListRow className="cds--row" head>
              <StructuredListCell className={`cds--col-lg-4 cds--col-md-1 ${'header-cell'}`} head>
                Icon
              </StructuredListCell>
              <StructuredListCell className={`cds--col-lg-2 cds--col-md-2 ${'header-cell'}`} head>
                Name
              </StructuredListCell>
              <StructuredListCell className={`cds--col-lg-2 cds--col-md-2 ${'header-cell'}`} head>
                Token
              </StructuredListCell>
              <StructuredListCell className={`cds--col-lg-4 cds--col-md-3 ${'header-cell'}`} head>
                Description & usage
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {statusIndicators[attention].map((indicator, i) => (
              <StatusIndicatorRow
                key={`${indicator.name}-${i}`}
                attention={attention}
                {...indicator}
              />
            ))}
          </StructuredListBody>
          <StructuredListBody />
        </StructuredListWrapper>
      </div>
    </Column>
  </Grid>
)

StatusIndicatorTable.propTypes = {
  attention: PropTypes.oneOf<StatusIndicatorTableProps['attention']>([
    'high',
    'medium',
    'low',
    'glyph'
  ]).isRequired
}

export { StatusIndicatorTableProps }
export default StatusIndicatorTable
