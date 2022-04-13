/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from '@/components/link'
import { Blockquote, H1, H2, H3, H4, H5, H6, Image, LI, OL, P, UL } from '@/components/markdown'

const Placeholder = ({ name, children }) => {
  return (
    <div
      style={{
        background: 'white',
        border: '1px dotted #8d8d8d',
        margin: '16px',
        padding: '16px'
      }}
    >
      <strong>{name}</strong>
      <div>{children}</div>
    </div>
  )
}

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
  blockquote: Blockquote,
  img: Image,
  Image: (props) => (
    <P>
      <Image {...props}></Image>
    </P>
  ),
  /* Gatsby theme components */
  PageDescription: ({ children }) => <Placeholder name="PageDescription">{children}</Placeholder>,
  AnchorLinks: ({ children }) => <Placeholder name="AnchorLinks">{children}</Placeholder>,
  AnchorLink: ({ children }) => <Placeholder name="AnchorLink">{children}</Placeholder>,
  Row: ({ children }) => <Placeholder name="Row">{children}</Placeholder>,
  Column: ({ children }) => <Placeholder name="Column">{children}</Placeholder>,
  Video: ({ children }) => <Placeholder name="Video">{children}</Placeholder>,
  DoDontExample: ({ children }) => <Placeholder name="DoDontExample">{children}</Placeholder>,
  DoDontRow: ({ children }) => <Placeholder name="DoDontRow">{children}</Placeholder>,
  DoDont: ({ children }) => <Placeholder name="DoDont">{children}</Placeholder>,
  GifPlayer: ({ children }) => <Placeholder name="GifPlayer">{children}</Placeholder>,
  ArticleCard: ({ children }) => <Placeholder name="ArticleCard">{children}</Placeholder>,
  Aside: ({ children }) => <Placeholder name="Aside">{children}</Placeholder>,
  FeatureCard: ({ children }) => <Placeholder name="FeatureCard">{children}</Placeholder>,
  ResourceCard: ({ children }) => <Placeholder name="ResourceCard">{children}</Placeholder>,
  ImageCard: ({ children }) => <Placeholder name="ImageCard">{children}</Placeholder>,
  SquareCard: ({ children }) => <Placeholder name="SquareCard">{children}</Placeholder>,
  Tabs: ({ children }) => <Placeholder name="Tabs">{children}</Placeholder>,
  Tab: ({ children }) => <Placeholder name="Tab">{children}</Placeholder>,
  Title: ({ children }) => <Placeholder name="Title">{children}</Placeholder>,
  InlineNotification: ({ children }) => (
    <Placeholder name="InlineNotification">{children}</Placeholder>
  ),
  ExpressiveListContainer: ({ children }) => (
    <Placeholder name="ExpressiveListContainer">{children}</Placeholder>
  ),
  ExpressiveList: ({ children }) => <Placeholder name="ExpressiveList">{children}</Placeholder>,
  /* Carbon website components */
  Profile: ({ children }) => <Placeholder name="Profile">{children}</Placeholder>,
  MdxIcon: ({ children }) => <Placeholder name="MdxIcon">{children}</Placeholder>,
  ComponentDemo: ({ children }) => <Placeholder name="ComponentDemo">{children}</Placeholder>,
  ComponentVariant: ({ children }) => <Placeholder name="ComponentVariant">{children}</Placeholder>,
  ListSection: ({ children }) => (
    <Placeholder name="ComponeListSectiontDemo">{children}</Placeholder>
  ),
  ColorPalette: ({ children }) => <Placeholder name="ColorPalette">{children}</Placeholder>,
  StatusIndicatorTable: ({ children }) => (
    <Placeholder name="StatusIndicatorTable">{children}</Placeholder>
  )
}

export default components
