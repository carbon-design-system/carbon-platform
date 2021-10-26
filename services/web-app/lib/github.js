/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Octokit } from '@octokit/core'
import slugify from 'slugify'
import yaml from 'js-yaml'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

// TODO only registered repos from /data/libraries.js
// TODO handle paginated results for large data sets
// TODO handle versioning, as search endpoint is only default branch
// TODO implement cache to reduce github requests
// TODO better manage errors and no results
export const getAllLibraries = async () => {
  const searchOptions = {
    query: 'name',
    repo: 'mattrosno/carbon-next',
    filename: 'carbon-library.yml'
  }

  console.log('GITHUB SEARCH:', searchOptions)
  const { data } = await octokit.request(
    'GET /search/code?q={query}+repo:{repo}+filename:{filename}',
    searchOptions
  )

  if (!data || !data.items || !data.items.length) {
    return []
  }

  const promises = await data.items.map(async (item) => {
    const contentsOptions = {
      owner: item.repository.owner.login,
      repo: item.repository.name,
      path: item.path
    }

    console.log('GITHUB CONTENTS:', contentsOptions)
    const content = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      contentsOptions
    )

    return content
  })

  const contentsData = await Promise.all(promises)

  return contentsData.map((contents) => {
    return {
      repository: {
        name: contents.data.name,
        path: contents.data.path,
        sha: contents.data.sha,
        url: contents.data.url
      },
      contents: yaml.load(Buffer.from(contents.data.content, contents.data.encoding).toString())
    }
  })
}

// TODO only registered repos from /data/libraries.js
// TODO handle paginated results for large data sets
// TODO handle versioning, as search endpoint is only default branch
// TODO implement cache to reduce github requests
// TODO better manage errors and no results
const getAllAssets = async () => {
  const searchOptions = {
    query: 'name',
    repo: 'mattrosno/carbon-next',
    filename: 'carbon-asset.yml'
  }

  console.log('GITHUB SEARCH:', searchOptions)
  const { data } = await octokit.request(
    'GET /search/code?q={query}+repo:{repo}+filename:{filename}',
    searchOptions
  )

  if (!data || !data.items || !data.items.length) {
    return []
  }

  const promises = await data.items.map(async (item) => {
    const contentsOptions = {
      owner: item.repository.owner.login,
      repo: item.repository.name,
      path: item.path
    }

    console.log('GITHUB CONTENTS:', contentsOptions)
    const content = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      contentsOptions
    )
    return content
  })

  const contentsData = await Promise.all(promises)

  return contentsData.map((contents) => {
    return {
      repository: {
        name: contents.data.name,
        path: contents.data.path,
        sha: contents.data.sha,
        url: contents.data.url
      },
      contents: yaml.load(Buffer.from(contents.data.content, contents.data.encoding).toString())
    }
  })
}

export const getAllLibrariesAssets = async () => {
  const assets = await getAllAssets()
  const libraries = await getAllLibraries()

  return libraries.map((library) => {
    const libraryBasePath = library.repository.url.substring(
      0,
      library.repository.url.lastIndexOf('/')
    )

    return {
      ...library,
      assets: assets.filter((asset) => {
        return asset.repository.url.includes(libraryBasePath)
      })
    }
  })
}

export const getAllLibraryPaths = async () => {
  const libraries = await getAllLibraries()

  return libraries.map((library) => {
    return {
      params: {
        library: slugify(library.contents.name, {
          lower: true
        })
      }
    }
  })
}

export const getAllAssetPaths = async () => {
  const libraries = await getAllLibrariesAssets()

  const paths = []

  libraries.forEach((library) => {
    library.assets.forEach((asset) => {
      paths.push({
        params: {
          asset: slugify(asset.contents.name, { lower: true }),
          library: slugify(library.contents.name, { lower: true })
        }
      })
    })
  })

  return paths
}

// TODO don't fetch all libraries
export const getLibraryData = async (params) => {
  const libraries = await getAllLibraries()

  const library = libraries.find((library) => {
    return slugify(library.contents.name, { lower: true }) === params.library
  })

  return library || {}
}

// TODO don't fetch all libraries and all assets
export const getAssetData = async (params) => {
  const libraries = await getAllLibrariesAssets()

  let foundLibrary = {}
  let foundAsset = {}

  libraries.forEach((library) => {
    if (slugify(library.contents.name, { lower: true }) === params.library) {
      library.assets.forEach((asset) => {
        if (slugify(asset.contents.name, { lower: true }) === params.asset) {
          foundAsset = asset
        }
      })

      delete library.assets
      foundLibrary = library
    }
  })

  return {
    library: foundLibrary,
    asset: foundAsset
  }
}
