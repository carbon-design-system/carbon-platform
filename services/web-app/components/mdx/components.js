/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Accordion, AccordionItem } from '@/components/accordion'
import { AnchorLink, AnchorLinks } from '@/components/anchor-links'
import ArtDirection from '@/components/art-direction'
import Caption from '@/components/caption'
import { DoDont, DoDontRow } from '@/components/do-dont'
import GifPlayer from '@/components/gif-player'
import { Column, Grid, Row } from '@/components/grid-transform'
import InlineNotification from '@/components/inline-notification'
import Link from '@/components/link'
import { Blockquote, H1, H2, H3, H4, H5, H6, Image, LI, OL, P, UL } from '@/components/markdown'
import PageDescription from '@/components/page-description'
import { Tab, Tabs } from '@/components/tabs'
import Title from '@/components/title'

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
  /* Custom comps */
  Caption: Caption,
  PageDescription: PageDescription,
  Title: Title,
  Image: Image,
  /* Gatsby theme components */
  Accordion: Accordion,
  AccordionItem: AccordionItem,
  Grid: Grid,
  Row: Row,
  Column: Column,
  AnchorLink: AnchorLink,
  AnchorLinks: AnchorLinks,
  ArtDirection: ArtDirection,
  DoDont: DoDont,
  DoDontRow: DoDontRow,
  GifPlayer: GifPlayer,
  InlineNotification: InlineNotification,
  Tabs: Tabs,
  Tab: Tab,
  Video: ({ children }) => <Placeholder name="Video">{children}</Placeholder>,
  DoDontExample: ({ children }) => <Placeholder name="DoDontExample">{children}</Placeholder>,
  ArticleCard: ({ children }) => <Placeholder name="ArticleCard">{children}</Placeholder>,
  Aside: ({ children }) => <Placeholder name="Aside">{children}</Placeholder>,
  FeatureCard: ({ children }) => <Placeholder name="FeatureCard">{children}</Placeholder>,
  ResourceCard: ({ children }) => <Placeholder name="ResourceCard">{children}</Placeholder>,
  ImageCard: ({ children }) => <Placeholder name="ImageCard">{children}</Placeholder>,
  SquareCard: ({ children }) => <Placeholder name="SquareCard">{children}</Placeholder>,
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
