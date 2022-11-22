/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Code } from '@carbon-platform/mdx-components'

/** @type {import('@carbon-platform/rmdx').NodeMapper} */
export const CodeMapper = ({ code: val, lang, src, path }) => {
  return (
    <Code>
      <code className={lang} src={src} path={path}>
        {val}
      </code>
    </Code>
  )
}
