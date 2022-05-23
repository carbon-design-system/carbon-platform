/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import mdxSanitizerPlugin from '../main/index'
import mdxWithCustomComponentsInput from './test-files/mdx-with-custom-components/input.json'
import mdxWithCustomComponentsOutput from './test-files/mdx-with-custom-components/output.json'
import mdxWithExportInput from './test-files/mdx-with-exports/input.json'
import mdxWithExportOutput from './test-files/mdx-with-exports/output.json'
import mdxWithImportInput from './test-files/mdx-with-imports/input.json'
import mdxWithImportOutput from './test-files/mdx-with-imports/output.json'
import mdxWithUnknownComponentInput from './test-files/mdx-with-unknown-component/input.json'
import mdxWithUnknownComponentOutput from './test-files/mdx-with-unknown-component/output.json'
import simpleMdxInput from './test-files/simple-mdx/input.json'
import simpleMdxOutput from './test-files/simple-mdx/output.json'

const sanitizer = mdxSanitizerPlugin(['customComponent1', 'customComponent2'])

test('Keeps tree as is for correct file', () => {
  expect(sanitizer(simpleMdxInput)).toEqual(simpleMdxOutput)
})

describe('Import/Export statements', () => {
  it('Removes import statements from file and used variables', () => {
    expect(sanitizer(mdxWithImportInput)).toEqual(mdxWithImportOutput)
  })
  it('Removes export statements from file', () => {
    expect(sanitizer(mdxWithExportInput)).toEqual(mdxWithExportOutput)
  })
})

test('Does not alter custom component', () => {
  expect(sanitizer(mdxWithCustomComponentsInput)).toEqual(mdxWithCustomComponentsOutput)
})

test('Substitutes unknown components with UnknownComponent', () => {
  expect(sanitizer(mdxWithUnknownComponentInput)).toEqual(mdxWithUnknownComponentOutput)
})
