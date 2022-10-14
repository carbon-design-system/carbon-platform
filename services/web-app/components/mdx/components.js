/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as mdxComponents from '@carbon-platform/mdx-components'

import Code from '@/components/code'
import ColorGrid from '@/components/color-grid'
import ColorPalette from '@/components/color-palette'
import ColorTokenTable from '@/components/color-token-table'
import FilterableDesignKitTable from '@/components/filterable-design-kit-table'
import Glossary from '@/components/glossary'
import InlineError from '@/components/inline-error'
import Link from '@/components/link'
import { Blockquote, H1, H2, H3, H4, H5, H6, Image, LI, OL, UL } from '@/components/markdown'
import MdxIcon from '@/components/mdx-icon'
import MdxPage from '@/components/mdx-page'
import FullPageError from '@/components/mdx-page/errors/full-page-error'
import PageTable from '@/components/page-table'
import Preview from '@/components/preview'
import StatusIndicatorTable from '@/components/status-indicator-table'
import IconLibrary from '@/components/svg-libraries/icon-library'
import PictogramLibrary from '@/components/svg-libraries/pictogram-library'
import { Tab, Tabs } from '@/components/tabs'
import { TypeScaleTable, TypeWeight } from '@/components/type'
import TypesetStyle from '@/components/typeset-style'

const components = {
  ...mdxComponents,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: mdxComponents.P,
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
  ColorGrid,
  ColorPalette,
  ColorTokenTable,
  FilterableDesignKitTable,
  Glossary,
  IconLibrary,
  Image,
  MdxIcon,
  MdxPage,
  PictogramLibrary,
  Preview,
  StatusIndicatorTable,
  Tab,
  Tabs,
  TypeScaleTable,
  TypesetStyle,
  TypeWeight
}

export default components
