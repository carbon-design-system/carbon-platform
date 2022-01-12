/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import BreadcrumbNav from '@/components/breadcrumb-nav'

import styles from './page-header.module.scss'

const PageHeader = ({ libraryId, contentId, title, pictogram: Pictogram }) => {
  return (
    <Grid className={styles.container}>
      <BreadcrumbNav
        className={styles.breadcrumb}
        libraryId={libraryId}
        contentId={contentId}
        title={title}
      />
      <Column className={styles.column} sm={4} md={6} lg={10}>
        <h1 className={styles.title}>{title}</h1>
      </Column>
      {Pictogram && (
        <Column className={clsx(styles.column, styles.columnLast)} sm={0} md={2} lg={2}>
          <Pictogram className={styles.pictogram} />
        </Column>
      )}
    </Grid>
  )
}

export default PageHeader
