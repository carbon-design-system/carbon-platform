/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { useRouter } from 'next/router'

import pageStyles from '@/pages/pages.module.scss'

import H1 from '../markdown/h1'

const Fallback = () => (
  <Grid>
    <Column sm={4} md={8} lg={16}>
      <div className={pageStyles.content}>
        <H1>Loading...</H1>
      </div>
    </Column>
  </Grid>
)

const WithLoading = (Component) => {
  const Loading = (props) => {
    const router = useRouter()
    return router.isFallback ? <Fallback /> : <Component {...props} />
  }
  return Loading
}

export default WithLoading
