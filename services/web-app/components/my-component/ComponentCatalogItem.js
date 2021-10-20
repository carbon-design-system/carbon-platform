/* eslint-disable react/display-name */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import placeholder from './images/placeholder.svg';
import styles from "./my-component.module.scss";

  const ComponentCatalogItem = () => {
    return (
      <article className={styles.componentCatalogItem}>
        <div className={styles.componentCatalogItemImage}>
          <img src={placeholder} alt={`Placeholder for the Test component`} />
        </div>
      </article>
    );
  }

export default ComponentCatalogItem;
