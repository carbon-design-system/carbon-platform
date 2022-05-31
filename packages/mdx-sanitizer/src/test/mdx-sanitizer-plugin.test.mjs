/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// is there a way to import the mdx without using fs?
import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel'
import fs from 'fs'
import path from 'path'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { fileURLToPath } from 'url'

import mdxSanitizerPlugin from '../main/mdx-sanitizer-plugin.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sanitizer = mdxSanitizerPlugin(['customComponent1', 'customComponent2'])

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)

test('Keeps tree as is for correct file', () => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/simple-mdx/sample.mdx'),
    'utf8'
  )

  const outputTreeData = fs.readFileSync(
    path.resolve(__dirname, './test-files/simple-mdx/output.json'),
    'utf8'
  )

  const outputTree = JSON.parse(outputTreeData)

  processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
    expect(sanitizer(tree)).toEqual(outputTree)
  })
})

describe('Import/Export statements', () => {
  it('Removes import statements from file and used variables', () => {
    const mdxData = fs.readFileSync(
      path.resolve(__dirname, './test-files/mdx-with-imports/sample.mdx'),
      'utf8'
    )

    const outputTreeData = fs.readFileSync(
      path.resolve(__dirname, './test-files/mdx-with-imports/output.json'),
      'utf8'
    )

    const outputTree = JSON.parse(outputTreeData)

    processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
      expect(sanitizer(tree)).toEqual(outputTree)
    })
  })
  it('Removes export statements from file', async () => {
    const mdxData = fs.readFileSync(
      path.resolve(__dirname, './test-files/mdx-with-exports/sample.mdx'),
      'utf8'
    )

    const outputTreeData = fs.readFileSync(
      path.resolve(__dirname, './test-files/mdx-with-exports/output.json'),
      'utf8'
    )

    const outputTree = JSON.parse(outputTreeData)
    processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
      expect(sanitizer(tree)).toEqual(outputTree)
    })
  })
})

test('Does not alter custom component', async () => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/mdx-with-custom-components/sample.mdx'),
    'utf8'
  )

  const outputTreeData = fs.readFileSync(
    path.resolve(__dirname, './test-files/mdx-with-custom-components/output.json'),
    'utf8'
  )

  const outputTree = JSON.parse(outputTreeData)
  processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
    expect(sanitizer(tree)).toEqual(outputTree)
  })
})

test('Substitutes unknown components with UnknownComponent', () => {
  const mdxData = fs.readFileSync(
    path.resolve(__dirname, './test-files/mdx-with-unknown-component/sample.mdx'),
    'utf8'
  )

  const outputTreeData = fs.readFileSync(
    path.resolve(__dirname, './test-files/mdx-with-unknown-component/output.json'),
    'utf8'
  )

  const outputTree = JSON.parse(outputTreeData)
  processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
    expect(sanitizer(tree)).toEqual(outputTree)
  })
})
