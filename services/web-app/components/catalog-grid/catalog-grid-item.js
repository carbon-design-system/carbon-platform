/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  ImagePlaceholder,
  Svg12Stable,
  Svg14Download,
  Svg14License,
  Svg16Carbon
} from '@carbon-platform/icons'
import Link from 'next/link'
import slugify from 'slugify'

import FrameworkIcon from '@/components/framework-icon'
import SponsorTag from '@/components/sponsor-tag'
import { getSponsor, getStatus } from '@/utils/schema'

import styles from './catalog-grid.module.scss'

const CatalogGridItem = ({ assets = [] }) => {
  return assets.map((asset, i) => (
    <div className={styles.item} key={i}>
      <Link
        href={`/assets/${asset.params.slug}/latest/${slugify(asset.content.name, {
          lower: true
        })}`}
      >
        <a>
          <div className={styles.itemImage}>
            <ImagePlaceholder aria-label="Add" />
          </div>
          <SponsorTag className={styles.sponsorTag} sponsor={asset.params.sponsor} />
          <div className={styles.itemContent}>
            <p className={styles.itemSponsor}>{getSponsor(asset.params.sponsor)}</p>
            <header className={styles.itemName}>{asset.content.name}</header>
            <div className={styles.itemInfo}>
              <Svg14Download className={styles.itemDownloadsIcon} />
              <div className={styles.itemDownloads}>{asset.response.size}</div>
              <Svg14License className={styles.itemLicenseIcon} />
              <div className={styles.itemLicense}>{'Apache 2.0'}</div>
              <Svg16Carbon className={styles.itemVerifiedIcon} />
              <div className={styles.itemVerified}>{'Verified'}</div>
            </div>
            <footer className={styles.itemTags}>
              <div className={styles.itemStatus}>
                <Svg12Stable className={styles.itemStatusIcon} />
                {getStatus(asset.content.status)}
              </div>
              <div className={styles.itemFramework}>
                <FrameworkIcon framework={asset.content.framework} />
              </div>
            </footer>
          </div>
        </a>
      </Link>
    </div>
  ))
}

export default CatalogGridItem
