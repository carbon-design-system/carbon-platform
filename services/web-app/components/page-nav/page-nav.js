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

const PageNav = ({ items = [], contentRef }) => {
  const router = useRouter()
  const isLg = useMatchMedia(mediaQueries.lg)

  // const navLinks = contentRef.current.querySelectorAll('[class^="page-nav_link"]')
  // console.log(navLinks)

  // const contentAreas = contentRef.current.querySelectorAll('[id]')

  // console.log(contentAreas[2].id)

  const allNavLinks = contentRef.current.querySelectorAll('[class^="page-nav_link"]')
  const navLinks = []
  allNavLinks.forEach((element) => {
    navLinks.push({
      id: element.getAttribute('data-id')
    })
  })
  console.log('nav links', navLinks)

  const allContentSections = contentRef.current.querySelectorAll('[id]')
  const contentSections = []
  allContentSections.forEach((element) => {
    contentSections.push({
      id: element.getAttribute('id')
    })
  })
  console.log('content sections', contentSections)
  console.log('content section 1 id: ', contentSections[0].id)

  // if the content section id is visible then set the active class for the link with the same

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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string
    })
  )
}

export default PageNav
