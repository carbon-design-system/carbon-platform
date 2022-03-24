/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './page-nav.module.scss'

const PageNav = ({ items = [] }) => {
  const router = useRouter()
  const isLg = useMatchMedia(mediaQueries.lg)

  return (
    <Grid narrow={isLg} className={styles.container}>
      <Column sm={4} md={8} lg={4}>
        <nav aria-label="Page navigation">
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li className={styles.item} key={i}>
                {item.id && (
                  <Link href={`#${item.id}`}>
                    <a
                      className={clsx(
                        styles.link,
                        router.asPath.includes(item.id) ? styles.linkActive : ''
                      )}
                    >
                      {item.title}
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Column>
    </Grid>
  )
}

PageNav.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string
    })
  )
}

export default PageNav
