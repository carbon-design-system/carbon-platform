/*
 * Copyright IBM Corp. 2022, 2023
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

import yaml from '@/data/status-indicators/status-indicators.yaml'

import styles from './status-indicator.module.scss'
import StatusIndicatorRow from './status-indicator-row'

// migrating this comment as-is:
// TODO: Organize styles, add the rest of the yaml
const StatusIndicatorTable = ({ attention }) => (
  <Grid condensed className={styles.container}>
    <Column sm={4} md={8} lg={12}>
      <div className={styles['status-indicator-table-wrapper']}>
        <StructuredListWrapper className={styles.table}>
          <StructuredListHead className="cds--grid">
            <StructuredListRow className="cds--row" head>
              <StructuredListCell
                className={`cds--col-lg-4 cds--col-md-1 ${styles['header-cell']}`}
                head
              >
                Icon
              </StructuredListCell>
              <StructuredListCell
                className={`cds--col-lg-2 cds--col-md-2 ${styles['header-cell']}`}
                head
              >
                Name
              </StructuredListCell>
              <StructuredListCell
                className={`cds--col-lg-2 cds--col-md-2 ${styles['header-cell']}`}
                head
              >
                Token
              </StructuredListCell>
              <StructuredListCell
                className={`cds--col-lg-4 cds--col-md-3 ${styles['header-cell']}`}
                head
              >
                Description & usage
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {yaml[attention].map((indicator, i) => (
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
  attention: PropTypes.oneOf(['high', 'medium', 'low', 'glyph'])
}

export default StatusIndicatorTable
