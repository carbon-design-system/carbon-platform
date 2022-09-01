/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import { RunMode, Runtime } from '@carbon-platform/api/runtime'
import { Octokit } from '@octokit/core'
import cacheManager from 'cache-manager'
import fsStore from 'cache-manager-fs-hash'
import fs from 'fs-extra'
import { optimize } from 'svgo'

import { CACHE_PATH, IMAGES_CACHE_PATH } from '@/config/constants'

const logging = new Logging({ component: 'file-cache.js' })

/**
 * If using prototyping data committed to the repo, use a crazy long ttl like a year so the cache
 * doesn't unintentionally invalidate while doing development. If using the full file cache in
 * production, use a one hour ttl.
 */
export const diskCache = cacheManager.caching({
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
export const slugifyRequest = (host, route, options = {}) => {
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
 * @returns {Promise<object>} GitHub API response data
 */
const _getResponse = async (host, route, options) => {
  const octokitRef = host === 'github.ibm.com' ? octokitIbm : octokit

  const { data } = await octokitRef.request(route, {
    ...options,
    baseUrl: `https://api.${host}`
  })

  return data
}

/**
 * Returns a cached dereferenced object response and if it's a cache miss,
 * initiates and caches the derefencing function.
 * @param {string} key - Key to use to store cache
 * @param {object} obj - object to be dereferenced
 * @param {(object) => obj} dereferencer - Function to handle dereferencing the object
 * @returns {Promise<object>} dereferenced object response data
 */
export const getDereferencedObjectResponse = (key, obj, dereferencer) => {
  return diskCache.wrap(key, () => {
    return dereferencer(obj)
  })
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

  return diskCache.wrap(responseKey, () => {
    return _getResponse(host, route, options)
  })
}

/**
 * Just like `getResponse`, but before returning a GitHub response using the cache, it attempts to
 * read the contents as a string and optimize using SVGO, returning a base64-encoded SVG.
 * @param {string} host - GitHub API base URL
 * @param {string} route - GitHub API request route
 * @param {object} options - Options merged into the request route
 * @returns {Promise<object>} GitHub API response data
 */
export const getSvgResponse = async (host, route, options = {}) => {
  const responseKey = slugifyRequest(host, route, options)

  return diskCache.wrap(responseKey, async () => {
    const data = await _getResponse(host, route, options)

    try {
      const originalSvgString = Buffer.from(data.content, data.encoding).toString('utf8')
      const optimizedSvgResult = optimize(originalSvgString)
      const optimizedSvgString = optimizedSvgResult.data

      return {
        ...data,
        content: Buffer.from(optimizedSvgString, 'utf8').toString('base64')
      }
    } catch (err) {
      logging.info(
        `Unable to optimize the SVG from ${host}/${options.owner}/${options.repo}/${options.path} with the ref ${options.ref}`
      )

      return data
    }
  })
}

/**
 * Deletes the cached entry from the file system cache.
 * @param {string} key - Cache key
 */
export const deleteResponse = async (key) => {
  logging.debug('DELETE CACHED: ' + key)

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
      logging.debug('FILE EXISTS: ' + path)
    } else {
      await fs.outputFile(`./public/${IMAGES_CACHE_PATH}/${path}`, contents)

      logging.debug('FILE WRITE: ' + path)
    }
  } catch (err) {
    logging.error(err)
  }
}
