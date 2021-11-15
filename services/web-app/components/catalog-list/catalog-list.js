/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Add16 } from '@carbon/icons-react'
import {
  Svg12Stable,
  Svg14Download,
  Svg14License,
  Svg16Carbon,
  Svg24Cloud,
  Svg24React
} from '@carbon-platform/icons'
import Link from 'next/link'

import { getStatus } from '@/utils/schema'
import { getSlug } from '@/utils/slug'

import styles from './catalog-list.module.scss'

const CatalogList = ({ assets = [] }) => {
  return (
    <ul>
      {assets.map((asset, i) => (
        <li className={styles.item} key={i}>
          <Link href={`/assets/${asset.params.slug}/latest/${getSlug(asset.content)}`}>
            <a className={styles.itemInner}>
              <div className={styles.itemImage}>
                <Add16 aria-label="Add" className="my-custom-class" />
              </div>
              <div className={styles.itemContent}>
                <p className={styles.itemSponsor}>{'Super Sponsor'}</p>
                <header className={styles.itemName}>{asset.content.name}</header>
                <p className={styles.itemDescription}>{asset.content.description}</p>
                <footer className={styles.itemInfo}>
                  <Svg12Stable className={styles.itemStatusIcon} />
                  <div className={styles.itemStatus}>{getStatus(asset.content.status)}</div>
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
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default CatalogList
