/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react';
import ComponentCatalog from "./ComponentCatalog";
import styles from "./my-component.module.scss";

const ComponentCatalogIndexPage = () => { 
  return (
    <Grid>
      <Column lg={16} md={8} sm={4} className={styles.componentCatalogIndexContainer}>
        <ComponentCatalog />
      </Column>
    </Grid>
  )
}

export default ComponentCatalogIndexPage;
