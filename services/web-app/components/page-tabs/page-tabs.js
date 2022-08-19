/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Tab, TabList, Tabs } from '@carbon/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import styles from './page-tabs.module.scss'

const createTabs = ({ tabs }) => {
  return tabs.map((tab, i) => {
    return (
      <Tab as="span" key={i}>
        <Link href={tab.path}>
          <a href={tab.path} className={styles['tab-link']}>
            {tab.name}
          </a>
        </Link>
      </Tab>
    )
  })
}

const getPathLeaf = (fullPath) => {
  // Get the last piece of the path without the query string
  return fullPath.split('/').pop().split('?')[0]
}

const PageTabs = ({ className, tabs = [] }) => {
  const router = useRouter()

  const currTabSlug = getPathLeaf(router.asPath)

  const currTabIndex = tabs.findIndex((tab) => getPathLeaf(tab.path) === currTabSlug)

  return (
    <Grid className={clsx(styles.container, className)} narrow>
      <Column sm={4} md={8} lg={12}>
        <Tabs defaultSelectedIndex={currTabIndex > 0 ? currTabIndex : 0}>
          <TabList aria-label="List of tabs" className={styles['tab-list']} selected>
            {createTabs({ tabs, pathPrefix: currTabSlug })}
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
