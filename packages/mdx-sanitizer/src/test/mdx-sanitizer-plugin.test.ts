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
import { createProcessor } from '@mdx-js/mdx'
import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel.js'
import test from 'ava'
import fs from 'fs'
import htmlCommentRegex from 'html-comment-regex'
import { Root } from 'mdast'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import path from 'path'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { Processor, unified } from 'unified'
import { visit } from 'unist-util-visit'
import { fileURLToPath } from 'url'
import { VFile } from 'vfile'

import { ExportFoundException, ImportFoundException } from '../main/index.js'
import { Config } from '../main/interfaces.js'
import { getConfigDefaults, mdxSanitizerPlugin } from '../main/mdx-sanitizer-plugin.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)

const strictConfig = {
  allowExports: false,
  allowImports: false,
  stripHTMLComments: true,
  fallbackComponent: () => '<UnknownComponent />',
  tagReplacements: {
    script: () => '<ScriptReplacementComponent />'
  },
  allowedComponents: ['UnknownComponent', 'PageDescription', 'div'],
  onError: () => undefined
}

const relaxedConfig = {
  allowExports: true,
  allowImports: true,
  stripHTMLComments: false,
  fallbackComponent: () => '<UnknownComponent />',
  tagReplacements: { script: () => '<ScriptReplacementComponent />' },
  allowedComponents: ['UnknownComponent', 'PageDescription', 'div'],
  onError: () => undefined
}

test('getConfigDefaults populates object with defaults if empty', (t) => {
  const defaults = getConfigDefaults({} as Config)
  t.is(defaults.allowExports, true)
  t.is(defaults.allowImports, true)
  t.is(defaults.stripHTMLComments, true)
  t.deepEqual(defaults.tagReplacements, {})
  t.deepEqual(defaults.allowedComponents, [])
  t.true(defaults.fallbackComponent !== undefined)
})

test('getConfigDefaults does not override values', (t) => {
  const defaults = getConfigDefaults(strictConfig)
  t.deepEqual(defaults, strictConfig)
})

test('mdx content stays the same if no special cases', async (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/no-errors.mdx'), 'utf8')

  const transformer = mdxSanitizerPlugin.bind(processor)(strictConfig)

  await new Promise<void>((resolve) => {
    processor.run(processor.parse({ value: mdxData }), mdxData, async (_, tree) => {
      const treeString = JSON.stringify(tree)
      transformer(tree!)
      t.deepEqual(treeString, JSON.stringify(tree))
      resolve()
    })
  })
})

test('mdxSanitizer allows for use of custom components', async (t) => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/custom-component.mdx'),
    'utf8'
  )

  const transformer = mdxSanitizerPlugin.bind(processor)(strictConfig)

  await new Promise<void>((resolve) => {
    processor.run(processor.parse({ value: mdxData }), mdxData, async (_, tree) => {
      transformer(tree!)
      let visitCount = 0
      visit(
        tree as Root,
        (node) =>
          !!(node as MdxJsxFlowElement).name &&
          (node as MdxJsxFlowElement).name === 'PageDescription',
        () => {
          visitCount++
        }
      )
      t.true(visitCount === 1)
      resolve()
    })
  })
})

test('mdxSanitizer replaces unknown component', async (t) => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/unknown-component.mdx'),
    'utf8'
  )

  const transformer = mdxSanitizerPlugin.bind(processor)(strictConfig)

  await new Promise<void>((resolve) => {
    processor.run(processor.parse({ value: mdxData }), mdxData, async (_, tree) => {
      transformer(tree!)
      let unknownComponentCount = 0
      let fallbackComponentCount = 0
      visit(
        tree as Root,
        (node) =>
          !!(node as MdxJsxFlowElement).name &&
          ((node as MdxJsxFlowElement).name === 'UnknownComponent' ||
            (node as MdxJsxFlowElement).name === 'ThisComponentDoesNotExist'),
        (node: MdxJsxFlowElement) => {
          if (node.name === 'UnknownComponent') fallbackComponentCount++
          if (node.name === 'ThisComponentDoesNotExist') unknownComponentCount++
        }
      )
      t.true(unknownComponentCount === 0)
      t.true(fallbackComponentCount === 1)

      resolve()
    })
  })
})

test('mdxSanitizer throws ImportFoundException when configured to do so', async (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/import.mdx'), 'utf8')

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, strictConfig]]
  })

  await t.throwsAsync(p.process(mdxData), { instanceOf: ImportFoundException })
})

test('mdxSanitizer does not throw ImportFoundException when not configured to do so', async (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/import.mdx'), 'utf8')

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, relaxedConfig]]
  })

  await t.notThrowsAsync(p.process(mdxData))
})

test('mdxSanitizer throws ExportFoundException when configured to do so', async (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/export.mdx'), 'utf8')

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, strictConfig]]
  })

  await t.throwsAsync(p.process(mdxData), { instanceOf: ExportFoundException })
})

test('mdxSanitizer does not throw ExportFoundException when not configured to do so', async (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/export.mdx'), 'utf8')

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, relaxedConfig]]
  })

  await t.notThrowsAsync(p.process(mdxData))
})

test('mdxSanitizer removes HTML comments when configured to do so', (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/html-comments.mdx'), 'utf8')

  const parser = { parse: (vFile: VFile) => vFile }
  const data = { value: mdxData }

  mdxSanitizerPlugin.bind(parser as unknown as Processor)(strictConfig)

  const parsedContent = parser.parse(data as VFile)

  t.falsy(htmlCommentRegex.test(String(parsedContent.value)))
})

test('mdxSanitizer does not remove HTML comments when not configured to do so', (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/html-comments.mdx'), 'utf8')

  const parser = { parse: (vFile: VFile) => vFile }
  const data = { value: mdxData }

  mdxSanitizerPlugin.bind(parser as unknown as Processor)(relaxedConfig)

  const parsedContent = parser.parse(data as VFile)

  t.truthy(htmlCommentRegex.test(String(parsedContent.value)))
})

test('mdxSanitizer replaces components when indicated in tagReplacements', async (t) => {
  let replacementCount = 0
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/script.mdx'), 'utf8')
  const p = createProcessor({
    remarkPlugins: [
      [
        mdxSanitizerPlugin,
        {
          ...strictConfig,
          onError: () => {
            replacementCount++
          }
        }
      ]
    ]
  })

  await p.process(mdxData)

  t.is(replacementCount, 1)
})
