/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ComponentCatalogItem from './ComponentCatalogItem'

// In this component we will map through the Component Catalog Items
const ComponentCatalog = () => {
  return (
    <section aria-label="Component Catalog">
      <ComponentCatalogItem />
    </section>
  )
}

export default ComponentCatalog
