/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel.js'
import test from 'ava'
import fs from 'fs'
import { Root } from 'mdast'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import path from 'path'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { fileURLToPath } from 'url'

import { mdxSanitizerPlugin } from '../main/mdx-sanitizer-plugin.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)

const enforcedConfig = {
  allowExports: false,
  allowImports: false,
  stripHTMLComments: true,
  fallbackComponent: () => '<UnknownComponent />',
  tagReplacements: {},
  customComponentKeys: ['UnknownComponent', 'PageDescription']
}

test('stays the same if no special cases', async (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/no-errors.mdx'), 'utf8')

  const transformer = mdxSanitizerPlugin.bind(processor)(enforcedConfig)

  await new Promise<void>((resolve) => {
    processor.run(processor.parse({ value: mdxData }), mdxData, async (_, tree) => {
      const treeString = JSON.stringify(tree)
      await transformer(tree!)
      t.is(treeString, JSON.stringify(tree))
      resolve()
    })
  })
})

test('allows for use of custom components', async (t) => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/custom-component.mdx'),
    'utf8'
  )

  const transformer = mdxSanitizerPlugin.bind(processor)(enforcedConfig)

  await new Promise<void>((resolve) => {
    processor.run(processor.parse({ value: mdxData }), mdxData, async (_, tree) => {
      await transformer(tree!)
      resolve()
      let visitCount = 0
      console.log(JSON.stringify(tree))
      visit(
        tree as Root,
        (node) =>
          !!(node as MdxJsxFlowElement).name &&
          (node as MdxJsxFlowElement).name === 'PageDescription',
        () => {
          visitCount++
        }
      )
      t.is(visitCount, 1)
    })
  })
})

test('replaces unknown component', (t) => {
  t.pass()
})

test('throws ImportFoundException when configured to do so', (t) => {
  t.is(true, true)
})

test('does not throw ImportFoundException when not configured to do so', (t) => {
  t.is(true, true)
})

test('throws ExportFoundException when configured to do so', (t) => {
  t.is(true, true)
})

test('does not throw ExportFoundException when not configured to do so', (t) => {
  t.is(true, true)
})

test('removes HTML comments when configured to do so', (t) => {
  t.is(true, true)
})

test('does not remove HTML comments when not configured to do so', (t) => {
  t.is(true, true)
})

test('replaces components when indicated in tagReplacements', (t) => {
  t.is(true, true)
})

// is there a way to import the mdx without using fs?

// TODO: ALL OF THIS

// import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel'
// import fs from 'fs'
// import path from 'path'
// import remarkMdx from 'remark-mdx'
// import remarkParse from 'remark-parse'
// import { unified } from 'unified'
// import { fileURLToPath } from 'url'

// import mdxSanitizerPlugin from '../main/mdx-sanitizer-plugin.mjs'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const sanitizer = mdxSanitizerPlugin(['customComponent1', 'customComponent2'])

// const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)

// test('Keeps tree as is for correct file', () => {
//   const mdxData = fs.readFileSync(
//     path.resolve(__dirname, './test-files/simple-mdx/sample.mdx'),
//     'utf8'
//   )

//   const outputTreeData = fs.readFileSync(
//     path.resolve(__dirname, './test-files/simple-mdx/output.json'),
//     'utf8'
//   )

//   const outputTree = JSON.parse(outputTreeData)

//   processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
//     expect(sanitizer(tree)).toEqual(outputTree)
//   })
// })

// describe('Import/Export statements', () => {
//   it('Removes import statements from file and used variables', () => {
//     const mdxData = fs.readFileSync(
//       path.resolve(__dirname, './test-files/mdx-with-imports/sample.mdx'),
//       'utf8'
//     )

//     const outputTreeData = fs.readFileSync(
//       path.resolve(__dirname, './test-files/mdx-with-imports/output.json'),
//       'utf8'
//     )

//     const outputTree = JSON.parse(outputTreeData)

//     processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
//       expect(sanitizer(tree)).toEqual(outputTree)
//     })
//   })
//   it('Removes export statements from file', async () => {
//     const mdxData = fs.readFileSync(
//       path.resolve(__dirname, './test-files/mdx-with-exports/sample.mdx'),
//       'utf8'
//     )

//     const outputTreeData = fs.readFileSync(
//       path.resolve(__dirname, './test-files/mdx-with-exports/output.json'),
//       'utf8'
//     )

//     const outputTree = JSON.parse(outputTreeData)
//     processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
//       expect(sanitizer(tree)).toEqual(outputTree)
//     })
//   })
// })

// test('Does not alter custom component', async () => {
//   const mdxData = fs.readFileSync(
//     path.resolve(__dirname, './test-files/mdx-with-custom-components/sample.mdx'),
//     'utf8'
//   )

//   const outputTreeData = fs.readFileSync(
//     path.resolve(__dirname, './test-files/mdx-with-custom-components/output.json'),
//     'utf8'
//   )

//   const outputTree = JSON.parse(outputTreeData)
//   processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
//     expect(sanitizer(tree)).toEqual(outputTree)
//   })
// })

// test('Substitutes unknown components with UnknownComponent', () => {
//   const mdxData = fs.readFileSync(
//     path.resolve(__dirname, './test-files/mdx-with-unknown-component/sample.mdx'),
//     'utf8'
//   )

//   const outputTreeData = fs.readFileSync(
//     path.resolve(__dirname, './test-files/mdx-with-unknown-component/output.json'),
//     'utf8'
//   )

//   const outputTree = JSON.parse(outputTreeData)
//   processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
//     expect(sanitizer(tree)).toEqual(outputTree)
//   })
// })
