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

const NavMain = () => {
  const router = useRouter()
  const { librarySideNav, isSideNavExpanded, libraryNavSlideOut, setLibraryNavSlideOut } =
    useContext(LayoutContext)

  // $duration-moderate-01 = 150ms
  const slideDelay = 150

  const backLink = () => {
    setLibraryNavSlideOut(true)
    setTimeout(() => router.push('/assets/libraries'), slideDelay)
  }

  // TODO issue #523 const libraryActive = false (set to true when on library page)

  return (
    <SideNav
      aria-label="Library side navigation"
      expanded={isSideNavExpanded}
      className={clsx(
        styles.librarySideNav,
        librarySideNav && styles.libraryNavIn,
        libraryNavSlideOut && styles.libraryNavOut
      )}
    >
      <Button kind="ghost" onClick={backLink} className={styles.back}>
        <ArrowLeft className={styles.backIcon} size={16} />
        Back to all Libraries
      </Button>
      {/* TODO issue #523 add link back to library if libraryActive=false */}
      <h2
        className={
          styles.navHeading /* TODO issue #523 ,libraryActive && styles.navHeadingSelected */
        }
      >
        {/* TODO issue #523 need title and version datta */}
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

export default NavMain
