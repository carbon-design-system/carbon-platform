/* eslint-disable react/display-name */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

//  import Image from 'next/image'
import styles from './my-component.module.scss';
import { Svg12Stable, Svg14Download, Svg14License, Svg16Carbon, Svg10ArrowNorthwest } from "@/icons/index.js";
import { Add16, ArrowUpRight16 } from '@carbon/icons-react';

  const ComponentCatalogItem = () => {
    return (
      <article className={styles.componentCatalogItem}>
        <div className={styles.componentCatalogItemImage}>
          <Add16 aria-label="Add" className="my-custom-class" />
        </div>
        <div className={styles.componentCatalogItemContent}>
          <p className={styles.componentCatalogItemSponsor}>
            Super Sponsor
            <Svg10ArrowNorthwest />
          </p>
          <header className={styles.componentCatalogItemName}>The best component ever</header>
          <p className={styles.componentCatalogItemDescription}>
            This component is so powerful. It's actually the best component in the world if you didn't know
          </p>
          <footer className={styles.componentCatalogItemInfo}>
            <div className={styles.componentCatalogItemStatus}>
              <Svg12Stable className={styles.componentCatalogItemStatusIcon} />
              Stable
            </div>
            <div className={styles.componentCatalogItemDownloads}>
              <Svg14Download />
              1,234
            </div> 
            <div className={styles.componentCatalogItemLicense}>
              <Svg14License />
              Apache 2.0
            </div> 
            <div className={styles.componentCatalogItemReviewed}>
              <Svg16Carbon />
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
