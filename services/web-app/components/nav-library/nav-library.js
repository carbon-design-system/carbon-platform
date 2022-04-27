/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, SideNav } from '@carbon/react'
import { ArrowLeft } from '@carbon/react/icons'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import NavTree from '@/components/nav-tree'
import { libraryNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import styles from './nav-library.module.scss'

const NavLibrary = () => {
  const router = useRouter()
  const {
    librarySideNav,
    isSideNavExpanded,
    libraryNavSlideOut,
    setLibraryNavSlideOut,
    setLibrarySideNav
  } = useContext(LayoutContext)

  // $duration-moderate-01 = 150ms
  const slideDelay = 150

  const backLink = () => {
    setLibraryNavSlideOut(true)
    setTimeout(() => {
      setLibraryNavSlideOut(false)
      setLibrarySideNav(false)
      router.push('/assets/libraries', undefined, { shallow: true })
    }, slideDelay)
  }

  // TODO issue #523 (set to false when on child pages)
  const libraryActive = true

  return (
    <SideNav
      aria-label="Library side navigation"
      expanded={isSideNavExpanded}
      className={clsx(
        styles['library-side-nav'],
        librarySideNav && styles['library-nav-in'],
        libraryNavSlideOut && styles['library-nav-out']
      )}
    >
      <Button kind="ghost" onClick={backLink} className={styles.back}>
        <ArrowLeft className={styles['back-icon']} size={16} />
        Libraries
      </Button>
      {/* TODO issue #523 add link back to library if libraryActive=false */}
      <h2 className={clsx(styles['nav-heading'], libraryActive && styles['nav-heading-selected'])}>
        {/* TODO issue #523 need title and version data */}
        Library name
        <br />
        v1.0.0
      </h2>
      <NavTree
        items={libraryNavData}
        label="Library navigation"
        activeItem={router.asPath.substring(router.asPath.lastIndexOf('/') + 1)}
      />
    </SideNav>
  )
}

export default NavLibrary
