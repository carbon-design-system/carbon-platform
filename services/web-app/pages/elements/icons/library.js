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
import IconLibrary from '@/components/svg-libraries/icon-library'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout/layout'

const seo = {
  title: 'Icons',
  description:
    'Icons are visual symbols used to represent ideas, objects, or actions. They ' +
    'communicate messages at a glance, afford interactivity, and draw attention to important ' +
    'information.'
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

const Library = ({ iconMetadata, iconCategoryMetadata }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} withTabs={true} />
      <PageTabs tabs={tabs} />
      <IconLibrary iconCategoryMetadata={iconCategoryMetadata} iconMetaData={iconMetadata} />
    </>
  )
}

export const getStaticProps = async () => {
  // This is not using ISR because it gets is data from a local dep that ends up bundled with the
  // web-app. ISR would just pull from the same local dep. A future implementation might pull this
  // from someplace like unpkg or directly from github instead
  const metadata = await import('@carbon/icons/metadata.json')

  const { icons: iconMetadata, categories: iconCategoryMetadata } = metadata

  return {
    props: {
      iconMetadata,
      iconCategoryMetadata
    }
  }
}

export default Library
