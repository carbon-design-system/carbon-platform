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

import Footer from '@/components/footer'
import NavPrimary from '@/components/nav-primary'
import NavSecondary from '@/components/nav-secondary'
import NextLink from '@/components/next-link'
import { globalNavData } from '@/data/nav-data'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './layout.module.scss'

// Only slide to the secondary navigation on page load for these paths.
const SECONDARY_NAV_SLIDE_PATHS = [
  '/assets/[host]/[org]/[repo]/[library]/[ref]',
  '/assets/[host]/[org]/[repo]/[library]/[ref]/library-assets',
  '/assets/[host]/[org]/[repo]/[library]/[ref]/design-kits',
  '/assets/[host]/[org]/[repo]/[library]/[ref]/versions'
]

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const [isSideNavExpanded, setSideNavExpanded] = useState(false)
  const [primaryNavData, setPrimaryNavData] = useState([])
  const [secondaryNavData, setSecondaryNavData] = useState([])
  const [isSecondaryNav, setIsSecondaryNav] = useState(false)

  const value = {
    isSideNavExpanded,
    setSideNavExpanded,
    primaryNavData,
    setPrimaryNavData,
    secondaryNavData,
    setSecondaryNavData,
    isSecondaryNav,
    setIsSecondaryNav
  }

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

const SideNav = () => {
  const { isSecondaryNav } = useContext(LayoutContext)

  const cnSlide = clsx(styles['side-nav-slide'], {
    [styles['side-nav-slide--secondary']]: isSecondaryNav
  })
  return (
    <Column sm={4} md={8} lg={4}>
      <Theme theme="white">
        <section className={styles['side-nav']}>
          <div className={styles['side-nav-inner']}>
            <div className={cnSlide}>
              <NavPrimary className={styles['side-nav-item']} globalItems={globalNavData} />
              <NavSecondary className={styles['side-nav-item']} />
            </div>
          </div>
        </section>
      </Theme>
    </Column>
  )
}

const Layout = ({ children }) => {
  const router = useRouter()
  const {
    isSideNavExpanded,
    setSideNavExpanded,
    primaryNavData,
    secondaryNavData,
    setIsSecondaryNav
  } = useContext(LayoutContext)
  const isLg = useMatchMedia(mediaQueries.lg)

  useEffect(() => {
    setIsSecondaryNav(SECONDARY_NAV_SLIDE_PATHS.includes(router.pathname))
  }, [primaryNavData, router.pathname, secondaryNavData, setIsSecondaryNav])

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
                <Link href="/assets">
                  <a className="cds--header__name">Carbon Design System</a>
                </Link>
              </div>
              <Grid narrow className={styles['header-grid']}>
                <Column sm={0} lg={{ span: 8, offset: 4 }}>
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
                </Column>
              </Grid>
            </Header>
          </Theme>
          <Theme className={styles.body} theme="g10">
            <Grid as="main" className={styles.main} id="main-content">
              <SideNav />
              <Column sm={4} md={8} lg={12}>
                <Grid condensed={!isLg} narrow={isLg}>
                  <Column className={styles['column-content']} sm={4} md={8} lg={12}>
                    {children}
                  </Column>
                </Grid>
              </Column>
            </Grid>
          </Theme>
          <Footer hasSideNav />
        </>
      )}
    />
  )
}

export default Layout
