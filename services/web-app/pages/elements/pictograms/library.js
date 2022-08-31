/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'
import PictogramLibrary from '@/components/svg-libraries/pictogram-library'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout/layout'

const seo = {
  title: 'Pictograms',
  description:
    'Pictograms are visual symbols used to represent ideas, objects, or narratives at a glance. ' +
    'They work well in presentations and marketing communications.'
}

const tabs = [
  {
    name: 'Library',
    path: 'library'
  },
  {
    name: 'Usage',
    path: 'usage'
  },
  {
    name: 'Code',
    path: 'code'
  },
  {
    name: 'Contribute',
    path: 'contribute'
  }
]

const Library = ({ pictogramMetadata, pictogramCategoryMetadata }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} withTabs={true} />
      <PageTabs tabs={tabs} />
      <PictogramLibrary
        pictogramCategoryMetadata={pictogramCategoryMetadata}
        pictogramMetadata={pictogramMetadata}
      />
    </>
  )
}

export const getStaticProps = async () => {
  // This is not using ISR because it gets is data from a local dep that ends up bundled with the
  // web-app. ISR would just pull from the same local dep. A future implementation might pull this
  // from someplace like unpkg or directly from github instead
  const metadata = await import('@carbon/pictograms/metadata.json')

  const { icons: pictogramMetadata, categories: pictogramCategoryMetadata } = metadata

  return {
    props: {
      pictogramMetadata,
      pictogramCategoryMetadata
    }
  }
}

export default Library
