/*
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ContentWrapper from '@/components/content-wrapper'
import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'
import PictogramLibrary from '@/components/svg-libraries/pictogram-library'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

const tabs = [
  {
    name: 'Library',
    path: '/elements/pictograms/library'
  },
  {
    name: 'Usage',
    path: '/elements/pictograms/usage'
  },
  {
    name: 'Code',
    path: '/elements/pictograms/code'
  },
  {
    name: 'Contribute',
    path: '/elements/pictograms/contribute'
  }
]

const Library = ({ pictogramCategoryMetadata, pictogramMetadata }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Pictograms',
    description:
      'Pictograms are visual symbols used to represent ideas, objects, or narratives at a glance. They ' +
      'work well in presentations and marketing communications.'
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
        <PictogramLibrary
          pictogramCategoryMetadata={pictogramCategoryMetadata}
          pictogramMetadata={pictogramMetadata}
        />
      </ContentWrapper>
    </>
  )
}

export const getStaticProps = async () => {
  // This is not using ISR because it gets is data from a local dep that ends up bundled with the
  // web-app. ISR would just pull from the same local dependency. A future implementation might
  // pull this from some place like unpkg or directly from github instead.
  const metadata = await import('@carbon/pictograms/metadata.json')
  const { icons: pictogramMetadata, categories: pictogramCategoryMetadata } = metadata
  return {
    props: { pictogramMetadata, pictogramCategoryMetadata },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export default Library
