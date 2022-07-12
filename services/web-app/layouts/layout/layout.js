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
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import BackToTop from '@/components/back-to-top'
import Footer from '@/components/footer'
import NavPrimary from '@/components/nav-primary'
import NavSecondary from '@/components/nav-secondary'
import NextLink from '@/components/next-link'
import { globalNavData } from '@/data/nav-data'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './layout.module.scss'

// do not show side nav for these paths
const NO_SIDE_NAV_PATHS = [
  '/404',
  '/libraries/[host]/[org]/[repo]/[library]/[ref]/assets/[asset]',
  '/libraries/[host]/[org]/[repo]/[library]/[ref]/assets/[asset]/[tab]'
]

// Only slide to the secondary navigation on page load for these paths.
const SECONDARY_NAV_SLIDE_PATHS = ['/libraries/[host]/[org]/[repo]/[library]/[ref]']

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const [isSideNavExpanded, setSideNavExpanded] = useState(false)
  const [primaryNavData, setPrimaryNavData] = useState([])
  const [secondaryNavData, setSecondaryNavData] = useState([])
  const [skipNextSlide, setSkipNextSlide] = useState(false)

  const value = {
    isSideNavExpanded,
    setSideNavExpanded,
    primaryNavData,
    setPrimaryNavData,
    secondaryNavData,
    setSecondaryNavData,
    skipNextSlide,
    setSkipNextSlide
  }

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

const SideNav = () => {
  const router = useRouter()
  const isSecondarySlidePath = SECONDARY_NAV_SLIDE_PATHS.includes(router.pathname)
  const [shouldSlideIn, setShouldSlideIn] = useState(isSecondarySlidePath)
  const [shouldSlideOut, setShouldSlideOut] = useState(false)
  const [isSecondaryNav, setIsSecondaryNav] = useState(
    router.pathname.startsWith('/libraries/[host]/[org]/[repo]/[library]/[ref]')
  )

  // $duration-moderate-01 = 150ms
  const slideDelay = 150

  const { skipNextSlide, setSkipNextSlide } = useContext(LayoutContext)

  // Wait a render cycle before adding the class name to slide to the secondary nav
  useEffect(() => {
    requestAnimationFrame(() => {
      if (shouldSlideIn) {
        setShouldSlideIn(false)
      }
    })
  }, [shouldSlideIn, setShouldSlideIn])

  useEffect(() => {
    setTimeout(() => {
      setSkipNextSlide(isSecondaryNav)
    }, slideDelay)
    // we do not want to update every time isSecondaryNav changes, it messes up the whole behavior
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see above
  }, [setSkipNextSlide])

  const handleSlidePrimary = () => {
    setShouldSlideOut(true)
    setIsSecondaryNav(false)
  }

  const cnSlide = clsx(styles['side-nav-slide'], {
    [styles['side-nav-slide--secondary']]:
      isSecondaryNav && !(isSecondarySlidePath && shouldSlideIn),
    [styles['slide-in']]: !skipNextSlide,
    [styles['slide-out']]: shouldSlideOut
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
                visible={isSecondaryNav}
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
  const { isSideNavExpanded, setSideNavExpanded, primaryNavData } = useContext(LayoutContext)
  const isLg = useMatchMedia(mediaQueries.lg)
  const [showSideNav, setShowSideNav] = useState(true)

  useEffect(() => {
    setShowSideNav(!NO_SIDE_NAV_PATHS.includes(router.pathname))
  }, [primaryNavData, router.pathname])

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
    const handleRouteChange = () => {
      // Collapse the side nav for small and medium breakpoint when navigating to a new page.
      setSideNavExpanded(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events, setSideNavExpanded])

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
                  {globalNavData.length > 0 && (
                    <HeaderNavigation aria-label="Main navigation">
                      {globalNavData.map((data) => {
                        if (data.path) {
                          return (
                            <HeaderMenuItem
                              key={data.title}
                              isCurrentPage={router.pathname.startsWith(data.path)}
                              href={data.path}
                              element={NextLink}
                            >
                              {data.title}
                            </HeaderMenuItem>
                          )
                        } else {
                          return (
                            <HeaderMenuItem
                              key={data.title}
                              tabIndex={-1}
                              className={styles['header-nav-item-disabled']}
                            >
                              {data.title}
                            </HeaderMenuItem>
                          )
                        }
                      })}
                    </HeaderNavigation>
                  )}
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
          <BackToTop />
          <Footer hasSideNav={showSideNav} />
        </>
      )}
    />
  )
}

export default Layout
