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
// import { useCallback, useEffect } from 'react'
import { useEffect } from 'react'

// import useEventListener from '@/utils/use-event-listener'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './page-nav.module.scss'

const PageNav = ({ contentRef, items = [] }) => {
  const router = useRouter()
  const isLg = useMatchMedia(mediaQueries.lg)

  useEffect(() => {
    const handleRAF = () => {
      window.requestAnimationFrame(setSelectedItem)
    }

    window.addEventListener('scroll', handleRAF)
    return () => window.removeEventListener('scroll', handleRAF)
  })

  const setSelectedItem = () => {
    const navLinks = contentRef.current.querySelectorAll('[class^="page-nav_link"]')
    const sections = contentRef.current.querySelectorAll('[id]')

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTopDistance = section.getBoundingClientRect().top
      // Space between top of screen and where we want section to be "Active"
      const scrollDistance = 90
      if (
        // Setting active class when the top of the section is at the top
        // of the scree nand the bottom of the section is visible
        sectionTopDistance < scrollDistance &&
        sectionHeight + sectionTopDistance - scrollDistance > 0
      ) {
        navLinks.forEach((link) => {
          if (section.id === link.dataset.id) {
            link.classList.add(styles.linkActive)

            // Set url to current link as you scroll past
            // This works to set the url, but breaks
            // TODO - create issue?
            // This is broken
            // router.push(link.href, undefined, { shallow: true })
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
  }

  // const scrollHandler = useCallback(() => {
  //   // if (!contentRef && !contentRef.current) return
  //   const navLinks = contentRef.current.querySelectorAll('[class^="page-nav_link"]')
  //   const sections = contentRef.current.querySelectorAll('[id]')
  //   sections.forEach((section) => {
  //     const sectionHeight = section.offsetHeight
  //     const sectionTopDistance = section.getBoundingClientRect().top
  //     // Space between top of screen and where we want section to be "Active"
  //     const scrollDistance = 90
  //     if (
  //       // Setting active class when the top of the section is at the top
  //       // of the scree nand the bottom of the section is visible
  //       sectionTopDistance < scrollDistance &&
  //       sectionHeight + sectionTopDistance - scrollDistance > 0
  //     ) {
  //       navLinks.forEach((link) => {
  //         if (section.id === link.dataset.id) {
  //           link.classList.add(styles.linkActive)
  //           // Set url to current link as you scroll past

  //           // router.push(link.href, undefined, { shallow: true })
  //         }
  //       })
  //     } else {
  //       navLinks.forEach((link) => {
  //         if (section.id === link.dataset.id) {
  //           link.classList.remove(styles.linkActive)
  //         }
  //       })
  //     }
  //   })
  // }, [contentRef])

  // useEventListener('scroll', scrollHandler)

  // useEffect(() => {
  //   scrollHandler()
  //   console.log('contentRef: ', contentRef)
  // }, [contentRef, scrollHandler])

  //  }, [contentRef, scrollHandler])

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
                      data-id={item.id}
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
  contentRef: PropTypes.object,
  items: PropTypes.array
}

export default PageNav
