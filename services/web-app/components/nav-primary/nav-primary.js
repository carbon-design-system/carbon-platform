/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HeaderSideNavItems, SideNav, SideNavItems, SideNavLink } from '@carbon/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useContext } from 'react'

import { LayoutContext } from '@/layouts/layout'

import NavTree from '../nav-tree'
import styles from './nav-primary.module.scss'

const NavPrimary = ({ className, globalItems, visible }) => {
  const router = useRouter()
  const { isSideNavExpanded, primaryNavData, setSideNavExpanded } = useContext(LayoutContext)

  return (
    <SideNav
      aria-label="Side navigation"
      expanded={isSideNavExpanded}
      className={clsx(className, styles['side-nav'])}
      aria-hidden={visible ? 'false' : 'true'}
      onOverlayClick={() => setSideNavExpanded(false)}
    >
      <SideNavItems>
        {globalItems.length > 0 && (
          <HeaderSideNavItems>
            {globalItems.map((data, i) => {
              if (data.path) {
                return (
                  <SideNavLink
                    element={HTMLAnchorElement}
                    href={data.path}
                    key={i}
                    tabIndex={!visible ? '-1' : 0}
                  >
                    {data.title}
                  </SideNavLink>
                )
              } else {
                return (
                  <SideNavLink tabIndex="-1" key={i} className={styles['side-nav-disabled']}>
                    {data.title}
                  </SideNavLink>
                )
              }
            })}
          </HeaderSideNavItems>
        )}
        {primaryNavData && primaryNavData.length > 0 && (
          <NavTree
            items={primaryNavData}
            label="Main navigation"
            activeItem={router.asPath}
            visible={visible}
          />
        )}
      </SideNavItems>
    </SideNav>
  )
}

NavPrimary.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  globalItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  ),
  visible: PropTypes.bool
}

export default NavPrimary
