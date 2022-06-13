/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'
import { libraryPropTypes } from 'types'

import Catalog from '@/components/catalog'
import CatalogItem from '@/components/catalog-item'
import { getSlug } from '@/utils/slug'

// import styles from './assets-catalog.module.scss'

const renderAsset = (asset, i, assetCounts, filter, isGrid) => (
  <CatalogItem
    assetCounts={assetCounts}
    asset={asset}
    filter={filter}
    key={`${i}-${getSlug(asset.content)}`}
    isGrid={isGrid}
  />
)

/**
 * The `<Aside>` component is a wrapper component that adds styling to make the text display
 *  smaller than the default body text with a one column offset. It is designed to be used on
 * the side of the page within grid components. Add an aria-label for a11y.
 */
const AssetsCatalog = ({ libraries, type, collection, glob }) => {
  return (
    <Catalog
      items={libraries}
      type={type}
      collection={collection}
      glob={glob}
      renderItem={renderAsset}
      itemPluralName="assets"
    />
  )
}

export default AssetsCatalog

AssetsCatalog.propTypes = {
  collection: PropTypes.string,
  glob: PropTypes.object,
  /**
   * Libraries array.
   */
  libraries: PropTypes.arrayOf(libraryPropTypes).isRequired,

  /**
   * type of catalog element.
   */
  type: PropTypes.oneOf(['element', 'function', 'pattern', 'template']).isRequired
}
