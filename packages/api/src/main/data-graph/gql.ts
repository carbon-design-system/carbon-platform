/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A basic tagged template literal that does nothing other than return a minified version of the
 * input string. This allows IDEs to use auto-complete and syntax highlighting.
 *
 * @param parts Input string pieces from the template.
 * @param subs Array of substitutions in the template.
 * @returns A string representation of the inputs.
 */
function gql(parts: TemplateStringsArray, ...subs: any[]): string {
  let result = parts[0] || ''

  subs.forEach((sub, i) => {
    result += String(sub)
    const part = parts[i + 1] || ''
    result += part
  })

  return result.replace(/\s+/g, ' ').trim()
}

export { gql }
