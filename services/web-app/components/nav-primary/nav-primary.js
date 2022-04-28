/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HeaderSideNavItems, SideNav, SideNavItems, SideNavLink } from '@carbon/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useContext } from 'react'

import NextLink from '@/components/next-link'
import { LayoutContext } from '@/layouts/layout'

import styles from './nav-primary.module.scss'

const NavPrimary = ({ className, globalItems = [] }) => {
  const router = useRouter()
  const { primaryNavData = [], secondaryNavData = [] } = useContext(LayoutContext)

  const showPrimaryNav = !isEmpty(primaryNavData)
  const showSecondaryNav = !isEmpty(secondaryNavData)

  return (
    <SideNav
      aria-label="Side navigation"
      expanded={showPrimaryNav}
      className={clsx(className)}
      aria-hidden={showSecondaryNav ? 'true' : 'false'}
    >
      <SideNavItems>
        <HeaderSideNavItems>
          {globalItems.map((data, i) => (
            <SideNavLink
              element={NextLink}
              href={data.path}
              key={i}
              tabIndex={showSecondaryNav || !data.path ? -1 : 0}
              className={clsx(!data.path && styles['link--disabled'])}
            >
              {data.title}
            </SideNavLink>
          ))}
        </HeaderSideNavItems>
        {primaryNavData.map((data, i) => {
          if (data.path && data.title) {
            return (
              <SideNavLink
                element={NextLink}
                href={data.path}
                isActive={router.pathname === data.path}
                key={i}
                tabIndex={showSecondaryNav ? -1 : 0}
              >
                {data.title}
              </SideNavLink>
            )
          }
          if (!data.path && data.items) {
            return (
              <div key={i}>
                <h2 className={styles.heading}>{data.title}</h2>
                {data.items.map((item, j) => (
                  <SideNavLink
                    element={NextLink}
                    href={item.path}
                    isActive={router.pathname.startsWith(item.path)}
                    key={j}
                    tabIndex={showSecondaryNav ? -1 : 0}
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

NavPrimary.propTypes = {
  globalItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  )
}

export default NavPrimary
