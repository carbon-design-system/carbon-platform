/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HeaderSideNavItems, SideNav, SideNavItems, SideNavLink } from '@carbon/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useContext } from 'react'

import libraryStyles from '@/components/nav-library/nav-library.module.scss'
import NextLink from '@/components/next-link'
import { LayoutContext } from '@/layouts/layout'

import NavTree from '../nav-tree'
import styles from './nav-main.module.scss'

const NavMain = ({ items = [] }) => {
  const router = useRouter()
  const { librarySideNav, isSideNavExpanded, libraryNavSlideOut, navData } =
    useContext(LayoutContext)

  return (
    <SideNav
      aria-label="Side navigation"
      expanded={isSideNavExpanded}
      className={clsx(
        styles['side-nav'],
        librarySideNav && libraryStyles['library-nav-in'],
        libraryNavSlideOut && libraryStyles['library-nav-out']
      )}
      aria-hidden={librarySideNav ? 'true' : 'false'}
    >
      <SideNavItems>
        <HeaderSideNavItems>
          {items.map((data, i) => {
            if (data.path) {
              return (
                <SideNavLink
                  element={NextLink}
                  href={data.path}
                  key={i}
                  tabIndex={librarySideNav ? '-1' : 0}
                >
                  {data.title}
                </SideNavLink>
              )
            } else {
              return (
                <SideNavLink tabIndex="-1" key={i} className={styles['side-nav-disabled']}>
                  {data.title}
                </SideNavLink>
              )
            }
          })}
        </HeaderSideNavItems>
        <NavTree
          items={navData}
          label="Main navigation"
          activeItem={router.asPath.substring(router.asPath.lastIndexOf('/') + 1)}
        />
      </SideNavItems>
    </SideNav>
  )
}

NavMain.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  )
}

export default NavMain
