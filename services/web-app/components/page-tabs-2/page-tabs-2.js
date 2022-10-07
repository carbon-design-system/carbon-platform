/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import NextLink from '../next-link'
import styles from './page-tabs-2.module.scss'

const PageTabs2 = ({ title, tabs, className }) => {
  const router = useRouter()

  const getPathLeaf = (fullPath) => {
    // Get the last piece of the path without the query string
    return fullPath.split('/').pop().split('?')[0].split('#')[0]
  }

  const currTabSlug = getPathLeaf(router.asPath)

  const currTabIndex = tabs.findIndex((tab) => getPathLeaf(tab.path) === currTabSlug)

  const pageTabs = tabs.map((tab, index) => {
    return (
      <li
        key={tab}
        className={clsx({ [styles['selected-item']]: index === currTabIndex }, styles['list-item'])}
      >
        <NextLink className={styles.link} href={tab.path}>
          {tab.name}
        </NextLink>
      </li>
    )
  })

  return (
    <Grid className={clsx(styles.container, className)} narrow>
      <Column sm={4} md={8} lg={12}>
        <nav aria-label={title}>
          <ul className={styles.list}>{pageTabs}</ul>
        </nav>
      </Column>
    </Grid>
  )
}

export default PageTabs2

PageTabs2.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.array,
  title: PropTypes.title
}
