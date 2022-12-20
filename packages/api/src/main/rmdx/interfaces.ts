/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface RmdxMessage {
  srcMdx: string
}

// TODO: make this more specific
interface RmdxResponse {
  frontmatter: Record<string, unknown>
  ast: Record<string, unknown>
  errors: Array<unknown>
}

export { RmdxMessage, RmdxResponse }
