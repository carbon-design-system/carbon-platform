/* eslint-disable @next/next/no-img-element */
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
  Svg16Carbon,
  Svg24Angular,
  Svg24CarbonTag,
  Svg24IbmDotcomTag,
  Svg24React,
  Svg24Vanilla,
  Svg24Vue
} from '@carbon-platform/icons'
import Link from 'next/link'
import slugify from 'slugify'

import { getSponsor, getStatus } from '@/utils/schema'

import styles from './catalog-list.module.scss'

const CatalogList = ({ assets = [] }) => {
  return (
    <ul>
      {assets.map((asset, i) => (
        <li className={styles.item} key={i}>
          <Link
            href={`/assets/${asset.params.slug}/latest/${slugify(asset.content.name, {
              lower: true
            })}`}
          >
            <a className={styles.itemInner}>
              <div className={styles.itemImage}>
                <ImagePlaceholder aria-label="Add" />
              </div>
              <div className={styles.itemContent}>
                <p className={styles.itemSponsor}>{getSponsor(asset.params.sponsor)}</p>
                <header className={styles.itemName}>{asset.content.name}</header>
                <p className={styles.itemDescription}>{asset.content.description}</p>
                <footer className={styles.itemInfo}>
                  <Svg12Stable className={styles.itemStatusIcon} />
                  <div className={styles.itemStatus}>{getStatus(asset.content.status)}</div>
                  <Svg14Download className={styles.itemDownloadsIcon} />
                  <div className={styles.itemDownloads}>{asset.response.size}</div>
                  <Svg14License className={styles.itemLicenseIcon} />
                  <div className={styles.itemLicense}>{'Apache 2.0'}</div>
                  <Svg16Carbon className={styles.itemVerifiedIcon} />
                  <div className={styles.itemVerified}>{'Verified'}</div>
                </footer>
              </div>
              <div className={styles.itemTags}>
                {asset.content.framework === 'angular'
                  ? (
                  <Svg24Angular />
                    )
                  : asset.content.framework === 'react'
                    ? (
                  <Svg24React />
                      )
                    : asset.content.framework === 'vanilla'
                      ? (
                  <Svg24Vanilla />
                        )
                      : asset.content.framework === 'vue'
                        ? (
                  <Svg24Vue />
                          )
                        : (
                  <Svg24React />
                          )}
                {asset.params.sponsor === 'carbon'
                  ? (
                  <div className={styles.itemTagBorder}>
                    <Svg24CarbonTag className={styles.itemTagsSponsor} />
                  </div>
                    )
                  : asset.params.sponsor === 'ibm-dotcom'
                    ? (
                  <div className={styles.itemTagBorder}>
                    <Svg24IbmDotcomTag className={styles.itemTagsSponsor} />
                  </div>
                      )
                    : null}
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default CatalogList
