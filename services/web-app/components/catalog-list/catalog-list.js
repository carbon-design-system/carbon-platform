/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Tag } from '@carbon/react'
import styles from './catalog-list.module.scss'
import {
  Svg12Stable,
  Svg10ArrowNorthwest,
  Svg14Download,
  Svg14License,
  Svg16Carbon,
  Svg32TagCarbon
} from '@/icons/index.js'
import { Add16 } from '@carbon/icons-react'

const CatalogList = () => {
  return (
    <article className={styles.item}>
      <div className={styles.itemImage}>
        <Add16 aria-label="Add" className="my-custom-class" />
      </div>
      <div className={styles.itemContent}>
        <p className={styles.itemSponsor}>
          {'Super Sponsor'}
          <Svg10ArrowNorthwest className={styles.itemSponsorIcon} />
        </p>
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
        <Tag aria-hidden="true">{'Design only'}</Tag>
        <Svg32TagCarbon className={styles.itemTagsSponsor} />
      </div>
    </article>
  )
}

export default CatalogList
