/* eslint-disable react/display-name */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Tag } from '@carbon/react'
import styles from './my-component.module.scss'
import {
  Svg12Stable,
  Svg10ArrowNorthwest,
  Svg14Download,
  Svg14License,
  Svg16Carbon,
  Svg32TagCarbon
} from '@/icons/index.js'
import { Add16 } from '@carbon/icons-react'

const ComponentCatalogItem = () => {
  return (
    <article className={styles.componentCatalogItem}>
      <div className={styles.componentCatalogItemImage}>
        <Add16 aria-label="Add" className="my-custom-class" />
      </div>
      <div className={styles.componentCatalogItemContent}>
        <p className={styles.componentCatalogItemSponsor}>
          {'Super Sponsor'}
          <Svg10ArrowNorthwest className={styles.componentCatalogItemSponsorIcon} />
        </p>
        <header className={styles.componentCatalogItemName}>{'The best component ever'}</header>
        <p className={styles.componentCatalogItemDescription}>
          {'This component is so powerful. It\'s actually the best component in the world if you didn\'t know'}
        </p>
        <footer className={styles.componentCatalogItemInfo}>
          <Svg12Stable className={styles.componentCatalogItemStatusIcon} />
          <div className={styles.componentCatalogItemStatus}>{'Stable'}</div>
          <Svg14Download className={styles.componentCatalogItemDownloadsIcon} />
          <div className={styles.componentCatalogItemDownloads}>{'1,234'}</div>
          <Svg14License className={styles.componentCatalogItemLicenseIcon} />
          <div className={styles.componentCatalogItemLicense}>{'Apache 2.0'}</div>
          <Svg16Carbon className={styles.componentCatalogItemReviewedIcon} />
          <div className={styles.componentCatalogItemReviewed}>{'Reviewed'}</div>
        </footer>
      </div>
      <div className={styles.componentCatalogItemTags}>
        <Tag aria-hidden="true">{'Design only'}</Tag>
        <Svg32TagCarbon className={styles.componentCatalogItemTagsSponsor} />
      </div>
    </article>
  )
}

export default ComponentCatalogItem
