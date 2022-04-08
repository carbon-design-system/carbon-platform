/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Button,
  Column,
  Grid,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
  Theme
} from '@carbon/react'
import { ArrowLeft } from '@carbon/react/icons'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import Footer from '@/components/footer'
import NavTree from '@/components/nav-tree'
import NextLink from '@/components/next-link'
import { globalNavData, libraryNavData } from '@/data/nav-data'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './layout.module.scss'

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const [navData, setNavData] = useState([])
  const [showSideNav, setShowSideNav] = useState(true)
  const [librarySideNav, setLibrarySideNav] = useState(false)
  const [isSideNavExpanded, toggleSideNavExpanded] = useState(false)
  const [libraryNavSlideOut, setLibraryNavSlideOut] = useState(false)

  const value = {
    navData,
    setNavData,
    showSideNav,
    setShowSideNav,
    librarySideNav,
    setLibrarySideNav,
    isSideNavExpanded,
    toggleSideNavExpanded,
    libraryNavSlideOut,
    setLibraryNavSlideOut
  }

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

const Layout = ({ children }) => {
  const router = useRouter()

  const {
    navData,
    setShowSideNav,
    showSideNav,
    librarySideNav,
    setLibrarySideNav,
    isSideNavExpanded,
    toggleSideNavExpanded,
    libraryNavSlideOut,
    setLibraryNavSlideOut
  } = useContext(LayoutContext)

  const isLg = useMatchMedia(mediaQueries.lg)

  // For use with 100vw widths to account for the scrollbar width, e.g. instead of `width: 100vw;`
  // use `width: calc(100vw - var(--scrollbar-width));`.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        window.innerWidth - document.documentElement.clientWidth + 'px'
      )
    }
  }, [])

  useEffect(() => {
    setShowSideNav(
      !router.pathname.startsWith('/assets/[host]/[org]/[repo]/[library]/[ref]/[asset]')
    )
    setLibrarySideNav(router.pathname.startsWith('/assets/[host]/[org]/[repo]/[library]/[ref]'))
    setLibraryNavSlideOut(false)
  }, [setShowSideNav, setLibrarySideNav, setLibraryNavSlideOut, router.pathname])

  const onClickSideNavExpand = () => {
    toggleSideNavExpanded(!isSideNavExpanded)
  }

  const backLink = () => {
    setLibraryNavSlideOut(true)
    setTimeout(() => router.push('/assets/libraries'), 150)
  }

  return (
    <HeaderContainer
      render={() => (
        <>
          <Theme theme="g100">
            <Header aria-label="Carbon Design System" className={styles.header}>
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />

              <div className={styles.headerName}>
                <Link href="/assets">
                  <a className="cds--header__name">Carbon Design System</a>
                </Link>
              </div>
              <Grid narrow className={styles.headerGrid}>
                <Column sm={0} lg={{ span: 8, offset: 4 }}>
                  <HeaderNavigation
                    aria-label="Main navigation"
                    className={styles.headerNavigation}
                  >
                    {globalNavData.map((data) => (
                      <HeaderMenuItem
                        key={data.path}
                        isCurrentPage={router.pathname.startsWith(data.path)}
                        href={data.path}
                        element={NextLink}
                      >
                        {data.title}
                      </HeaderMenuItem>
                    ))}
                  </HeaderNavigation>
                </Column>
              </Grid>
            </Header>
          </Theme>
          <Theme className={styles.body} theme="g10">
            <Grid as="main" className={styles.main} id="main-content">
              {showSideNav && (
                <Column sm={4} md={8} lg={4}>
                  <Theme theme="white">
                    <SideNav
                      aria-label="Side navigation"
                      expanded={isSideNavExpanded}
                      className={styles.sideNav}
                      aria-hidden={librarySideNav ? 'true' : 'false'}
                    >
                      <SideNavItems>
                        <HeaderSideNavItems>
                          {globalNavData.map((data, i) => (
                            <SideNavLink
                              element={NextLink}
                              href={data.path}
                              key={i}
                              tabIndex={librarySideNav && '-1'}
                            >
                              {data.title}
                            </SideNavLink>
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

                    {librarySideNav && (
                      <SideNav
                        aria-label="Library side navigation"
                        expanded={isSideNavExpanded}
                        className={clsx(
                          styles.libraryNav,
                          libraryNavSlideOut && styles.libraryNavOut
                        )}
                      >
                        <Button kind="ghost" onClick={backLink} className={styles.back}>
                          <ArrowLeft className={styles.backIcon} size={16} />
                          Back to all Libraries
                        </Button>
                        <h2 className={clsx(styles.navHeading, styles.navHeadingSelected)}>
                          {/* {seo.title} */}
                          <br />
                          {/* {`v${libraryData.content.version}`} */}
                        </h2>
                        <NavTree items={libraryNavData} label="Library navigation" />
                      </SideNav>
                    )}
                  </Theme>
                </Column>
              )}
              <Column sm={4} md={8} lg={showSideNav ? 12 : 16}>
                <Grid condensed={!isLg} narrow={isLg}>
                  <Column className={styles.columnContent} sm={4} md={8} lg={showSideNav ? 12 : 16}>
                    {children}
                  </Column>
                </Grid>
              </Column>
            </Grid>
          </Theme>
          <Footer hasSideNav={showSideNav} />
        </>
      )}
    />
  )
}

export default Layout
