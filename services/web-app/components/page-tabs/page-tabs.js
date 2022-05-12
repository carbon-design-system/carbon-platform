/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Tab, TabList, Tabs } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './page-tabs.module.scss'

const PageTabs = ({ className, tabs = [] }) => {
  return (
    <Grid className={clsx(styles.container, className)} narrow>
      <Column sm={4} md={8} lg={12}>
        <Tabs>
          <TabList aria-label="List of tabs" className={styles['tab-list']}>
            {tabs.map((tab, i) => (
              <Tab key={i}>
                <a href={`${tab.name.toLowerCase()}`} className={styles.tab}>
                  {tab.name}
                </a>
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
