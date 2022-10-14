/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parse } from 'node-html-parser'
import Parser from 'rss-parser'

import { cacheResponse } from '@/lib/file-cache'
const parser = new Parser()

// TODO: remove this file, use graphql endpoint instead
const getMediumFeed = async (_, res) => {
  const mediumArticles = await cacheResponse('https://medium.com/feed/carbondesign', () =>
    parser.parseURL('https://medium.com/feed/carbondesign')
  )
  mediumArticles.items.forEach(async (item) => {
    item.imgThumb = parse(item['content:encoded']).querySelector('img').getAttribute('src')
  })
  res.json(mediumArticles)
}

export default getMediumFeed
