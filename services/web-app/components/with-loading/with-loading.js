/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { useRouter } from 'next/router'

import PageHeader from '@/components/page-header'
import PageLoading from '@/components/page-loading'

const Fallback = ({ config = {} }) => (
  <Grid>
    <Column sm={4} md={8} lg={8} {...config?.column}>
      <PageHeader loading {...config?.pageHeader} />
      <PageLoading />
    </Column>
  </Grid>
)

const WithLoading = (Component, config = {}) => {
  const Loading = (props) => {
    const router = useRouter()
    return router.isFallback ? <Fallback config={config} /> : <Component {...props} />
  }
  return Loading
}

export default WithLoading
