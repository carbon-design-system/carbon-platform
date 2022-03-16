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
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
  Theme
} from '@carbon/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import Footer from '@/components/footer'
import NextLink from '@/components/next-link'
import { globalNavData } from '@/data/nav-data'

import styles from './layout.module.scss'

export const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
  const [navData, setNavData] = useState([])

  return <LayoutContext.Provider value={{ navData, setNavData }}>{children}</LayoutContext.Provider>
}

const Layout = ({ children }) => {
  const router = useRouter()
  const [showSideNav, setShowSideNav] = useState(true)
  const { navData } = useContext(LayoutContext)

  useEffect(() => {
    setShowSideNav(!router.pathname.startsWith('/assets/[host]/[org]/[repo]/[library]/[ref]'))
  }, [router.pathname])

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
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
              <Grid condensed className={styles.headerGrid}>
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
              <Column sm={4} md={8} lg={4}>
                <Theme theme="white">
                  {showSideNav && (
                    <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                      <SideNavItems>
                        <HeaderSideNavItems>
                          {globalNavData.map((data, i) => (
                            <SideNavLink element={NextLink} href={data.path} key={i}>
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
                              >
                                {data.title}
                              </SideNavLink>
                            )
                          }
                          if (!data.path && data.items) {
                            return (
                              <>
                                <h2 className={styles.sideNavHeading}>{data.title}</h2>
                                {data.items.map((item, j) => (
                                  <SideNavLink
                                    element={NextLink}
                                    href={item.path}
                                    isActive={router.pathname.startsWith(item.path)}
                                    key={j}
                                  >
                                    {item.title}
                                  </SideNavLink>
                                ))}
                              </>
                            )
                          }
                          return null
                        })}
                      </SideNavItems>
                    </SideNav>
                  )}
                </Theme>
              </Column>
              <Column sm={4} md={8} lg={12}>
                {children}
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
