/* eslint-disable react/display-name */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

//  import Image from 'next/image'
import styles from './my-component.module.scss';
import { Add16, ArrowUpRight16, Carbon16, Download16, Scales16 } from '@carbon/icons-react';

  const ComponentCatalogItem = () => {
    return (
      <article className={styles.componentCatalogItem}>
        <div className={styles.componentCatalogItemImage}>
          {/* <Image
            src="/images/profile.jpg"
            height={144}
            width={144}
            alt={`hi`}
          /> */}
          <Add16 aria-label="Add" className="my-custom-class" />
        </div>
        <div className={styles.componentCatalogItemContent}>
          <p className={styles.componentCatalogItemSponsor}>
            Super Sponsor
            <ArrowUpRight16 aria-label="Add" className="my-custom-class" />
          </p>
          <header className={styles.componentCatalogItemName}>The best component ever</header>
          <p className={styles.componentCatalogItemDescription}>
            This component is so powerful. It's actually the best component in the world if you didn't know
          </p>
          <footer className={styles.componentCatalogItemInfo}>
            <div className={styles.componentCatalogItemStatus}>
              <Add16 aria-label="Add" className="my-custom-class" />
              Stable
            </div>
            <div className={styles.componentCatalogItemDownloads}>
              <Download16 aria-label="Add" className="my-custom-class" />
              1,234
            </div> 
            <div className={styles.componentCatalogItemLicense}>
              <Scales16 aria-label="Add" className="my-custom-class" />
              Apache 2.0
            </div> 
            <div className={styles.componentCatalogItemReviewed}>
              <Carbon16 aria-label="Add" className="my-custom-class" />
              Reviewed
            </div> 
          </footer>
        </div>
        <div className={styles.componentCatalogItemTags}>
          <div><Add16 aria-label="Add"/></div>
          <div><Add16 aria-label="Add"/></div>
        </div>
      </article>
    );
  }

export default ComponentCatalogItem;
