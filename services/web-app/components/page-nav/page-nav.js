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

const PageNav = ({ contentRef, items = [], scrollTopDistance = 120 }) => {
  const [lastActiveLink, setLastActiveLink] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const getSectionBoundingClient = useCallback(
    (section) => {
      const readOnlyBoundingClientRect = section.getBoundingClientRect()
      const boundingClientRect = {
        top: readOnlyBoundingClientRect.top,
        bottom: readOnlyBoundingClientRect.bottom,
        height: readOnlyBoundingClientRect.height,
        width: readOnlyBoundingClientRect.width,
        x: readOnlyBoundingClientRect.x,
        y: readOnlyBoundingClientRect.y,
        left: readOnlyBoundingClientRect.left,
        right: readOnlyBoundingClientRect.right
      }
      const sectionItemIndex = items.findIndex((item) => item.id === section.id)
      if (sectionItemIndex || sectionItemIndex === 0) {
        if (sectionItemIndex < items.length - 1) {
          boundingClientRect.bottom = document
            .getElementById(items[sectionItemIndex + 1].id)
            ?.getBoundingClientRect()?.top
        } else {
          const body = document.body
          const html = document.documentElement

          boundingClientRect.bottom = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          )
        }
        boundingClientRect.height = boundingClientRect.bottom - boundingClientRect.top
      }
      return boundingClientRect
    },
    [items]
  )

  const checkIfSectionIdIsActive = useCallback(
    (id) => {
      const section = document.getElementById(id)
      if (!section) return false
      const sectionBoundingClientRect = getSectionBoundingClient(section)
      const sectionHeight = sectionBoundingClientRect.height
      const sectionTopDistance = sectionBoundingClientRect.top
      // Space between top of screen and where we want section to be "active"
      const scrollDistance = scrollTopDistance
      const sectionIsAtTheTopOfTheView =
        sectionTopDistance < scrollDistance &&
        sectionHeight + sectionTopDistance - scrollDistance > 0

      const sectionIsInView =
        sectionBoundingClientRect.top >= 0 &&
        sectionBoundingClientRect.left >= 0 &&
        sectionBoundingClientRect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        sectionBoundingClientRect.right <=
          (window.innerWidth || document.documentElement.clientWidth)

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
    },
    [getSectionBoundingClient, scrollTopDistance]
  )

  const handleRAF = () => {
    if (!activeItem || (!checkIfSectionIdIsActive(activeItem) && lastActiveLink === activeItem)) {
      window.requestAnimationFrame(setSelectedItem)
    }
  }

  const handleHashChange = useCallback(() => {
    const hash = window?.location?.hash?.replace('#', '') ?? null
    setActiveItem(hash)
    checkIfSectionIdIsActive(hash)
  }, [checkIfSectionIdIsActive])

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

  const setActiveLink = (link) => {
    // Set url to current link as you scroll past
    history.replaceState(null, null, `#${link.dataset.id}`)
    setActiveItem(link.dataset.id)
  }

  const removeActiveLink = () => {
    setActiveItem(null)
    history.replaceState(null, null, window.location.pathname + window.location.search)
  }

  const handleLinkClick = (id) => {
    history.replaceState(null, null, `#${id}`)
    handleHashChange()
    contentRef.current?.querySelector(`#${id}`)?.scrollIntoView(true)
  }

  const setSelectedItem = () => {
    const navLinks = Array.from(
      contentRef.current?.querySelectorAll('[class^="page-nav_link"]') ?? []
    )
    const sections = Array.from(contentRef.current?.querySelectorAll('[id]') ?? [])?.filter(
      (section) => items.some((item) => item.id === section.id)
    )

    let activeSection = null
    // Space between top of screen and where we want section to be "Active"
    const scrollDistance = scrollTopDistance

    sections.forEach((section) => {
      const sectionBoundingClientRect = getSectionBoundingClient(section)
      const sectionHeight = sectionBoundingClientRect.height
      const sectionTopDistance = sectionBoundingClientRect.top

      if (
        // Setting active class when the top of the section is at the top
        // of the screen and the bottom of the section is visible
        sectionTopDistance < scrollDistance &&
        sectionHeight + sectionTopDistance - scrollDistance > 0
      ) {
        activeSection = section
      }
    })

    const activeLink = navLinks.find((link) => link.dataset.id === activeSection?.id)

    if (activeLink) {
      setActiveLink(activeLink)
    } else {
      removeActiveLink()
    }
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
                      activeItem === item.id || (!activeItem && i === 0)
                        ? styles['link-active']
                        : ''
                    )}
                    onClick={() => handleLinkClick(item.id)}
                    onKeyDown={() => handleLinkClick(item.id)}
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
  items: PropTypes.array,
  scrollTopDistance: PropTypes.number
}

export default PageNav
