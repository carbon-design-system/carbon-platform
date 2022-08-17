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
import { useContext } from 'react'

import NavTree from '@/components/nav-tree'
import { LayoutContext } from '@/layouts/layout'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import H2 from '../markdown/h2'
import styles from './nav-secondary.module.scss'

const NavSecondary = ({ className, visible, onSlidePrimary }) => {
  const router = useRouter()
  const { isSideNavExpanded, secondaryNavData = {}, setSideNavExpanded } = useContext(LayoutContext)
  const isLg = useMatchMedia(mediaQueries.lg)

  const { back, headings, items, path } = secondaryNavData

  // $duration-moderate-01 = 150ms
  const slideDelay = 150

  const handleBack = () => {
    onSlidePrimary()
    setTimeout(() => {
      router.push((back && back.path) || '/')
    }, slideDelay)
  }

  if (!isLg && !visible) return null

  return (
    <SideNav
      aria-label="Secondary side navigation"
      expanded={isSideNavExpanded}
      className={clsx(styles['secondary-nav'], className)}
      aria-hidden={visible ? 'false' : 'true'}
      onOverlayClick={() => setSideNavExpanded(false)}
    >
      <Button
        kind="ghost"
        onClick={handleBack}
        className={styles.back}
        tabIndex={visible ? 0 : '-1'}
      >
        <ArrowLeft className={styles['back-icon']} size={16} />
        {back?.title ?? 'Back'}
      </Button>
      {headings && (
        <Link href={path ?? '/'}>
          <a
            className={clsx(
              styles.heading,
              router.pathname === '/libraries/[host]/[org]/[repo]/[library]/[ref]' &&
                styles['heading--active']
            )}
          >
            <H2 className={styles['h2-container']}>
              {headings.map((heading, i) => (
                <span className={styles['heading-item']} key={i}>
                  {heading}
                </span>
              ))}
            </H2>
          </a>
        </Link>
      )}
      {items && <NavTree items={items} label="Secondary navigation" activeItem={router.asPath} />}
    </SideNav>
  )
}

export default NavSecondary
