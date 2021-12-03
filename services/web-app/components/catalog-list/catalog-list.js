/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid, Layer, Theme } from '@carbon/react'

import CatalogItem from '@/components/catalog-item'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

const CatalogList = ({ assets, isGrid = false }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  return (
    <Theme theme="white">
      <Layer>
        <Grid as="ul" narrow={isGrid && isLg}>
          {assets.map((asset, i) => (
            <CatalogItem asset={asset} key={i} isGrid={isGrid && isLg} />
          ))}
        </Grid>
      </Layer>
    </Theme>
  )
}

export default CatalogList
