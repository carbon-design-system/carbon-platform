/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'

/**
 * Determines if two urls belong to the same github repo
 *
 * @param {string} url1 first repo to compare
 * @param {stirng} url2 second repo to compare
 * @returns {boolean} whether the two urls belong to the same github repo or not
 */
const urlsBelongToTheSameRepo = (url1, url2) => {
  // first four chunks of urls must be equal:
  // https://github.com/org/repo/*
  return (
    JSON.stringify(
      url1
        .split('/')
        .filter((chunk) => !!chunk)
        .slice(0, 4)
    ) ===
    JSON.stringify(
      url2
        .split('/')
        .filter((chunk) => !!chunk)
        .slice(0, 4)
    )
  )
}

/**
 * finds all image nodes in tree and:
 * 1 - appends dirPath to image url if url is relative path
 * (assumes dirPath is url of base of a github repo in which the image lives)
 * 2 - Removes image nodes if relative url attempts to modify base url
 * 3 - converts image node to next/Image component
 * 4 - Adds height, width and placeholder properties to image
 *
 * @param {string} dirPath path where mdx source comes from (expected to be github repo url)
 * @param {object} tree AST: mdx source
 * @returns undefined
 */
const optimizeTreeImages = async (dirPath, tree) => {
  const matches = []
  visit(tree, { type: 'image' }, (node) => matches.push(node))

  const promises = matches.map(async (node) => {
    const isAbsolutePath = node.url.startsWith('http') || node.url.startsWith('https')

    // construct full image path (with repo url)
    const fullPath = isAbsolutePath ? node.url : path.join(dirPath, node.url, '?raw=true')

    // image is not being read from the repo, remove node
    if (!isAbsolutePath && !urlsBelongToTheSameRepo(dirPath, fullPath)) {
      remove(tree, node)
    } else {
      // get image placeholder and dimensions
      const { base64, img } = await getPlaiceholder(fullPath)

      // convert image into custom Image component
      node.type = 'mdxJsxFlowElement'
      node.name = 'Image'
      node.url = fullPath
      const nextImageAttributes = [
        { type: 'mdxJsxAttribute', name: 'blurDataURL', value: base64 },
        { type: 'mdxJsxAttribute', name: 'height', value: img?.height },
        { type: 'mdxJsxAttribute', name: 'width', value: img?.width },
        { type: 'mdxJsxAttribute', name: 'src', value: fullPath },
        { type: 'mdxJsxAttribute', name: 'alt', value: node.alt }
      ]
      if (node.attributes && node.attributes.length) {
        node.attributes.push(...nextImageAttributes)
      } else {
        node.attributes = nextImageAttributes
      }
    }
  })

  await Promise.all(promises)
}

/**
 * Constructs image optimizer plugin
 *
 * @param {string} dirPath path where mdx source comes from (expected to be github repo url)
 * @returns {Function} the image optimizer function
 */
const mdxImageOptimizerPlugin = (dirPath) => optimizeTreeImages.bind(null, dirPath)

export default mdxImageOptimizerPlugin
