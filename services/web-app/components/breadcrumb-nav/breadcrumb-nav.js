/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Breadcrumb } from '@carbon/react'
import clsx from 'clsx'
import Link from 'next/link'

import styles from './breadcrumb-nav.module.scss'

const BreadcrumbNav = ({ libraryId, contentId, title, className }) => {
  return (
    <Breadcrumb className={clsx(styles.container, className)}>
      <div>
        {' '}
        <Link href={`/assets/${contentId}`}>
          <a className={styles.contentId}>{libraryId}</a>
        </Link>
      </div>
      <div className={styles.asset}>
        {title + ' let us pretend this is really really really long but I mean super supre long'}
      </div>
    </Breadcrumb>
  )
}

export default BreadcrumbNav
