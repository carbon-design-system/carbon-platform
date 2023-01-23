/*
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './page-breadcrumb.module.scss'

const PageBreadcrumb = ({ className, items = [] }) => {
  return (
    <nav className={clsx(styles.container, className)} aria-label="Breadcrumb navigation">
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li className={styles.item} key={i}>
            {item.path && (
              <a href={item.path} className={clsx(styles.text, styles.link)}>
                {item.name}
              </a>
            )}
            {!item.path && <span className={styles.text}>{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

PageBreadcrumb.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  )
}

export default PageBreadcrumb
