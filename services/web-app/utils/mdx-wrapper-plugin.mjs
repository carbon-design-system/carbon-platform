/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel.js'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { matter } from 'vfile-matter'

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)

const mdxWrapperPlugin = () => (tree, file) => {
  const { data } = matter(file)

  // removes the frontmatter lines
  if (tree.children[0].type === 'thematicBreak') {
    tree.children.splice(0, 2)
  }

  const mdxPageString = `
<MdxPage
  title="${data?.matter?.title || 'Title is missing!'}"
  description="${data?.matter?.description || ''}"
  tabs={${JSON.stringify(data?.matter?.tabs || [])}}
  keywords={${JSON.stringify(data?.matter?.keywords || [])}}
  pageHeaderType="${data?.matter?.pageHeaderType || ''}"
/>
`

  const childTree = processor.parse({ value: mdxPageString }).children[0]
  childTree.children = tree.children
  tree.children = [childTree]
}

export { mdxWrapperPlugin }
