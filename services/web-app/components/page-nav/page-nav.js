/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import styles from './page-nav.module.scss'

const PageNav = ({ className, items = [] }) => {
  const router = useRouter()

  return (
    <nav className={clsx(styles.container, className)}>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li className={styles.item} key={i}>
            {item.path && (
              <div>
                <Link href={item.path}>
                  <a
                    className={clsx(
                      styles.link,
                      router.asPath.includes(item.path) ? styles.linkActive : ''
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

PageNav.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  )
}

export default PageNav
