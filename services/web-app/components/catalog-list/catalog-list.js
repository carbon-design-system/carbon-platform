/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid, Layer, Theme } from '@carbon/react'

import CatalogItem from '@/components/catalog-item'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-list.module.scss'

const CatalogList = ({ assets, isGrid = false, page = 1, pageSize = 10 }) => {
  const isLg = useMatchMedia(mediaQueries.lg)
  const isNarrow = isGrid && isLg

  const start = (page - 1) * pageSize
  const end = start + pageSize

  return (
    <Theme theme="white">
      <Layer>
        <Grid as="ul" className={isNarrow && styles.grid} narrow={isNarrow}>
          {assets.slice(start, end).map((asset, i) => (
            <CatalogItem asset={asset} key={i} isGrid={isGrid && isLg} />
          ))}
        </Grid>
      </Layer>
    </Theme>
  )
}

export default CatalogList
