/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-results.module.scss'

const CatalogResults = ({ items = [] }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  return (
    <Grid className={styles.grid} condensed={!isLg} narrow={isLg}>
      <Column sm={4} md={8} lg={12}>
        <div className={styles.results}>{items.length} results</div>
      </Column>
    </Grid>
  )
}

CatalogResults.propTypes = {
  items: PropTypes.array
}

export default CatalogResults
