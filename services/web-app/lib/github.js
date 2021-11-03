/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getResponse, writeFile } from '@/lib/file-cache'

import { CACHE_PATH } from '@/config/constants'
import slugify from 'slugify'
import yaml from 'js-yaml'

// TODO only registered repos from /data/libraries.js
// TODO handle paginated results for large data sets
// TODO handle versioning, as search endpoint is only default branch
// TODO better manage errors and no results
export const getAllLibraries = async () => {
  const data = await getResponse('GET /search/code?q={query}+repo:{repo}+filename:{filename}', {
    query: 'name',
    repo: 'mattrosno/carbon-next',
    filename: 'carbon-library.yml'
  })

  if (!data || !data.items || !data.items.length) {
    return []
  }

  const promises = await data.items.map(async (item) => {
    return getResponse('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: item.repository.owner.login,
      repo: item.repository.name,
      path: item.path
    })
  })

  const contentsData = await Promise.all(promises)

  return contentsData.map((contents) => {
    return {
      repository: {
        name: contents.name,
        path: contents.path,
        sha: contents.sha,
        url: contents.url,
        baseUrl: contents.url.substring(0, contents.url.lastIndexOf('/'))
      },
      contents: yaml.load(Buffer.from(contents.content, contents.encoding).toString())
    }
  })
}

// TODO only registered repos from /data/libraries.js
// TODO handle paginated results for large data sets
// TODO handle versioning, as search endpoint is only default branch
// TODO better manage errors and no results
// TODO use image-extensions to find and cache all images
const getAllAssets = async () => {
  // find carbon-asset.yml files in the rpo
  const data = await getResponse('GET /search/code?q={query}+repo:{repo}+filename:{filename}', {
    query: 'name',
    repo: 'mattrosno/carbon-next',
    filename: 'carbon-asset.yml'
  })

  if (!data || !data.items || !data.items.length) {
    return []
  }

  // get content of each carbon-asset.yml file
  const dataPromises = await data.items.map(async (item) => {
    return getResponse('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: item.repository.owner.login,
      repo: item.repository.name,
      path: item.path
    })
  })

  const dataContents = await Promise.all(dataPromises)

  // transpose yml to json and save origin information
  const assets = dataContents.map((contents) => {
    return {
      repository: {
        name: contents.name,
        path: contents.path,
        sha: contents.sha,
        url: contents.url,
        baseUrl: contents.url.substring(0, contents.url.lastIndexOf('/'))
      },
      contents: yaml.load(Buffer.from(contents.content, contents.encoding).toString())
    }
  })

  // find all thumbnail images and construct request URLs
  const imgUrls = assets
    .map((asset) => {
      return asset.contents.thumbnailPath
        ? asset.repository.baseUrl.replace('https://api.github.com', '') +
            asset.contents.thumbnailPath
        : ''
    })
    .filter(function (img) {
      return img
    })

  // get content of each image
  const imgPromises = await imgUrls.map(async (path) => {
    return getResponse(`GET ${path}`)
  })

  const imgContents = await Promise.all(imgPromises)

  // write images to disk
  imgContents.forEach((contents) => {
    const pathName = contents.url
      .substring(0, contents.url.lastIndexOf('?'))
      .replace('https://api.github.com', '')

    writeFile(pathName, Buffer.from(contents.content, contents.encoding))
  })

  return assets
}

export const getAllLibrariesAssets = async () => {
  const assets = await getAllAssets()
  const libraries = await getAllLibraries()

  return libraries.map((library) => {
    return {
      ...library,
      assets: assets.filter((asset) => {
        return asset.repository.url.includes(library.repository.baseUrl)
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

export const getImgSrc = (repo = {}, path = '') => {
  if (!repo.baseUrl || !path) return null

  return `/${CACHE_PATH}${repo.baseUrl.replace('https://api.github.com', '')}${path}`
}
