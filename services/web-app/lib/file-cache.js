/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Octokit } from '@octokit/core'
import cacheManager from 'cache-manager'
import fsStore from 'cache-manager-fs-hash'
import fs from 'fs-extra'

import { CACHE_PATH, IMAGES_CACHE_PATH } from '@/config/constants'

const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    path: CACHE_PATH,
    ttl: 60 * 60 * 24 /* seconds */,
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
 */
const slugifyRequest = (host, route, options = {}) => {
  let mergedStr = `${host} ${route}`

  for (const [key, value] of Object.entries(options)) {
    mergedStr = mergedStr.replace(`{${key}}`, value)
  }

  if (options.ref) {
    mergedStr += `?ref=${options.ref}`
  }

  return mergedStr
}

/**
 * Internal function that proxies GitHub requests.
 */
const _getResponse = async (host, route, options) => {
  const responseKey = slugifyRequest(host, route, options)

  console.log('CACHE MISS', responseKey)

  const octokitRef = host === 'github.ibm.com' ? octokitIbm : octokit

  const { data } = await octokitRef.request(route, {
    ...options,
    baseUrl: `https://api.${host}`
  })

  return data
}

/**
 * Returns a cached GitHub response and if it's a cache miss, initiate and cache the GitHub request.
 */
export const getResponse = (host, route, options) => {
  const responseKey = slugifyRequest(host, route, options)

  console.log('CACHE HIT', responseKey)

  return diskCache.wrap(responseKey, () => {
    return _getResponse(host, route, options)
  })
}

/**
 * Deletes the cached entry from the file system cache.
 */
export const deleteResponse = async (key) => {
  console.log('DELETE CACHED', key)

  await diskCache.del(key)
}

/**
 * Writes an image to the Next.js /public directory if that file doesn't exist yet.
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
