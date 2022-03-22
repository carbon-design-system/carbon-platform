/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Tab, Tabs, unstable_TabList as TabList } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './page-tabs.module.scss'

const PageTabs = ({ pageTabs = [] }) => {
  return (
    <Grid className={styles.container}>
      <Column sm={4} md={8} lg={12}>
        <Tabs>
          <TabList aria-label="List of tabs" className={styles.tabList}>
            {pageTabs.map((pageTab, i) => (
              <Tab key={i}>{pageTab}</Tab>
            ))}
          </TabList>
        </Tabs>
      </Column>
    </Grid>
  )
}

PageTabs.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  )
}

export default PageTabs
