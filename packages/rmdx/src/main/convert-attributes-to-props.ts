/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxJsxAttribute, MdxJsxExpressionAttribute } from 'mdast-util-mdx-jsx'

import { Scalar } from './interfaces.js'

/**
 * Converts attributes on MDX JSX elements to a sanitized set of prop values.
 *
 * Examples of supported attribute/prop types are:
 *
 * - `<Good foo />`
 * - `<Good foo="bar" />`
 * - `<Good foo={false} />`
 * - `<Good foo={12} />`
 *
 * Examples of **un**supported attribute/prop types are:
 *
 * - `<Bad {...foo} />`
 * - `<Bad foo={undefined} />`
 * - `<Bad foo={() => 7} />`
 * - `<Bad foo={`hello ${world}`} />`
 *
 * @param attributes
 * @returns
 */
function convertAttributesToProps(attributes: Array<MdxJsxAttribute | MdxJsxExpressionAttribute>) {
  const props: Record<string, Scalar> = {}

  // NOTE! There is no default behavior here for any attr/prop. Only specific situations allow an
  // attribute to end up as a prop.
  attributes.forEach((attr) => {
    // Guard - disregard expression attrs with no name
    if (attr.type === 'mdxJsxExpressionAttribute') {
      return
    }

    // Guard - disregard attrs with undefined values
    if (attr.value === undefined) {
      return
    }

    // A null attr value indicates the presence of the prop, but with no value
    // React treats these as "true"
    if (attr.value === null) {
      props[attr.name] = true
      return
    }

    // String
    if (typeof attr.value === 'string') {
      props[attr.name] = attr.value
      return
    }

    // Boolean
    if (attr.value.value === 'true' || attr.value.value === 'false') {
      props[attr.name] = attr.value.value === 'true'
    }

    // Number
    if (attr.value.value === String(Number.parseFloat(attr.value.value))) {
      props[attr.name] = Number.parseFloat(attr.value.value)
    }
  })

  return props
}

export { convertAttributesToProps }
