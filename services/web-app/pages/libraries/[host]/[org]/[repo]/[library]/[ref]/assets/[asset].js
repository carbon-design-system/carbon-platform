/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { libraryPropTypes } from 'types'

import AssetDetailPage from '@/components/asset-detail-page'
import { getAssetIssueCount, getLibraryData } from '@/lib/github'

const Asset = ({ libraryData, params }) => {
  const [assetData] = libraryData.assets
  const { name } = assetData.content
  const libraryPath = `/libraries/${params.library}/${params.ref}`

  const breadcrumbItems = [
    {
      name: libraryData?.content?.name ?? 'Library',
      path: libraryPath
    },
    {
      name: 'Assets',
      path: libraryPath + '/assets'
    },
    {
      name
    }
  ]

  return (
    <AssetDetailPage breadcrumbItems={breadcrumbItems} libraryData={libraryData} params={params} />
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
