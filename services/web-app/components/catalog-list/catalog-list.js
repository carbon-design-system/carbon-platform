/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import CatalogItem from '@/components/catalog-item'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-list.module.scss'

const CatalogList = ({ assets, isGrid = false, page = 1, pageSize = 10 }) => {
  const isLg = useMatchMedia(mediaQueries.lg)
  const isNarrow = isGrid && isLg

  const start = (page - 1) * pageSize
  const end = start + pageSize

  const renderAssets = assets.slice(start, end)

  return (
    <Grid
      as="ul"
      className={clsx(styles.container, isNarrow && styles.containerGrid)}
      narrow={isNarrow}
    >
      {renderAssets.map((asset, i) => (
        <CatalogItem asset={asset} key={i} isGrid={isGrid && isLg} />
      ))}
      {(!renderAssets || renderAssets.length === 0) && (
        <Column className={clsx(styles.copy, isNarrow && styles.copyGrid)} sm={4} md={8} lg={12}>
          <h2 className={styles.heading}>No results found</h2>
          <p className={styles.paragraph}>
            {
              "It appears we don't have any assets that match your search. Try different search terms."
            }
          </p>
        </Column>
      )}
    </Grid>
  )
}

export default CatalogList
