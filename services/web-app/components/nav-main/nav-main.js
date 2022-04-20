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
        styles.sideNav,
        librarySideNav && libraryStyles.libraryNavIn,
        libraryNavSlideOut && libraryStyles.libraryNavOut
      )}
      aria-hidden={librarySideNav ? 'true' : 'false'}
    >
      <SideNavItems>
        <HeaderSideNavItems>
          {items.map((data, i) => (
            <>
              {data.path && (
                <SideNavLink
                  element={NextLink}
                  href={data.path}
                  key={i}
                  tabIndex={librarySideNav && '-1'}
                >
                  {data.title}
                </SideNavLink>
              )}
              {!data.path && (
                <SideNavLink tabIndex="-1" key={i} className={styles.sideNavDisabled}>
                  {data.title}
                </SideNavLink>
              )}
            </>
          ))}
        </HeaderSideNavItems>
        {navData.map((data, i) => {
          if (data.path && data.title) {
            return (
              <SideNavLink
                element={NextLink}
                href={data.path}
                isActive={router.pathname === data.path}
                key={i}
                tabIndex={librarySideNav && '-1'}
              >
                {data.title}
              </SideNavLink>
            )
          }
          if (!data.path && data.items) {
            return (
              <div key={i}>
                <h2 className={styles.sideNavHeading}>{data.title}</h2>
                {data.items.map((item, j) => (
                  <SideNavLink
                    element={NextLink}
                    href={item.path}
                    isActive={router.pathname.startsWith(item.path)}
                    key={j}
                    tabIndex={librarySideNav && '-1'}
                  >
                    {item.title}
                  </SideNavLink>
                ))}
              </div>
            )
          }
          return null
        })}
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
