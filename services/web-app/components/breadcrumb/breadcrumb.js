/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import Link from 'next/link'

import styles from './breadcrumb.module.scss'

const Breadcrumb = ({ libraryId, contentId, title, className }) => {
  return (
    <nav className={clsx(styles.container, className)}>
      <ol>
        <li>
          <Link href={`/assets/${contentId}`}>
            <a className={styles.contentId}>{libraryId}</a>
          </Link>
        </li>
        <li>
          <div className={styles.asset}>{title}</div>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb
