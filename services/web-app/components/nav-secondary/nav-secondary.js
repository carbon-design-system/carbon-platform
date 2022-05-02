/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, SideNav } from '@carbon/react'
import { ArrowLeft } from '@carbon/react/icons'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import NavTree from '@/components/nav-tree'
import { LayoutContext } from '@/layouts/layout'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './nav-secondary.module.scss'

const NavSecondary = ({ className, onSlidePrimary }) => {
  const router = useRouter()
  const { isSideNavExpanded, secondaryNavData = {} } = useContext(LayoutContext)
  const isLg = useMatchMedia(mediaQueries.lg)

  const { back, headings, items, path } = secondaryNavData

  const handleBack = () => {
    onSlidePrimary()
    setTimeout(() => {
      router.push((back && back.path) || '/')
    }, 150) // $duration-moderate-01 is 150ms
  }

  const showSecondaryNav = !isEmpty(secondaryNavData)

  if (!isLg && !showSecondaryNav) return null

  return (
    <SideNav
      aria-label="Secondary side navigation"
      expanded={isSideNavExpanded}
      className={clsx(className)}
      aria-hidden={showSecondaryNav ? 'false' : 'true'}
    >
      <Button kind="ghost" onClick={handleBack} className={styles.back}>
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
