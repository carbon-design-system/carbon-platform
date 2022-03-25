/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useCallback, useEffect } from 'react'

import useEventListener from '@/utils/use-event-listener'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './page-nav.module.scss'

const PageNav = ({ contentRef, items = [] }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  const navLinks = contentRef.current.querySelectorAll('[class^="page-nav_link"]')
  const sections = contentRef.current.querySelectorAll('[id]')

  const scrollHandler = useCallback(() => {
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTopDistance = section.getBoundingClientRect().top
      const scrollDistance = 90

      if (
        sectionTopDistance < scrollDistance &&
        sectionHeight + sectionTopDistance - scrollDistance > 0
      ) {
        navLinks.forEach((link) => {
          if (section.id === link.dataset.id) {
            link.classList.add(styles.linkActive)
          }
        })
      } else {
        navLinks.forEach((link) => {
          if (section.id === link.dataset.id) {
            link.classList.remove(styles.linkActive)
          }
        })
      }
    })
  })

  useEventListener('scroll', scrollHandler)
  useEffect(() => {
    scrollHandler()
  }, [scrollHandler])

  return (
    <Grid narrow={isLg} className={styles.container}>
      <Column sm={4} md={8} lg={4}>
        <nav aria-label="Page navigation">
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li className={styles.item} key={i}>
                {item.id && (
                  <a href={`#${item.id}`} data-id={item.id} className={clsx(styles.link)}>
                    {item.title}
                  </a>
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
  contentRef: PropTypes.object,
  items: PropTypes.array
}

export default PageNav
