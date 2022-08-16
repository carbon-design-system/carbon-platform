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
import test from 'ava'
import fs from 'fs'
import htmlCommentRegex from 'html-comment-regex'
import path from 'path'
import { Processor } from 'unified'
import { fileURLToPath } from 'url'
import { VFile } from 'vfile'

import { ComponentReplacedException } from '../main/exceptions/component-replaced-exception.js'
import { ExportFoundException } from '../main/exceptions/export-found-exception.js'
import { ImportFoundException } from '../main/exceptions/import-found-exception.js'
import { UnknownComponentException } from '../main/exceptions/unknown-component-exception.js'
import { Config } from '../main/interfaces.js'
import { getConfigDefaults, mdxSanitizerPlugin } from '../main/mdx-sanitizer-plugin.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

test('mdx content stays the same if no special cases', (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/no-errors.mdx'), 'utf8')

  const defaultProcessor = createProcessor()

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, strictConfig]]
  })

  const noPlugin = defaultProcessor.parse(mdxData)
  const withPlugin = p.parse(mdxData)

  t.deepEqual(JSON.stringify(withPlugin), JSON.stringify(noPlugin))
})

test('mdxSanitizer allows for use of custom components', async (t) => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/unknown-component.mdx'),
    'utf8'
  )

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, strictConfig]]
  })

  const result = await p.process(mdxData)

  t.true(result.value.includes('PageDescription'))
})

test('mdxSanitizer replaces unknown component', async (t) => {
  let visitCount = 0
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/unknown-component.mdx'),
    'utf8'
  )

  const p = createProcessor({
    remarkPlugins: [
      [
        mdxSanitizerPlugin,
        {
          ...strictConfig,
          onError: (err: Error) => {
            if (
              err instanceof UnknownComponentException &&
              err.message === 'ThisComponentDoesNotExist'
            ) {
              visitCount++
            }
          }
        }
      ]
    ]
  })

  const result = await p.process(mdxData)

  t.is(visitCount, 1)
  t.true(result.value.includes('UnknownComponent'))
  t.false(result.value.includes('ThisComponentDoesNotExist'))
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

test('mdxSanitizer throws ExportFoundException when configured to do so upon encountering a named export', async (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/export.mdx'), 'utf8')

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, strictConfig]]
  })

  await t.throwsAsync(p.process(mdxData), { instanceOf: ExportFoundException })
})

test('mdxSanitizer does not throw ExportFoundException when not configured to do so upon encountering a named export', async (t) => {
  const mdxData = fs.readFileSync(path.resolve(__dirname, './test-files/export.mdx'), 'utf8')

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, relaxedConfig]]
  })

  await t.notThrowsAsync(p.process(mdxData))
})

test('mdxSanitizer throws ExportFoundException when configured to do so upon encountering a default export', async (t) => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/default-export.mdx'),
    'utf8'
  )

  const p = createProcessor({
    remarkPlugins: [[mdxSanitizerPlugin, strictConfig]]
  })

  await t.throwsAsync(p.process(mdxData), { instanceOf: ExportFoundException })
})

test('mdxSanitizer does not throw ExportFoundException when not configured to do so upon encountering a default export', async (t) => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/default-export.mdx'),
    'utf8'
  )

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
          onError: (err: Error) => {
            console.log(err)
            if (err instanceof ComponentReplacedException && err.message === 'script') {
              replacementCount++
            }
          }
        }
      ]
    ]
  })

  await p.process(mdxData)

  t.is(replacementCount, 1)
})
