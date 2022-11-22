import { P } from '@carbon-platform/mdx-components'
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @type {import('@carbon-platform/rmdx').NodeMapper} */
export const ParagraphMapper = ({ children, large, parentNodeType }) => {
  // TODOASKJOE: we cool with this? unwrapping images from paragraphs
  if (
    parentNodeType === 'list-item' ||
    (!Array.isArray(children) && children?.props?.astNode?.nodeType === 'image')
  ) {
    return children
  } else {
    return <P large={large}>{children}</P>
  }
}
