/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, Column, Grid } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import { useEffect, useState } from 'react'

import { useAuth } from '@/contexts/auth'
import { isValidIbmEmail } from '@/utils/string'

import styles from './PageNotFound.module.scss'

export const PageNotFound = () => {
  const [isAuthorized, setisAuthorized] = useState(false)
  const { isAuthenticated, loading, user } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated && isValidIbmEmail(user?.email ?? '')) {
      setisAuthorized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAuthenticated, user])

  return (
    <Grid className={styles.grid}>
      <Column className={styles.column} sm={4} md={6} lg={6} xlg={6} max={6}>
        <h1 className={styles.title}>Page not found.</h1>
        {!isAuthorized && (
          <>
            <h1 className={styles.title}>Log in to view all pages.</h1>
            <Grid columns={3}>
              <Column sm={3} md={2} lg={2} xlg={2} max={2}>
                <Button className={styles.loginButton} as="a" href="/api/login">
                  Log in
                  <ArrowRight size={16} />
                </Button>
              </Column>
            </Grid>
          </>
        )}
      </Column>
    </Grid>
  )
}
