/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
This file exports all possible components that can be used when translating/rendering RMDX on the
Carbon Platform. This includes re-exports of some Carbon components, mostly because this allows the
RMDX processor to get a list of all possible "keys" (i.e. "component names") that should show up in
the resulting RMDX output AST.
*/

export { default as Accordion, AccordionProps } from './accordion/accordion.js'
export { default as AnchorLink, AnchorLinkProps } from './anchor-links/anchor-link.js'
export { default as AnchorLinks, AnchorLinksProps } from './anchor-links/anchor-links.js'
export { default as ArtDirection, ArtDirectionProps } from './art-direction/art-direction.js'
export { default as ArticleCard, ArticleCardProps } from './article-card/article-card.js'
export { default as Aside, AsideProps } from './aside/aside.js'
export {
  default as ArrowRightButton,
  ArrowRightButtonProps
} from './buttons/arrow-right-button/arrow-right-button.js'
export {
  default as LaunchButton,
  LaunchButtonProps
} from './buttons/launch-button/launch-button.js'
export { default as Caption, CaptionProps } from './caption/caption.js'
export { default as CardGroup, CardGroupProps } from './card-group/card-group.js'
export { default as Code, CodeProps } from './code/code.js'
export { default as Divider, DividerProps } from './divider/divider.js'
export { default as DoDont, DoDontProps } from './do-dont/do-dont.js'
export { default as DoDontRow, DoDontRowProps } from './do-dont/do-dont-row.js'
export { default as GifPlayer, GifPlayerProps } from './gif-player/gif-player.js'
export { default as Column, ColumnProps } from './grid-transform/column.js'
export { default as Grid, GridProps } from './grid-transform/grid.js'
export { default as Row, RowProps } from './grid-transform/row.js'
export { default as ImageWrapper, ImageWrapperProps } from './image-wrapper/image-wrapper.js'
export {
  default as InlineNotification,
  InlineNotificationProps
} from './inline-notification/inline-notification.js'
export {
  default as ArrowRightLink,
  ArrowRightLinkProps
} from './links/arrow-right-link/arrow-right-link.js'
export { default as Blockquote, BlockquoteProps } from './markdown/blockquote.js'
export { default as H1, H1Props } from './markdown/h1.js'
export { default as H2, H2Props } from './markdown/h2.js'
export { default as H3, H3Props } from './markdown/h3.js'
export { default as H4, H4Props } from './markdown/h4.js'
export { default as H5, H5Props } from './markdown/h5.js'
export { default as H6, H6Props } from './markdown/h6.js'
export { default as LI, LiProps } from './markdown/li.js'
export { default as Link, LinkProps } from './markdown/link.js'
export { default as OL, OlProps } from './markdown/ol.js'
export { default as P, ParagraphProps } from './markdown/p.js'
export { default as UL, UlProps } from './markdown/ul.js'
export { default as MiniCard, MiniCardProps } from './mini-card/mini-card.js'
export {
  default as PageDescription,
  PageDescriptionProps
} from './page-description/page-description.js'
export { default as PageTable, PageTableProps } from './page-table/page-table.js'
export { default as Preview, PreviewProps } from './preview/preview.js'
export { default as ResourceCard, ResourceCardProps } from './resource-card/resource-card.js'
export { default as StorybookDemo, StorybookDemoProps } from './storybook-demo/storybook-demo.js'
export { default as Variant, VariantProps } from './storybook-demo/variant.js'
export { default as Tab, TabProps } from './tabs/tab.js'
export { default as Tabs, TabsProps } from './tabs/tabs.js'
export { default as Title, TitleProps } from './title/title.js'
export { default as Track, TrackProps } from './track/track.js'
export { default as Video, VideoWithSrcProps, VideoWithVimeoIdProps } from './video/video.js'

// Carbon components
export { AccordionItem, Layer } from '@carbon/react'
