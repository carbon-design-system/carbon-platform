/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { useRouter } from 'next/router'
import React from 'react'

import PageHeader from '@/components/page-header'
import PageLoading from '@/components/page-loading'

/**
 * Higher-Order Component (HOC) that renders a loading fallback on Incremental Static Regeneration
 * (ISR) pages. You can pass in a config object to pass props to internal React components.
 * @param {React.FC} Component - The original component
 * @param {object} config - The configuration of internal component props
 * @param {object} config.column - Column component prop, see Carbon for full docs
 * @param {(string|object)} config.column.xs
 * @param {(string|object)} config.column.sm
 * @param {(string|object)} config.column.md
 * @param {(string|object)} config.column.lg
 * @param {(string|object)} config.column.xlg
 * @param {(string|object)} config.column.max
 * @param {object} config.pageHeader - PageHeader component prop
 * @param {string} config.pageHeader.bgColor
 * @param {boolean} config.pageHeader.loading
 * @param {object} config.pageHeader.pictogram
 * @param {string} config.pageHeader.title
 * @param {boolean} config.pageHeader.withTabs
 * @returns {React.ReactElement}
 */
const withLoading = (Component, config = {}) => {
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
