/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Code } from '@carbon-platform/mdx-components'

/** @type {import('@carbon-platform/rmdx').Renderer} */
export const CodeRenderer = ({ children, lang, meta }) => {
  const metaParts = meta.split(' ')

  const src = metaParts.find((part) => part.startsWith('src='))?.split('=')[1]
  const path = metaParts.find((part) => part.startsWith('path='))?.split('=')[1]

  return (
    <Code lang={lang} src={src} path={path}>
      {children}
    </Code>
  )
}
