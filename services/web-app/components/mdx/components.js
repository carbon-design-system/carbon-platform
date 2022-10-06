/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as mdxComponents from '@carbon-platform/mdx-components'

import { Accordion, AccordionItem } from '@/components/accordion'
import ArtDirection from '@/components/art-direction'
import ArticleCard from '@/components/article-card'
import Aside from '@/components/aside'
import CardGroup from '@/components/card-group'
import Code from '@/components/code'
import ColorGrid from '@/components/color-grid'
import ColorPalette from '@/components/color-palette'
import ColorTokenTable from '@/components/color-token-table'
import Divider from '@/components/divider'
import { DoDont, DoDontRow } from '@/components/do-dont'
import FilterableDesignKitTable from '@/components/filterable-design-kit-table'
import GifPlayer from '@/components/gif-player'
import Glossary from '@/components/glossary'
import { Column, Grid, Row } from '@/components/grid-transform'
import ImageWrapper from '@/components/image-wrapper'
import InlineError from '@/components/inline-error'
import InlineNotification from '@/components/inline-notification'
import Link from '@/components/link'
import { Blockquote, H1, H2, H3, H4, H5, H6, Image, LI, OL, P, UL } from '@/components/markdown'
import MdxIcon from '@/components/mdx-icon'
import MdxPage from '@/components/mdx-page'
import FullPageError from '@/components/mdx-page/errors/full-page-error'
import MiniCard from '@/components/mini-card'
import PageDescription from '@/components/page-description'
import PageTable from '@/components/page-table'
import Preview from '@/components/preview'
import Profile from '@/components/profile'
import ResourceCard from '@/components/resource-card'
import StatusIndicatorTable from '@/components/status-indicator-table'
import StorybookDemo from '@/components/storybook-demo'
import IconLibrary from '@/components/svg-libraries/icon-library'
import PictogramLibrary from '@/components/svg-libraries/pictogram-library'
import { Tab, Tabs } from '@/components/tabs'
import Title from '@/components/title'
import { TypeScaleTable, TypeWeight } from '@/components/type'
import TypesetStyle from '@/components/typeset-style'
import Video from '@/components/video'

const components = {
  ...mdxComponents,
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
  code: ({ children }) => (
    <mdxComponents.CodeSnippet type="inline">{children}</mdxComponents.CodeSnippet>
  ),
  InlineError,
  FullPageError,
  /* Gatsby theme components */
  Accordion,
  AccordionItem,
  ArtDirection,
  ArticleCard,
  Aside,
  CardGroup,
  ColorGrid,
  ColorPalette,
  Column,
  ColorTokenTable,
  DoDont,
  DoDontRow,
  Divider,
  FilterableDesignKitTable,
  GifPlayer,
  Glossary,
  Grid,
  IconLibrary,
  Image,
  ImageWrapper,
  InlineNotification,
  MdxIcon,
  MdxPage,
  MiniCard,
  PageDescription,
  PictogramLibrary,
  Preview,
  Profile,
  ResourceCard,
  Row,
  StatusIndicatorTable,
  StorybookDemo,
  Tab,
  Tabs,
  Title,
  TypeScaleTable,
  TypesetStyle,
  TypeWeight,
  Video
}

export default components
