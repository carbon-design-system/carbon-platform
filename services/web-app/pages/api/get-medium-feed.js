/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Parser from 'rss-parser'

import { cacheResponse } from '@/lib/file-cache'
const parser = new Parser()

// in the future we probably consume this out of one of the graphql endpoints?
const getMediumFeed = async (_, res) => {
  const mediumArticles = await cacheResponse('https://medium.com/feed/carbondesign', () =>
    parser.parseURL('https://medium.com/feed/carbondesign')
  )
  res.json(mediumArticles)
}

export default getMediumFeed
