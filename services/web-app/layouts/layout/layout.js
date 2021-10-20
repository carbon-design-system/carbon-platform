/**
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
  Theme,
} from "@carbon/react";
import { Search20, Switcher20, User20 } from "@carbon/icons-react";
import { createContext, useContext, useState } from "react";

import Link from "next/link";
import NextLink from "@/components/next-link";
import styles from "./layout.module.scss";
import { useRouter } from "next/router";

const globalNavData = [
  {
    path: "/standards",
    title: "Standards",
  },
  {
    path: "/assets",
    title: "Assets",
  },
];

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [navData, setNavData] = useState([]);

  return (
    <LayoutContext.Provider value={{ navData, setNavData }}>
      {children}
    </LayoutContext.Provider>
  );
};

const Layout = ({ children }) => {
  const router = useRouter();
  const { navData } = useContext(LayoutContext);

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Theme theme="g100">
            <Header aria-label="IBM Platform Name">
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
                <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
                  <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Log in" onClick={() => {}}>
                  <User20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Switch sites"
                  onClick={() => {}}
                >
                  <Switcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <Theme theme="white">
                <SideNav
                  aria-label="Side navigation"
                  expanded={isSideNavExpanded}
                >
                  <SideNavItems>
                    <HeaderSideNavItems>
                      {globalNavData.map((data) => (
                        <SideNavLink
                          key={data.path}
                          href={data.path}
                          element={NextLink}
                        >
                          {data.title}
                        </SideNavLink>
                      ))}
                    </HeaderSideNavItems>
                    {navData.map((data, i) => {
                      if (data.path && data.title) {
                        return (
                          <SideNavLink href={data.path} key={i}>
                            {data.title}
                          </SideNavLink>
                        );
                      }
                      if (!data.path && data.items) {
                        return (
                          <SideNavMenu key={i} title={data.title}>
                            {data.items.map((item, j) => (
                              <SideNavMenuItem href={item.href} key={j}>
                                {item.title}
                              </SideNavMenuItem>
                            ))}
                          </SideNavMenu>
                        );
                      }
                    })}
                  </SideNavItems>
                </SideNav>
              </Theme>
            </Header>
          </Theme>
          <Theme className={styles.content} theme="g10">
            <Grid as="main" className={styles.main} id="main-content">
              <Column className={styles.inner} sm={4} md={8} lg={16}>
                {children}
              </Column>
            </Grid>
          </Theme>
        </>
      )}
    />
  );
};

export default Layout;
