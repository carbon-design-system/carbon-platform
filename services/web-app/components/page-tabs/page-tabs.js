/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Tab, TabList, Tabs } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './page-tabs.module.scss'

const PageTabs = ({ tabs = [] }) => {
  return (
    <Grid className={styles.container} narrow>
      <Column sm={4} md={8} lg={12}>
        <Tabs>
          <TabList aria-label="List of tabs" className={styles.tabList}>
            {tabs.map((tab, i) => (
              <Tab href={tab.path} key={i}>
                {tab.name}
              </Tab>
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
      path: PropTypes.string
    })
  )
}

export default PageTabs
