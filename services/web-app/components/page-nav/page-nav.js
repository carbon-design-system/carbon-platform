/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './page-nav.module.scss'

const PageNav = ({ contentRef, items = [] }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  const [lastActiveLink, setLastActiveLink] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    const handleRAF = () => {
      if (!activeItem || (!checkIfSectionIdIsActive(activeItem) && lastActiveLink === activeItem)) {
        window.requestAnimationFrame(setSelectedItem)
      }
    }

    window.addEventListener('scroll', handleRAF)
    return () => window.removeEventListener('scroll', handleRAF)
  })

  const refreshHash = () => {
    const hash = window?.location?.hash?.replace('#', '') ?? null
    setActiveItem(hash)
    checkIfSectionIdIsActive(hash)
  }

  useEffect(() => {
    const handleHashChange = () => {
      refreshHash()
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  })

  useEffect(() => {
    refreshHash()
  }, [refreshHash])

  const checkIfSectionIdIsActive = (id) => {
    const section = document.getElementById(id)
    if (!section) return false
    const sectionHeight = section.offsetHeight
    const sectionBoundingClientRect = section.getBoundingClientRect()
    const sectionTopDistance = sectionBoundingClientRect.top
    // Space between top of screen and where we want section to be "Active"
    const scrollDistance = 90
    const sectionIsAtTheTopOfTheView =
      sectionTopDistance < scrollDistance && sectionHeight + sectionTopDistance - scrollDistance > 0

    const sectionIsInView =
      sectionBoundingClientRect.top >= 0 &&
      sectionBoundingClientRect.left >= 0 &&
      sectionBoundingClientRect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
      sectionBoundingClientRect.right <=
        (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */

    const bottomReached =
      document.documentElement.scrollTop + document.documentElement.clientHeight ===
      document.documentElement.scrollHeight

    const sectionActive = sectionIsAtTheTopOfTheView || (sectionIsInView && bottomReached)

    if (sectionActive) {
      setLastActiveLink(id)
    } else {
      setLastActiveLink(null)
    }
    return sectionActive
  }

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
            history.pushState(null, null, link.href)
            setActiveItem(link.href.split('#')[1])
          }
        })
      } else {
        navLinks.forEach((link) => {
          if (section.id === link.dataset.id) {
            link.classList.remove(styles.linkActive)
            if (activeItem === section.id) {
              setActiveItem(null)
              history.pushState(null, null, window.location.pathname + window.location.search)
            }
          }
        })
      }
    })
  }

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
                      className={clsx(styles.link, activeItem === item.id ? styles.linkActive : '')}
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
