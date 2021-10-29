/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import { Tag } from '@carbon/react'
import styles from './my-component.module.scss'
import {
  Svg12Stable,
  // Svg10ArrowNorthwest,
  Svg14Download,
  Svg14License,
  Svg16Carbon
  // Svg32TagCarbon
} from '@carbon-platform/icons'
import { Add16 } from '@carbon/icons-react'

const ComponentCatalogItemGrid = () => {
  return (
    <div className={styles.componentCatalogItemGridContainer}>
      <article className={styles.componentCatalogItemGrid}>
        <div className={styles.componentCatalogItemGridImage}>
          <Add16 aria-label="Add" className="my-custom-class" />
        </div>
        <div className={styles.componentCatalogItemGridContent}>
          <p className={styles.componentCatalogItemGridSponsor}>
            {'Super Sponsor'}
            {/* <Svg10ArrowNorthwest className={styles.componentCatalogItemGridSponsorIcon} /> */}
          </p>
          <header className={styles.componentCatalogItemGridName}>
            {'The best component ever'}
          </header>
          <footer className={styles.componentCatalogItemGridInfo}>
            <Svg14Download className={styles.componentCatalogItemGridDownloadsIcon} />
            <div className={styles.componentCatalogItemGridDownloads}>{'1,234'}</div>
            <Svg14License className={styles.componentCatalogItemGridLicenseIcon} />
            <div className={styles.componentCatalogItemGridLicense}>{'Apache 2.0'}</div>
            <Svg16Carbon className={styles.componentCatalogItemGridReviewedIcon} />
            <div className={styles.componentCatalogItemGridReviewed}>{'Reviewed'}</div>
          </footer>
          <div className={styles.componentCatalogItemGridStatus}>
            <Svg12Stable className={styles.componentCatalogItemGridStatusIcon} />
            {'Stable'}
          </div>
        </div>
        {/* <div className={styles.componentCatalogItemGridTags}>
          <Tag aria-hidden="true">{'Design only'}</Tag>
          <Svg32TagCarbon className={styles.componentCatalogItemGridTagsSponsor} />
        </div> */}
      </article>
      <article className={styles.componentCatalogItemGrid}>
        <div className={styles.componentCatalogItemGridImage}>
          <Add16 aria-label="Add" className="my-custom-class" />
        </div>
        <div className={styles.componentCatalogItemGridContent}>
          <p className={styles.componentCatalogItemGridSponsor}>
            {'Super Sponsor'}
            {/* <Svg10ArrowNorthwest className={styles.componentCatalogItemGridSponsorIcon} /> */}
          </p>
          <header className={styles.componentCatalogItemGridName}>
            {'The best component ever'}
          </header>
          <footer className={styles.componentCatalogItemGridInfo}>
            <Svg14Download className={styles.componentCatalogItemGridDownloadsIcon} />
            <div className={styles.componentCatalogItemGridDownloads}>{'1,234'}</div>
            <Svg14License className={styles.componentCatalogItemGridLicenseIcon} />
            <div className={styles.componentCatalogItemGridLicense}>{'Apache 2.0'}</div>
            <Svg16Carbon className={styles.componentCatalogItemGridReviewedIcon} />
            <div className={styles.componentCatalogItemGridReviewed}>{'Reviewed'}</div>
          </footer>
          <div className={styles.componentCatalogItemGridStatus}>
            <Svg12Stable className={styles.componentCatalogItemGridStatusIcon} />
            {'Stable'}
          </div>
        </div>
        {/* <div className={styles.componentCatalogItemGridTags}>
          <Tag aria-hidden="true">{'Design only'}</Tag>
          <Svg32TagCarbon className={styles.componentCatalogItemGridTagsSponsor} />
        </div> */}
      </article>
      <article className={styles.componentCatalogItemGrid}>
        <div className={styles.componentCatalogItemGridImage}>
          <Add16 aria-label="Add" className="my-custom-class" />
        </div>
        <div className={styles.componentCatalogItemGridContent}>
          <p className={styles.componentCatalogItemGridSponsor}>
            {'Super Sponsor'}
            {/* <Svg10ArrowNorthwest className={styles.componentCatalogItemGridSponsorIcon} /> */}
          </p>
          <header className={styles.componentCatalogItemGridName}>
            {'The best component ever'}
          </header>
          <footer className={styles.componentCatalogItemGridInfo}>
            <Svg14Download className={styles.componentCatalogItemGridDownloadsIcon} />
            <div className={styles.componentCatalogItemGridDownloads}>{'1,234'}</div>
            <Svg14License className={styles.componentCatalogItemGridLicenseIcon} />
            <div className={styles.componentCatalogItemGridLicense}>{'Apache 2.0'}</div>
            <Svg16Carbon className={styles.componentCatalogItemGridReviewedIcon} />
            <div className={styles.componentCatalogItemGridReviewed}>{'Reviewed'}</div>
          </footer>
          <div className={styles.componentCatalogItemGridStatus}>
            <Svg12Stable className={styles.componentCatalogItemGridStatusIcon} />
            {'Stable'}
          </div>
        </div>
        {/* <div className={styles.componentCatalogItemGridTags}>
          <Tag aria-hidden="true">{'Design only'}</Tag>
          <Svg32TagCarbon className={styles.componentCatalogItemGridTagsSponsor} />
        </div> */}
      </article>
    </div>
  )
}

export default ComponentCatalogItemGrid
