/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import PageHeader from '@/components/page-header'
import PageLoading from '@/components/page-loading'
import { pageHeaderPropTypes } from '@/types'

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

WithLoading.propTypes = {
  Component: PropTypes.element.isRequired,
  config: PropTypes.shape({
    column: PropTypes.shape({
      sm: PropTypes.oneOf([PropTypes.number, PropTypes.object]),
      md: PropTypes.oneOf([PropTypes.number, PropTypes.object]),
      lg: PropTypes.oneOf([PropTypes.number, PropTypes.object])
    }),
    pageHeader: PropTypes.shape(pageHeaderPropTypes)
  })
}

export default WithLoading
