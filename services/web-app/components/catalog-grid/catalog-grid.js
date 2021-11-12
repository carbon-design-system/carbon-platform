/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './catalog-grid.module.scss'
import CatalogGridItem from './catalog-grid-item'

const CatalogGrid = ({ assets = [] }) => {
  return (
    <div className={styles.container}>
      <CatalogGridItem assets={assets} />
    </div>
  )
}

export default CatalogGrid
