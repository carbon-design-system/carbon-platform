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

const withLoadingPropTypes = {
  column: PropTypes.shape({
    sm: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    md: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    lg: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  }),
  pageHeader: PropTypes.shape(pageHeaderPropTypes)
}

const withLoading = (Component, config = {}) => {
  PropTypes.checkPropTypes(withLoadingPropTypes, config, 'prop', 'withLoading')

  const Wrapped = (props) => {
    const router = useRouter()

    if (router.isFallback) {
      return (
        <Grid>
          <Column sm={4} md={8} lg={8} {...config?.column}>
            <PageHeader loading {...config?.pageHeader} />
            <PageLoading />
          </Column>
        </Grid>
      )
    }

    return <Component {...props} />
  }

  return Wrapped
}

export default withLoading
