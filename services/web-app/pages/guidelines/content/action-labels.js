/*
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PageDescription } from '@carbon-platform/mdx-components'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ContentWrapper from '@/components/content-wrapper'
import Glossary from '@/components/glossary'
import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

const tabs = [
  {
    name: 'Overview',
    path: '/guidelines/content/overview'
  },
  {
    name: 'Writing style',
    path: '/guidelines/content/writing-style'
  },
  {
    name: 'Action labels',
    path: '/guidelines/content/action-labels'
  }
]

const ActionLabels = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Content',
    description:
      'Users rely on consistent labels for common actions to predict how to interact with an interface.' +
      ' This list includes the common UI terms and recommended action labels for use in IBM UI content and' +
      ' documentation.'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} withTabs />
      <PageTabs title="Page tabs" tabs={tabs} />
      <ContentWrapper>
        <PageDescription>
          Users rely on consistent labels for common actions to predict how to interact with an
          interface. This list includes the common UI terms and recommended action labels for use in
          IBM UI content and documentation.
        </PageDescription>
        <Glossary />
      </ContentWrapper>
    </>
  )
}

export default ActionLabels
