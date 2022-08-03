/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RunMode, Runtime } from '@carbon-platform/api/runtime'
import { Octokit } from '@octokit/core'
import cacheManager from 'cache-manager'
import fsStore from 'cache-manager-fs-hash'
import fs from 'fs-extra'

import { CACHE_PATH, IMAGES_CACHE_PATH } from '@/config/constants'

/**
 * If using prototyping data committed to the repo, use a crazy long ttl like a year so the cache
 * doesn't unintentionally invalidate while doing development. If using the full file cache in
 * production, use a one hour ttl.
 */
const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    path: CACHE_PATH,
    ttl: new Runtime().runMode === RunMode.Standard ? 60 * 60 : 60 * 60 * 24 * 365 /* seconds */,
    zip: false
  }
})

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const octokitIbm = new Octokit({
  auth: process.env.GITHUB_IBM_TOKEN
})

/**
 * Creates a unique key based on the host and request to use in the file cache.
 * @param {string} host - GitHub API base URL
 * @param {string} route - GitHub API request route
 * @param {object} options - Options merged into the request route
 * @returns {string} Unique key to use in the file cache
 */
const slugifyRequest = (host, route, options = {}) => {
  let mergedStr = `${host} ${route}`

  for (const [key, value] of Object.entries(options)) {
    mergedStr = mergedStr.replace(`{${key}}`, value)
  }

  if (options.ref) {
    mergedStr += ` ref=${options.ref}`
  }

  if (options.q) {
    mergedStr += ` q=${options.q}`
  }

  return mergedStr
}

/**
 * Internal function that proxies GitHub requests.
 * @param {string} host - GitHub API base URL
 * @param {string} route - GitHub API request route
 * @param {object} options - Options merged into the request route
 * @returns {object} GitHub API response data
 */
const _getResponse = async (host, route, options) => {
  // console.log('CACHE MISS', responseKey)

  const octokitRef = host === 'github.ibm.com' ? octokitIbm : octokit

  const { data } = await octokitRef.request(route, {
    ...options,
    baseUrl: `https://api.${host}`
  })

  return data
}

/**
 * Returns a cached GitHub response and if it's a cache miss, initiates and caches the GitHub
 * request.
 * @param {string} host - GitHub API base URL
 * @param {string} route - GitHub API request route
 * @param {object} options - Options merged into the request route
 * @returns {Promise<object>} GitHub API response data
 */
export const getResponse = (host, route, options) => {
  const responseKey = slugifyRequest(host, route, options)
  // console.log('CACHE HIT', responseKey)

  return diskCache.wrap(responseKey, () => {
    return _getResponse(host, route, options)
  })
}

/**
 * Deletes the cached entry from the file system cache.
 * @param {string} key - Cache key
 */
export const deleteResponse = async (key) => {
  console.log('DELETE CACHED', key)

  await diskCache.del(key)
}

/**
 * Writes an image to the Next.js /public directory if that file doesn't exist yet.
 * @param {string} path - Path to a file on GitHub with the protocol removed
 * @param {Buffer} contents - Buffer created with the file's content and extension
 */
export const writeFile = async (path, contents) => {
  try {
    const exists = await fs.pathExists(`./public/${IMAGES_CACHE_PATH}/${path}`)

    if (exists) {
      console.log('FILE EXISTS', path)
    } else {
      await fs.outputFile(`./public/${IMAGES_CACHE_PATH}/${path}`, contents)

      console.log('FILE WRITE', path)
    }
  } catch (err) {
    console.error(err)
  }
}
