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
import { Image } from '@/components/image'
import MdxIcon from '@/components/mdx-icon'
import MdxNotification from '@/components/mdx-notification/index'
import MdxPage from '@/components/mdx-page'
import FullPageError from '@/components/mdx-page/errors/full-page-error'
import StatusIndicatorTable from '@/components/status-indicator-table'
import IconLibrary from '@/components/svg-libraries/icon-library'
import PictogramLibrary from '@/components/svg-libraries/pictogram-library'
import TypesetStyle from '@/components/typeset-style'

const components = {
  ...mdxComponents,
  h1: mdxComponents.H1,
  h2: mdxComponents.H2,
  h3: mdxComponents.H3,
  h4: mdxComponents.H4,
  h5: mdxComponents.H5,
  h6: mdxComponents.H6,
  p: mdxComponents.P,
  ol: mdxComponents.OL,
  li: mdxComponents.LI,
  ul: mdxComponents.UL,
  a: mdxComponents.Link,
  blockquote: mdxComponents.Blockquote,
  img: Image,
  table: mdxComponents.PageTable,
  pre: Code,
  code: ({ children }) => (
    <mdxComponents.CodeSnippet type="inline">{children}</mdxComponents.CodeSnippet>
  ),
  MdxNotification,
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
  StatusIndicatorTable,
  TypesetStyle
}

export default components
