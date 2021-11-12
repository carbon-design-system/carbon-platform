/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, Column, Dropdown, Grid, InlineNotification, Toggle } from '@carbon/react'
import { Svg32GridLayout, Svg32ListLayout } from '@carbon-platform/icons'
import { useState } from 'react'

import CatalogGrid from '../catalog-grid'
import CatalogList from '../catalog-list'
import CatalogSearch from '../catalog-search'
import styles from '../catalog-sort/catalog-sort.module.scss'

const CatalogIndexPage = ({ data, type = 'component' }) => {
  const libraries = data.libraries
    .filter((library) => library.assets.length)
    .sort((a, b) =>
      a.content.name > b.content.name ? 1 : b.content.name > a.content.name ? -1 : 0
    )

  const assets = libraries
    .reduce((assets, library) => {
      return assets.concat(library.assets)
    }, [])
    .filter((asset) => asset.content.type === type)
    .sort((a, b) =>
      a.content.name > b.content.name ? 1 : b.content.name > a.content.name ? -1 : 0
    )

  const options = ['A-Z', 'Most used']

  const [layout, setLayout] = useState(false)
  console.log('hi', assets)

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <InlineNotification
          className={styles.inlineNotification}
          kind="info"
          title="Experimental component"
          subtitle="An accessibility review of this component is in progress"
          lowContrast
        />
        <CatalogSearch assets={assets} />
        <div className={styles.container}>
          <div className={styles.dropdownText}>
            <Dropdown
              id="component-index-sort"
              initialSelectedItem="Most used"
              items={options}
              light
              className={styles.dropdown}
              // onChange={({ selectedItem }) => {
              //   onChange(selectedItem);
              // }}
              type="inline"
              titleText="Sort by:"
              label="A-Z"
              size="lg"
            />
          </div>
          <div>
            <Toggle
              aria-label="toggle button"
              defaultToggled
              id="toggle-1"
              labelText="Carbon Reviewed:"
              className={styles.toggle}
              size="lg"
            />
          </div>
          <div className={styles.switcher}>
            <Button
              size="lg"
              kind="ghost"
              renderIcon={Svg32GridLayout}
              iconDescription="Grid view"
              hasIconOnly
              onClick={() => {
                setLayout(true)
              }}
            />
            <Button
              size="lg"
              kind="ghost"
              renderIcon={Svg32ListLayout}
              iconDescription="List view"
              hasIconOnly
              onClick={() => {
                setLayout(false)
              }}
            />
          </div>
        </div>
        {layout ? <CatalogGrid assets={assets} /> : <CatalogList assets={assets} />}
      </Column>
    </Grid>
  )
}

export default CatalogIndexPage
