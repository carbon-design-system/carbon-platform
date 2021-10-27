/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CACHE_PATH, IMAGE_CACHE_PATH } from '@/config/constants'

import { Octokit } from '@octokit/core'
import cacheManager from 'cache-manager'
import fsStore from 'cache-manager-fs-hash'
import fse from 'fs-extra'

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

const slugifyRequest = (route, options = {}) => {
  let mergedStr = route

  for (const [key, value] of Object.entries(options)) {
    mergedStr = mergedStr.replace(`{${key}}`, value)
  }

  return mergedStr
}

const _getResponse = async (route, options) => {
  const responseKey = slugifyRequest(route, options)

  console.log('CACHE MISS', responseKey)

  const { data } = await octokit.request(route, options)

  return data
}

export const getResponse = (route, options) => {
  const responseKey = slugifyRequest(route, options)

  console.log('CACHE HIT', responseKey)

  return diskCache.wrap(responseKey, () => {
    return _getResponse(route, options)
  })
}

export const deleteResponse = async (key) => {
  console.log('DELETE CACHED', key)

  await diskCache.del(key)
}

export const writeFile = async (path, contents) => {
  try {
    const exists = await fse.pathExists(`${IMAGE_CACHE_PATH}/${path}`)

    if (exists) {
      console.log('FILE EXISTS', path)
    } else {
      await fse.outputFile(`${IMAGE_CACHE_PATH}/${path}`, contents)

      console.log('FILE WRITE', path)
    }
  } catch (err) {
    console.error(err)
  }
}
