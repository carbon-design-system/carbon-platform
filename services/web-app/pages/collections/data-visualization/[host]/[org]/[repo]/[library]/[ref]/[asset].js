/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextSeo } from 'next-seo'
import { libraryPropTypes } from 'types'

import AssetDetailPage from '@/components/asset-detail-page'
import { getAssetIssueCount, getLibraryData } from '@/lib/github'
import { getSlug } from '@/utils/slug'

const Asset = ({ libraryData, params }) => {
  const [assetData] = libraryData.assets
  const { name } = assetData.content

  const breadcrumbItems = [
    {
      name: 'Data visualization',
      path: '/collections/data-visualization'
    },
    {
      name
    }
  ]

  return (
    <>
      <AssetDetailPage
        breadcrumbItems={breadcrumbItems}
        libraryData={libraryData}
        params={params}
      />
      <NextSeo
        canonical={`https://next.carbondesignsystem.com/libraries/${
          params.library
        }/latest/assets/${getSlug(assetData.content)}`}
      />
    </>
  )
}

Asset.propTypes = {
  libraryData: libraryPropTypes
}

export const getServerSideProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData || !libraryData.assets || !libraryData.assets.length) {
    return {
      notFound: true
    }
  }

  const [assetData] = libraryData.assets
  assetData.content.issueCount = await getAssetIssueCount(assetData)

  return {
    props: {
      libraryData,
      params
    }
  }
}

export default Asset
