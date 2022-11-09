/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxJsxTextElement } from 'mdast-util-mdx-jsx'

type Scalar = string | number | boolean

type Renderable<T> = T & RmdxNodeLike

type JsxLike = MdxJsxTextElement

type RmdxRoot = RmdxScalar | RmdxElement

interface RmdxNodeLike {
  nodeType?: string
  props?: Record<string, Scalar>
}

interface RmdxScalar extends RmdxNodeLike {
  value: Scalar
}

interface RmdxElement extends RmdxNodeLike {
  children: Array<RmdxRoot>
}

export { JsxLike, Renderable, RmdxElement, RmdxNodeLike, RmdxRoot, RmdxScalar, Scalar }
