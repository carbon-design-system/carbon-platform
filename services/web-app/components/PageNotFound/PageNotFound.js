/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, Column, Grid } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'

// import { useAuth } from '@/contexts/auth'
// import { isValidIbmEmail } from '@/utils/string'
// import RequireAuth from '../auth/require-auth'
import styles from './PageNotFound.module.scss'

export const PageNotFound = () => {
  //  const { isAuthenticated, loading, user } = useAuth()

  // const loginGrid =

  return (
    <>
      {/* <RequireAuth
      fallback={FourOhFour}
      isAuthorized={isAuthenticated && isValidIbmEmail(user?.email ?? '')}
    >
      <>
        Welcome to the Protected Page!
        <div>User: {JSON.stringify(user ?? {})}</div>
        <div>isAuthenticated: {isAuthenticated?.toString()}</div>
        <div>isLoading: {loading?.toString()}</div>
      </>
    </RequireAuth> */}
      <Grid className={styles.grid}>
        <Column className={styles.column} sm={4} md={6} lg={6} xlg={6} max={6}>
          <h1 className={styles.title}>Page not found.</h1>
          <Grid>
            <Column sm={4} md={8} lg={12} xlg={12} max={12}>
              <h1 className={styles.title}>Log in to view all pages.</h1>
            </Column>
            <Grid columns={{ md: 12 }}>
              <Column md={8} lg={8} xlg={8} max={8}>
                <Button className={styles.loginButton} as="a" href="/api/login">
                  Log in
                  <ArrowRight size={16} />
                </Button>
              </Column>
            </Grid>
          </Grid>
        </Column>
      </Grid>
    </>
  )
}
