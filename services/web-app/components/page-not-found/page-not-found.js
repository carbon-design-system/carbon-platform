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

import styles from './page-not-found.module.scss'

export const PageNotFound = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { isAuthenticated, loading, user } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated && isValidIbmEmail(user?.email ?? '')) {
      setIsAuthorized(true)
    }
  }, [loading, isAuthenticated, user])

  return (
    <Grid className={styles.grid}>
      <Column className={styles.column} sm={4} md={8} lg={6}>
        <h1 className={styles.title}>Page not found.</h1>
        {!isAuthorized && (
          <>
            <h2 className={styles.title}>Log in to view all pages.</h2>
            <Grid>
              <Column sm={4}>
                <Button className={styles.button} as="a" href="/api/login">
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

export default PageNotFound
