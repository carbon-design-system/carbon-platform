/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getPlaiceholder } from 'plaiceholder'
import { visit } from 'unist-util-visit'

const mdxImageOptimizerPlugin = (dirPath) => async (tree) => {
  const matches = []
  visit(tree, { type: 'image' }, (node) => matches.push(node))

  const promises = matches.map(async (node) => {
    // construct full image path (with repo url)
    const fullPath = `${dirPath}/${node.url}?raw=true`

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
  })

  await Promise.all(promises)
}

export default mdxImageOptimizerPlugin
