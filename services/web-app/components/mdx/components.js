/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Link from '@/components/link'
import { Blockquote, H1, H2, H3, H4, H5, H6, LI, OL, P, UL } from '@/components/markdown'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  ol: OL,
  li: LI,
  ul: UL,
  /* TODO: get nested lists working issue #309
    'li.ul': (props) => <UnorderedList isExpressive nested {...props} /> ,
    'li.ol': (props) => <OrderedList isExpressive nested {...props} />, */
  a: Link,
  blockquote: Blockquote
}

export default components
