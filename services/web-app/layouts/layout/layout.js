/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  Grid,
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
  Theme
} from '@carbon/react'
import { Search, Switcher, User } from '@carbon/react/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

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
  const { navData } = useContext(LayoutContext)

  /**
   * @todo the HeaderGlobalAction component has icons that aren't centered using the latest
   * `@carbon/react@0.11.0`. This has been reported:
   * {@link https://github.com/carbon-design-system/carbon/discussions/10247}.
   */

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Theme theme="g100">
            <Header aria-label="Carbon Design System">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <Link href="/">
                <a className="cds--header__name">Carbon Design System</a>
              </Link>
              <HeaderNavigation aria-label="Main navigation">
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
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search">
                  <Search size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Log in">
                  <User size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Switch sites">
                  <Switcher size={20} />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
          </Theme>
          <Theme className={styles.body} theme="g10">
            <Grid as="main" className={styles.main} id="main-content">
              <Column sm={4} md={8} lg={4}>
                <Theme theme="white">
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
                            <SideNavMenu defaultExpanded={true} key={i} title={data.title}>
                              {data.items.map((item, j) => (
                                <SideNavMenuItem
                                  element={NextLink}
                                  isActive={router.pathname.startsWith(item.path)}
                                  to={item.path}
                                  key={j}
                                >
                                  {item.title}
                                </SideNavMenuItem>
                              ))}
                            </SideNavMenu>
                          )
                        }
                        return null
                      })}
                    </SideNavItems>
                  </SideNav>
                </Theme>
              </Column>
              <Column sm={4} md={8} lg={12}>
                {children}
              </Column>
            </Grid>
          </Theme>
        </>
      )}
    />
  )
}

export default Layout
