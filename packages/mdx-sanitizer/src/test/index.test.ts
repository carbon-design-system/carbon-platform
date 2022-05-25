/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// is there a way to import the mdx without using fs?
import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel'
import fs from 'fs'
import { Root } from 'mdast'
import path from 'path'
import remarkMdx from 'remark-mdx'
// @ts-ignore
import remarkParse from 'remark-parse'
import { Plugin, unified } from 'unified'

import mdxSanitizerPlugin from '../main/index'
import mdxWithCustomComponentsOutput from './test-files/mdx-with-custom-components/output.json'
import mdxWithExportOutput from './test-files/mdx-with-exports/output.json'
import mdxWithImportOutput from './test-files/mdx-with-imports/output.json'
import mdxWithUnknownComponentOutput from './test-files/mdx-with-unknown-component/output.json'
import simpleMdxOutput from './test-files/simple-mdx/output.json'
const sanitizer = mdxSanitizerPlugin(['customComponent1', 'customComponent2'])

const processor = unified()
  .use(remarkParse as Plugin)
  .use(remarkMdx)
  .use(remarkMarkAndUnravel as Plugin)

const __dirname = path.resolve()

test('Keeps tree as is for correct file', () => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './src/test/test-files/simple-mdx/sample.mdx'),
    'utf8'
  )

  processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
    expect(sanitizer(tree as Root)).toEqual(simpleMdxOutput)
  })
})

describe('Import/Export statements', () => {
  it('Removes import statements from file and used variables', () => {
    const mdxData = fs.readFileSync(
      path.resolve(__dirname, './src/test/test-files/mdx-with-imports/sample.mdx'),
      'utf8'
    )

    processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
      expect(sanitizer(tree as Root)).toEqual(mdxWithImportOutput)
    })
  })
  it('Removes export statements from file', async () => {
    const mdxData = fs.readFileSync(
      path.resolve(__dirname, './src/test/test-files/mdx-with-exports/sample.mdx'),
      'utf8'
    )

    processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
      expect(sanitizer(tree as Root)).toEqual(mdxWithExportOutput)
    })
  })
})

test('Does not alter custom component', async () => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './src/test/test-files/mdx-with-custom-components/sample.mdx'),
    'utf8'
  )

  processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
    expect(sanitizer(tree as Root)).toEqual(mdxWithCustomComponentsOutput)
  })
})

test('Substitutes unknown components with UnknownComponent', () => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './src/test/test-files/mdx-with-unknown-component/sample.mdx'),
    'utf8'
  )

  processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
    expect(sanitizer(tree as Root)).toEqual(mdxWithUnknownComponentOutput)
  })
})
