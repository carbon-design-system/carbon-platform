/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const matter = require('gray-matter')

const shiftNode = (node) => {
  node.position.start.line += 1
  node.position.end.line += 1

  node.children?.forEach((child) => shiftNode(child))
}

const mdxWrapperPlugin = () => (tree, file) => {
  const { data } = matter(file.value)

  // removes the frontmatter lines
  if (tree.children[0].type === 'thematicBreak') {
    tree.children.splice(0, 2)
  }

  let lastLine = 1

  tree.children?.forEach((child, index) => {
    shiftNode(child)
    if (index === tree.children.length - 1) {
      lastLine = child.position.end.line
    }
  })

  tree.children = [
    {
      type: 'mdxJsxFlowElement',
      name: 'MdxWrapper',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'frontmatter',
          value: JSON.stringify(data)
        }
      ],
      children: tree.children,
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 1
        },
        end: {
          line: lastLine + 1,
          column: 11,
          offset: 73
        }
      },
      data: {
        _mdxExplicitJsx: true
      }
    }
  ]
}

module.exports = { mdxWrapperPlugin }
