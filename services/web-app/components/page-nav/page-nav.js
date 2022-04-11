/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'

import useEventListener from '@/utils/use-event-listener'

import styles from './page-nav.module.scss'

const PageNav = ({ contentRef, items = [] }) => {
  const [lastActiveLink, setLastActiveLink] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const handleRAF = () => {
    if (!activeItem || (!checkIfSectionIdIsActive(activeItem) && lastActiveLink === activeItem)) {
      window.requestAnimationFrame(setSelectedItem)
    }
  }

  const handleHashChange = useCallback(() => {
    const hash = window?.location?.hash?.replace('#', '') ?? null
    setActiveItem(hash)
    checkIfSectionIdIsActive(hash)
  }, [])

  useEventListener('scroll', handleRAF)
  useEventListener('hashchange', handleHashChange)

  useEffect(() => {
    handleHashChange()
    const hash = window?.location?.hash
    // account for race condition on browser when ids haven't been set yet
    if (hash) {
      requestAnimationFrame(() => {
        contentRef.current?.querySelector(hash)?.scrollIntoView(true)
      })
    }
  }, [handleHashChange, contentRef])

  const checkIfSectionIdIsActive = (id) => {
    const section = document.getElementById(id)
    if (!section) return false
    const sectionHeight = section.offsetHeight
    const sectionBoundingClientRect = section.getBoundingClientRect()
    const sectionTopDistance = sectionBoundingClientRect.top
    // Space between top of screen and where we want section to be "active"
    const scrollDistance = 90
    const sectionIsAtTheTopOfTheView =
      sectionTopDistance < scrollDistance && sectionHeight + sectionTopDistance - scrollDistance > 0

    const sectionIsInView =
      sectionBoundingClientRect.top >= 0 &&
      sectionBoundingClientRect.left >= 0 &&
      sectionBoundingClientRect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      sectionBoundingClientRect.right <= (window.innerWidth || document.documentElement.clientWidth)

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

  const setActiveLink = (link) => {
    // Set url to current link as you scroll past
    history.replaceState(null, null, `#${link.dataset.id}`)
    setActiveItem(link.dataset.id)
  }

  const removeActiveLink = (link) => {
    if (activeItem === link.dataset.id) {
      setActiveItem(null)
      history.replaceState(null, null, window.location.pathname + window.location.search)
    }
  }

  const setSelectedItem = () => {
    const navLinks = Array.from(contentRef.current.querySelectorAll('[class^="page-nav_link"]'))
    const sections = Array.from(contentRef.current.querySelectorAll('[id]'))?.filter((section) =>
      items.some((item) => item.id === section.id)
    )

    let activeSection = null
    // Space between top of screen and where we want section to be "Active"
    const scrollDistance = 90

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTopDistance = section.getBoundingClientRect().top
      if (
        // Setting active class when the top of the section is at the top
        // of the screen and the bottom of the section is visible
        sectionTopDistance < scrollDistance &&
        sectionHeight + sectionTopDistance - scrollDistance > 0
      ) {
        activeSection = section
      }
    })

    navLinks.forEach((link) => {
      if (activeSection?.id === link.dataset.id) {
        setActiveLink(link)
      } else {
        removeActiveLink(link)
      }
    })
  }

  const handleLinkClicked = (id) => {
    history.replaceState(null, null, `#${id}`)
    handleHashChange()
    contentRef.current.querySelector(`#${id}`)?.scrollIntoView(true)
  }

  return (
    <Grid narrow className={styles.container}>
      <Column sm={4} md={8} lg={4}>
        <nav aria-label="Page navigation">
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li className={styles.item} key={i}>
                {item.id && (
                  <span
                    data-id={item.id}
                    className={clsx(
                      styles.link,
                      activeItem === item.id || (!activeItem && i === 0) ? styles.linkActive : ''
                    )}
                    onClick={() => handleLinkClicked(item.id)}
                    onKeyDown={() => handleLinkClicked(item.id)}
                    role="link"
                    tabIndex="0"
                  >
                    {item.title}
                  </span>
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
