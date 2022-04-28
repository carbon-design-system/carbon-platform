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
  HeaderMenuItem,
  HeaderNavigation,
  SkipToContent,
  Theme
} from '@carbon/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import Footer from '@/components/footer'
import NavPrimary from '@/components/nav-primary'
import NavSecondary from '@/components/nav-secondary'
import NextLink from '@/components/next-link'
import { globalNavData } from '@/data/nav-data'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './layout.module.scss'

// Set path names here to prevent 1) the page from loading, 2) it setting nav data context, then
// 3) the side nav appearing. We know which paths will have side nav, so as an optimization,
// set that here.
const SIDE_NAV_PATHS = [
  '/about',
  '/assets',
  '/assets/components',
  '/assets/data-visualization',
  '/assets/design-kits',
  '/assets/functions',
  '/assets/libraries',
  '/assets/patterns',
  '/assets/templates',
  '/assets/[host]/[org]/[repo]/[library]/[ref]',
  '/assets/libraries',
  '/standards'
]

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const router = useRouter()
  const [primaryNavData, setPrimaryNavData] = useState([])
  const [secondaryNavData, setSecondaryNavData] = useState([])
  const [showSideNav, setShowSideNav] = useState(SIDE_NAV_PATHS.includes(router.pathname))

  useEffect(() => {
    setShowSideNav(
      !isEmpty(primaryNavData) ||
        !isEmpty(secondaryNavData) ||
        SIDE_NAV_PATHS.includes(router.pathname)
    )
  }, [primaryNavData, router.pathname, secondaryNavData])

  const value = {
    primaryNavData,
    setPrimaryNavData,
    secondaryNavData,
    setSecondaryNavData,
    showSideNav
  }

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

const SideNav = () => {
  const { secondaryNavData } = useContext(LayoutContext)
  const [showSecondaryNav, setShowSecondaryNav] = useState(!isEmpty(secondaryNavData))
  const [delayedShowSecondary, setDelayedShowSecondary] = useState(false)

  useEffect(() => {
    setShowSecondaryNav(!isEmpty(secondaryNavData))
  }, [secondaryNavData])

  useEffect(() => {
    setTimeout(() => {
      setDelayedShowSecondary(showSecondaryNav)
    }, 0)
  }, [showSecondaryNav])

  return (
    <Column sm={4} md={8} lg={4}>
      <section className={styles['side-nav']}>
        <Theme
          className={clsx(
            styles['side-nav-slide'],
            delayedShowSecondary && styles['side-nav-slide--secondary']
          )}
          theme="white"
        >
          <NavPrimary className={styles['side-nav-item']} globalItems={globalNavData} />
          <NavSecondary className={styles['side-nav-item']} />
        </Theme>
      </section>
    </Column>
  )
}

const Layout = ({ children }) => {
  const router = useRouter()
  const { showSideNav } = useContext(LayoutContext)
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

  return (
    <HeaderContainer
      render={() => (
        <>
          <Theme theme="g100">
            <Header aria-label="Carbon Design System" className={styles.header}>
              <SkipToContent />
              <div className={styles['header-name']}>
                <Link href="/">
                  <a className="cds--header__name">Carbon Design System</a>
                </Link>
              </div>
              <Grid narrow className={styles['header-grid']}>
                <Column sm={0} lg={{ span: 8, offset: 4 }}>
                  <HeaderNavigation aria-label="Main navigation">
                    {globalNavData.map((data) => (
                      <HeaderMenuItem
                        key={data.title}
                        isCurrentPage={data.path && router.pathname.startsWith(data.path)}
                        href={data.path}
                        element={NextLink}
                        className={clsx(!data.path && styles['header-nav-item-disabled'])}
                        tabIndex={!data.path ? -1 : 0}
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
              {showSideNav && <SideNav />}
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
