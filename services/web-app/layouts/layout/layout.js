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
  '/catalogs/components',
  '/catalogs/functions',
  '/catalogs/libraries',
  '/catalogs/patterns',
  '/catalogs/templates',
  '/collections/data-visualization',
  '/libraries',
  '/libraries/[host]/[org]/[repo]/[library]/[ref]',
  '/libraries/[host]/[org]/[repo]/[library]/[ref]/assets',
  '/libraries/[host]/[org]/[repo]/[library]/[ref]/design-kits',
  '/libraries/[host]/[org]/[repo]/[library]/[ref]/versions',
  '/design-kits',
  '/standards'
]

// Only slide to the secondary navigation on page load for these paths.
const SECONDARY_NAV_SLIDE_PATHS = ['/libraries/[host]/[org]/[repo]/[library]/[ref]']

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const [isSideNavExpanded, setSideNavExpanded] = useState(false)
  const [primaryNavData, setPrimaryNavData] = useState([])
  const [secondaryNavData, setSecondaryNavData] = useState([])

  const value = {
    isSideNavExpanded,
    setSideNavExpanded,
    primaryNavData,
    setPrimaryNavData,
    secondaryNavData,
    setSecondaryNavData
  }

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

const SideNav = () => {
  const router = useRouter()
  const { secondaryNavData } = useContext(LayoutContext)

  const isSecondarySlidePath = SECONDARY_NAV_SLIDE_PATHS.includes(router.pathname)
  const hasSecondaryNavData = !isEmpty(secondaryNavData)

  // Initially show if there's secondary nav data and it's not a slide path
  const [showSecondaryNav, setShowSecondaryNav] = useState(
    hasSecondaryNavData && !isSecondarySlidePath
  )

  // Wait a render cycle before adding the class name to slide to the secondary nav
  useEffect(() => {
    setTimeout(() => {
      setShowSecondaryNav(hasSecondaryNavData || isSecondarySlidePath)
    }, 0)
  }, [hasSecondaryNavData, isSecondarySlidePath])

  const handleSlidePrimary = () => {
    setShowSecondaryNav(false)
  }

  const cnSlide = clsx(styles['side-nav-slide'], {
    [styles['side-nav-slide--secondary']]: showSecondaryNav
  })

  return (
    <Column sm={4} md={8} lg={4}>
      <Theme theme="white">
        <section className={styles['side-nav']}>
          <div className={styles['side-nav-inner']}>
            <div className={cnSlide}>
              <NavPrimary className={styles['side-nav-item']} globalItems={globalNavData} />
              <NavSecondary
                className={styles['side-nav-item']}
                onSlidePrimary={handleSlidePrimary}
              />
            </div>
          </div>
        </section>
      </Theme>
    </Column>
  )
}

const Layout = ({ children }) => {
  const router = useRouter()
  const { isSideNavExpanded, setSideNavExpanded, primaryNavData, secondaryNavData } =
    useContext(LayoutContext)
  const isLg = useMatchMedia(mediaQueries.lg)
  const [showSideNav, setShowSideNav] = useState(SIDE_NAV_PATHS.includes(router.pathname))

  useEffect(() => {
    setShowSideNav(
      !isEmpty(primaryNavData) ||
        !isEmpty(secondaryNavData) ||
        SIDE_NAV_PATHS.includes(router.pathname)
    )
  }, [primaryNavData, router.pathname, secondaryNavData])

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

  const onClickSideNavExpand = () => {
    setSideNavExpanded(!isSideNavExpanded)
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
