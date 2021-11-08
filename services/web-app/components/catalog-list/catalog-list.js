/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Svg12Stable,
  Svg14Download,
  Svg14License,
  Svg16Carbon,
  Svg24Cloud,
  Svg24React
} from '@carbon-platform/icons'
import { Add16 } from '@carbon/icons-react'
import styles from './catalog-list.module.scss'

const CatalogList = () => {
  return (
    <div className={styles.item}>
      <div className={styles.itemImage}>
        <Add16 aria-label="Add" className="my-custom-class" />
      </div>
      <div className={styles.itemContent}>
        <p className={styles.itemSponsor}>{'Super Sponsor'}</p>
        <header className={styles.itemName}>{'The best component ever'}</header>
        <p className={styles.itemDescription}>
          {
            "This component is so powerful. It's actually the best component in the world if you didn't know"
          }
        </p>
        <footer className={styles.itemInfo}>
          <Svg12Stable className={styles.itemStatusIcon} />
          <div className={styles.itemStatus}>{'Stable'}</div>
          <Svg14Download className={styles.itemDownloadsIcon} />
          <div className={styles.itemDownloads}>{'1,234'}</div>
          <Svg14License className={styles.itemLicenseIcon} />
          <div className={styles.itemLicense}>{'Apache 2.0'}</div>
          <Svg16Carbon className={styles.itemReviewedIcon} />
          <div className={styles.itemReviewed}>{'Reviewed'}</div>
        </footer>
      </div>
      <div className={styles.itemTags}>
        <Svg24React />
        <Svg24Cloud className={styles.itemTagsSponsor} />
      </div>
    </div>
  )
}

export default CatalogList
