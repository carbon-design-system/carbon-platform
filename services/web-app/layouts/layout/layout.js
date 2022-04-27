/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  Grid,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderNavigation,
  SkipToContent,
  Theme
} from '@carbon/react'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import Footer from '@/components/footer'
import NavLibrary from '@/components/nav-library'
import NavMain from '@/components/nav-main'
import NextLink from '@/components/next-link'
import { globalNavData } from '@/data/nav-data'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './layout.module.scss'

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const [navData, setNavData] = useState([])
  const [librarySideNav, setLibrarySideNav] = useState(false)
  const [isSideNavExpanded, toggleSideNavExpanded] = useState(false)
  const [libraryNavSlideOut, setLibraryNavSlideOut] = useState(false)

  const value = {
    navData,
    setNavData,
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

  const { navData, librarySideNav, setLibrarySideNav, isSideNavExpanded, toggleSideNavExpanded } =
    useContext(LayoutContext)

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
    setLibrarySideNav(router.pathname.startsWith('/assets/[host]/[org]/[repo]/[library]/[ref]'))
  }, [setLibrarySideNav, router.pathname])

  const onClickSideNavExpand = () => {
    toggleSideNavExpanded(!isSideNavExpanded)
  }

  const showSideNav = !isEmpty(navData) || !isLg

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

              <div className={styles['header-name']}>
                <Link href="/">
                  <a className="cds--header__name">Carbon Design System</a>
                </Link>
              </div>
              <Grid narrow className={styles['header-grid']}>
                <Column sm={0} lg={{ span: 8, offset: 4 }}>
                  <HeaderNavigation aria-label="Main navigation">
                    {globalNavData.map((data) => (
                      <>
                        {data.path && (
                          <HeaderMenuItem
                            key={data.title}
                            isCurrentPage={router.pathname.startsWith(data.path)}
                            href={data.path}
                            element={NextLink}
                          >
                            {data.title}
                          </HeaderMenuItem>
                        )}
                        {!data.path && (
                          <HeaderMenuItem
                            key={data.title}
                            tabIndex="-1"
                            className={styles['header-nav-item-disabled']}
                          >
                            {data.title}
                          </HeaderMenuItem>
                        )}
                      </>
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
                  <section className={styles['side-nav-container']}>
                    <Theme theme="white">
                      <NavMain items={globalNavData} />
                      {librarySideNav && <NavLibrary />}
                    </Theme>
                  </section>
                </Column>
              )}
              <Column sm={4} md={8} lg={showSideNav ? 12 : 16}>
                <Grid condensed={!isLg} narrow={isLg}>
                  <Column
                    className={styles['column-content']}
                    sm={4}
                    md={8}
                    lg={showSideNav ? 12 : 16}
                  >
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
