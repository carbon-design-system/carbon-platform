/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, SideNav } from '@carbon/react'
import { ArrowLeft } from '@carbon/react/icons'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import NavTree from '@/components/nav-tree'
import { LayoutContext } from '@/layouts/layout'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './nav-secondary.module.scss'

const NavSecondary = ({ className }) => {
  const router = useRouter()
  const {
    isSideNavExpanded,
    secondaryNavData = {},
    setSideNavExpanded,
    isSecondaryNav,
    setIsSecondaryNav
  } = useContext(LayoutContext)
  const [secondaryNavSlideOut, setSecondaryNavSlideOut] = useState(false)
  const isLg = useMatchMedia(mediaQueries.lg)

  const { back, headings, items, path } = secondaryNavData

  // $duration-moderate-01 = 150ms
  const slideDelay = 150

  const handleBack = () => {
    setSecondaryNavSlideOut(true)
    setTimeout(() => {
      setSecondaryNavSlideOut(true)
      setIsSecondaryNav(false)
      router.push((back && back.path) || '/', undefined, { shallow: true })
    }, slideDelay)
  }

  if (!isLg && !isSecondaryNav) return null

  return (
    <SideNav
      aria-label="Secondary side navigation"
      expanded={isSideNavExpanded}
      className={clsx(
        className,
        isSecondaryNav && styles['side-nav-in'],
        secondaryNavSlideOut && styles['side-nav-out']
      )}
      aria-hidden={isSecondaryNav ? 'false' : 'true'}
      onOverlayClick={() => setSideNavExpanded(false)}
    >
      <Button
        kind="ghost"
        onClick={handleBack}
        className={styles.back}
        tabIndex={isSecondaryNav ? 0 : '-1'}
      >
        <ArrowLeft className={styles['back-icon']} size={16} />
        {back?.title ?? 'Back'}
      </Button>
      {headings && (
        <Link href={path ?? '/'}>
          <a
            className={clsx(
              styles.heading,
              router.pathname === '/assets/[host]/[org]/[repo]/[library]/[ref]' &&
                styles['heading--active']
            )}
          >
            <h2>
              {headings.map((heading, i) => (
                <span className={styles['heading-item']} key={i}>
                  {heading}
                </span>
              ))}
            </h2>
          </a>
        </Link>
      )}
      {items && <NavTree items={items} label="Secondary navigation" activeItem={router.asPath} />}
    </SideNav>
  )
}

export default NavSecondary
