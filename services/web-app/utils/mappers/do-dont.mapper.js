import { DoDont } from '@carbon-platform/mdx-components'
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const DoDontMapper = ({
  children,
  caption,
  captionTitle,
  text,
  aspectRatio,
  color,
  type,
  colLg,
  colMd
}) => (
  <DoDont
    caption={caption}
    captionTitle={captionTitle}
    text={text}
    aspectRatio={aspectRatio}
    color={color}
    type={type}
    colLg={colLg}
    colMd={colMd}
  >
    {children}
  </DoDont>
)
