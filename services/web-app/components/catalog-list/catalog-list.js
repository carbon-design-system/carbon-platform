/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid, Layer, Theme } from '@carbon/react'

import CatalogItem from '@/components/catalog-item'
import { useMediaQueryContext } from '@/contexts/media-query'

const CatalogList = ({ assets, isGrid = false }) => {
  const { isLg } = useMediaQueryContext()

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
