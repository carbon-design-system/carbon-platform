/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Tab, TabList, Tabs } from '@carbon/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import slugify from 'slugify'

import styles from './page-tabs.module.scss'

const PageTabs = ({ className, tabs = [] }) => {
  const router = useRouter()

  const currTabSlug = router.asPath.split('/').pop()

  const currTabIndex = tabs.findIndex(
    (tab) => slugify(tab.name, { strict: true, lower: true }) === currTabSlug
  )

  return (
    <Grid className={clsx(styles.container, className)} narrow>
      <Column sm={4} md={8} lg={12}>
        <Tabs defaultSelectedIndex={currTabIndex > 0 ? currTabIndex : 0}>
          <TabList aria-label="List of tabs" className={styles['tab-list']} selected>
            {tabs.map((tab, i) => (
              <Tab as="a" href={tab.path} key={i}>
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
