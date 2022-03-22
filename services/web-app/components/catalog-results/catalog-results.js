/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import PropTypes from 'prop-types'
import { assetPropTypes } from 'types'

import styles from './catalog-results.module.scss'

const CatalogResults = ({ assets = [] }) => {
  return (
    <Grid className={styles.container} narrow>
      <Column sm={4} md={8} lg={12} className={styles.column}>
        <div className={styles.results}>{assets.length} results</div>
      </Column>
    </Grid>
  )
}

CatalogResults.propTypes = {
  assets: PropTypes.arrayOf(assetPropTypes)
}

export default CatalogResults
