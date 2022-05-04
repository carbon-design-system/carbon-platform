/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Accordion, AccordionItem } from '@/components/accordion'
import { AnchorLink, AnchorLinks } from '@/components/anchor-links'
import ArtDirection from '@/components/art-direction'
import ArticleCard from '@/components/article-card'
import Aside from '@/components/aside'
import Caption from '@/components/caption'
import Code from '@/components/code'
import ColorPalette from '@/components/color-palette'
import { DoDont, DoDontRow } from '@/components/do-dont'
import GifPlayer from '@/components/gif-player'
import { Column, Grid, Row } from '@/components/grid-transform'
import InlineNotification from '@/components/inline-notification'
import Link from '@/components/link'
import { Blockquote, H1, H2, H3, H4, H5, H6, Image, LI, OL, P, UL } from '@/components/markdown'
import MdxWrapper from '@/components/mdx-wrapper'
import PageDescription from '@/components/page-description'
import PageTable from '@/components/page-table'
import Profile from '@/components/profile'
import ResourceCard from '@/components/resource-card'
import { Tab, Tabs } from '@/components/tabs'
import Title from '@/components/title'
import { TypeScaleTable, TypeWeight } from '@/components/type'
import TypesetStyle from '@/components/typeset-style'
import Video from '@/components/video'

import StatusIndicatorTable from '../status-indicator-table'

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
  a: Link,
  blockquote: Blockquote,
  img: Image,
  table: PageTable,
  pre: Code,
  /* Gatsby theme components */
  Caption,
  PageDescription,
  Title,
  Image,
  Accordion,
  AccordionItem,
  ArticleCard,
  Grid,
  Row,
  Column,
  AnchorLink,
  AnchorLinks,
  ArtDirection,
  DoDont,
  DoDontRow,
  GifPlayer,
  InlineNotification,
  Tabs,
  Tab,
  Video,
  MdxWrapper,
  ResourceCard,
  Aside,
  Profile,
  MdxIcon: ({ children }) => <Placeholder name="MdxIcon">{children}</Placeholder>,
  TypesetStyle,
  TypeScaleTable,
  TypeWeight,
  ColorPalette,
  StatusIndicatorTable,
  /* Gatsby theme components, not used in Carbon website, out of scope v1 */
  FeatureCard: ({ children }) => <Placeholder name="FeatureCard">{children}</Placeholder>,
  ImageCard: ({ children }) => <Placeholder name="ImageCard">{children}</Placeholder>,
  SquareCard: ({ children }) => <Placeholder name="SquareCard">{children}</Placeholder>,
  ExpressiveListContainer: ({ children }) => (
    <Placeholder name="ExpressiveListContainer">{children}</Placeholder>
  ),
  DoDontExample: ({ children }) => <Placeholder name="DoDontExample">{children}</Placeholder>,
  ExpressiveList: ({ children }) => <Placeholder name="ExpressiveList">{children}</Placeholder>
}

export default components
