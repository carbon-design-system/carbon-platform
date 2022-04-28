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
import { useRouter } from 'next/router'
import { useContext } from 'react'

import NavTree from '@/components/nav-tree'
import { LayoutContext } from '@/layouts/layout'

import styles from './nav-secondary.module.scss'

const NavSecondary = ({ className }) => {
  const router = useRouter()
  const { secondaryNavData = [] } = useContext(LayoutContext)

  const handleBack = () => {
    router.push('/libraries')
  }

  const showSecondaryNav = !isEmpty(secondaryNavData)

  return (
    <SideNav
      aria-label="Secondary side navigation"
      expanded={showSecondaryNav}
      className={clsx(className)}
      aria-hidden={showSecondaryNav ? 'false' : 'true'}
    >
      <Button kind="ghost" onClick={handleBack} className={styles.back}>
        <ArrowLeft className={styles['back-icon']} size={16} />
        Libraries
      </Button>
      <h2 className={clsx(styles.heading)}>
        Library name
        <br />
        v1.0.0
      </h2>
      <NavTree
        items={secondaryNavData}
        label="Secondary navigation"
        activeItem={router.asPath.substring(router.asPath.lastIndexOf('/') + 1)}
      />
    </SideNav>
  )
}

export default NavSecondary
