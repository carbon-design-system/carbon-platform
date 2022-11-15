/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { process, RmdxNode } from '@carbon-platform/rmdx'
import React from 'react'

import { AccordionMapper } from '@/utils/mappers/accordion.mapper'
import { AccordionItemMapper } from '@/utils/mappers/accordion-item.mapper'
import { AnchorLinkMapper } from '@/utils/mappers/anchor-link.mapper'
import { AnchorLinksMapper } from '@/utils/mappers/anchor-links.mapper'
import { AsideMapper } from '@/utils/mappers/aside.mapper'
import { BlockquoteMapper } from '@/utils/mappers/blockquote.mapper'
import { CaptionMapper } from '@/utils/mappers/caption.mapper'
import { ColumnMapper } from '@/utils/mappers/column.mapper'
import { DivMapper } from '@/utils/mappers/div.mapper'
import { DividerMapper } from '@/utils/mappers/divider.mapper'
import { DoDontMapper } from '@/utils/mappers/do-dont.mapper'
import { DoDontRowMapper } from '@/utils/mappers/do-dont-row.mapper'
import { GridMapper } from '@/utils/mappers/grid.mapper'
import { H1Mapper } from '@/utils/mappers/h1.mapper'
import { H2Mapper } from '@/utils/mappers/h2.mapper'
import { H3Mapper } from '@/utils/mappers/h3.mapper'
import { H4Mapper } from '@/utils/mappers/h4.mapper'
import { H5Mapper } from '@/utils/mappers/h5.mapper'
import { H6Mapper } from '@/utils/mappers/h6.mapper'
import { ImgMapper } from '@/utils/mappers/img.mapper'
import { InlineNotificationMapper } from '@/utils/mappers/inline-notification.mapper'
import { LinkMapper } from '@/utils/mappers/link.mapper'
import { PageDescriptionMapper } from '@/utils/mappers/page-description.mapper'
import { PageTableMapper } from '@/utils/mappers/page-table.mapper'
import { ParagraphMapper } from '@/utils/mappers/paragraph.mapper'
import { PreviewMapper } from '@/utils/mappers/preview.mapper'
import { RowMapper } from '@/utils/mappers/row.mapper'
import { SpanMapper } from '@/utils/mappers/span.mapper'
import { StrongMapper } from '@/utils/mappers/strong.mapper'
import { TabMapper } from '@/utils/mappers/tab.mapper'
import { TabsMapper } from '@/utils/mappers/tabs.mapper'
import { TitleMapper } from '@/utils/mappers/title.mapper'
import { UniversalMapper } from '@/utils/mappers/universal.mapper'

const components = {
  // html
  blockquote: BlockquoteMapper,
  document: UniversalMapper,
  div: DivMapper,
  'heading-1': H1Mapper,
  'heading-2': H2Mapper,
  'heading-3': H3Mapper,
  'heading-4': H4Mapper,
  'heading-5': H5Mapper,
  'heading-6': H6Mapper,
  img: ImgMapper,
  image: ImgMapper,
  link: LinkMapper,
  paragraph: ParagraphMapper,
  span: SpanMapper,
  strong: StrongMapper,
  table: PageTableMapper,
  text: UniversalMapper,
  td: ({ children }) => <td>{children}</td>,
  th: ({ children }) => <th>{children}</th>,
  tr: ({ children }) => <tr>{children}</tr>,
  // components
  Accordion: AccordionMapper,
  AccordionItem: AccordionItemMapper,
  AnchorLink: AnchorLinkMapper,
  AnchorLinks: AnchorLinksMapper,
  Aside: AsideMapper,
  Caption: CaptionMapper,
  Column: ColumnMapper,
  Divider: DividerMapper,
  DoDont: DoDontMapper,
  DoDontRow: DoDontRowMapper,
  Grid: GridMapper,
  H1: H1Mapper,
  H2: H2Mapper,
  H3: H3Mapper,
  H4: H4Mapper,
  H5: H5Mapper,
  H6: H6Mapper,
  InlineNotification: InlineNotificationMapper,
  Link: LinkMapper,
  PageDescription: PageDescriptionMapper,
  PageTable: PageTableMapper,
  Preview: PreviewMapper,
  Row: RowMapper,
  Tab: TabMapper,
  Tabs: TabsMapper,
  Title: TitleMapper
}

const mdx = `
## Headings

# first level heading
## second level heading
### third level heading
#### fourth level heading
##### fifth level heading
###### sixth level heading
<H2 noAnchor> second level no anchor </H2>

## Link

[This is a link](https://ibm.com)
<Link href="https://ibm.com" disabled>This is also a link</Link>

## Div

<div>hi</div>

## Accordion

<Accordion>
  <AccordionItem title="Title 1">Content Section</AccordionItem>
  <AccordionItem title="Title 2" open>Content Section</AccordionItem>
  <AccordionItem title="Title 3" disabled>Content Section</AccordionItem>
</Accordion>

## Preview

<Preview
  height="400"
  title="Carbon Tutorial Step 5"
  src="https://react-step-6--carbon-tutorial.netlify.com"
  frameborder="no"
  allowtransparency="true"
  allowfullscreen="true"
/>

## Grid

### Example

<Row>
  <Column colMd={4} colLg={4}>
    Hi
  </Column>
  <Column colMd={4} colLg={4}>
    Hi
  </Column>
  <Column colMd={4} colLg={4}>
    Hi
  </Column>
</Row>

### No gutter left -> translate to narrow grid mode

<Row>
  <Column colMd={4} colLg={4} noGutterMdLeft>
    Hi
  </Column>
  <Column colMd={4} colLg={4} noGutterMdLeft>
    Hi
  </Column>
  <Column colMd={4} colLg={4} noGutterMdLeft>
    Hi
  </Column>
</Row>

### No gutter -> translate to condensed grid mode

<Row>
  <Column colMd={4} colLg={4} noGutterSm>
    Hi
  </Column>
  <Column colMd={4} colLg={4} noGutterSm>
    Hi
  </Column>
  <Column colMd={4} colLg={4} noGutterSm>
    Hi
  </Column>
</Row>

### Offset

<Row>
  <Column colMd={4} colLg={4} offsetLg={4}>
    Hi
  </Column>
  <Column colMd={4} colLg={4}>
    Hi
  </Column>
</Row>

## CSS Grid examples

### Default

<Grid>
  <Column md={4} lg={4}>
    Hi
  </Column>
  <Column md={4} lg={4}>
    Hi
  </Column>
  <Column md={4} lg={4}>
    Hi
  </Column>
</Grid>

### Narrow

<Grid narrow>
  <Column md={4} lg={4}>
    Hi
  </Column>
  <Column md={4} lg={4}>
    Hi
  </Column>
  <Column md={4} lg={4}>
    Hi
  </Column>
</Grid>

### Condensed

<Grid condensed>
  <Column md={4} lg={4}>
    Hi
  </Column>
  <Column md={4} lg={4}>
    Hi
  </Column>
  <Column md={4} lg={4}>
    Hi
  </Column>
</Grid>

### Offset

<Grid>
  <Column md={4} lg={{ span: 4, offset: 4 }}>
    Hi
  </Column>
  <Column md={4} lg={4}>
    Hi
  </Column>
</Grid>


## Divider

<Divider>
  <Grid>
    <Column sm={4} md={2} lg={4}>
      <div>
        <strong>v1.0</strong>
      </div>
      <div>
        Target release: <div>June</div>
      </div>
    </Column>
    <Column sm={4} md={6} lg={8}>
    The platform's first major release will help system users discover and learn about all the assets
    and libraries in the system with confidence in their completeness, who maintains them, and how to
    use them. System users can access documentation for all indexed assets and libraries without leaving
    the platform.

    The platform's first major release will help system users discover and learn about all the assets
    and libraries in the system with confidence in their completeness, who maintains them, and how to
    use them. System users can access documentation for all indexed assets and libraries without leaving
    the platform.

    </Column>

  </Grid>
</Divider>

## PageDescription

<PageDescription>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat ex massa, in tincidunt ipsum
tempor in. Maecenas ultrices sem nec blandit dictum. [Pellentesque]() fermentum ullamcorper pretium.
Duis turpis elit, facilisis nec elit id, fermentum porttitor nisl. Nulla dignissim euismod maximus.
Cras euismod facilisis rutrum. Etiam nisi sem, malesuada auctor pretium vel, ullamcorper sed mi. In
hac habitasse platea dictumst.

</PageDescription>

## Caption

<Caption>Lorem ipsum dolor sit amet Lorem Lorem Lorem Lorem Lorem Lorem ipsum.</Caption>


## Title

<Title>This is a title</Title>

## InlineNotification

#### Info

<InlineNotification>

**Lorem ipsum:** dolor sit amet, [consectetur adipiscing](/components/InlineNotification) elit.
Curabitur ac odio arcu. Vestibulum egestas eleifend porttitor. Quisque malesuada pulvinar
pellentesque. Nunc dictum odio eu enim venenatis fringilla. Nunc finibus enim dui, a tempus quam
commodo vitae. Donec non eros gravida dolor porta suscipit non vel quam.

</InlineNotification>

#### Error

<InlineNotification kind="error">

**Error:** dolor sit amet, [consectetur adipiscing](/components/InlineNotification) elit. Curabitur
ac odio arcu. Vestibulum egestas eleifend porttitor. Quisque malesuada pulvinar pellentesque. Nunc
dictum odio eu enim venenatis fringilla. Nunc finibus enim dui, a tempus quam commodo vitae. Donec
non eros gravida dolor porta suscipit non vel quam.

</InlineNotification>

#### Warning

<InlineNotification kind="warning">

**Warning:** dolor sit amet, [consectetur adipiscing](/components/InlineNotification) elit.
Curabitur ac odio arcu. Vestibulum egestas eleifend porttitor. Quisque malesuada pulvinar
pellentesque. Nunc dictum odio eu enim venenatis fringilla. Nunc finibus enim dui, a tempus quam
commodo vitae. Donec non eros gravida dolor porta suscipit non vel quam.

</InlineNotification>

#### Success

<InlineNotification kind="success">

**Success:** dolor sit amet, [consectetur adipiscing](/components/InlineNotification) elit.
Curabitur ac odio arcu. Vestibulum egestas eleifend porttitor. Quisque malesuada pulvinar
pellentesque. Nunc dictum odio eu enim venenatis fringilla. Nunc finibus enim dui, a tempus quam
commodo vitae. Donec non eros gravida dolor porta suscipit non vel quam.

</InlineNotification>

## DoDont

<DoDontRow>

<DoDont type="do" aspectRatio="1:1" text="This is some text" />

<DoDont type="dont" aspectRatio="1:1" text="This is some text" color="dark" />

</DoDontRow>

<DoDontRow>

<DoDont
  text="This is some text that is 8 columns"
  color="dark"
  captionTitle="Caption title"
  caption="Caption"
  colLg="8"
  type="do"
/>

</DoDontRow>

<DoDontRow>

<DoDont aspectRatio="4:3" text="4:3"  type="do" />

<DoDont aspectRatio="16:9" text="16:9" type="do" />

<DoDont aspectRatio="2:1" text="2:1" type="do" />

</DoDontRow>

<DoDontRow>

<DoDont aspectRatio="9:16" text="9:16" type="do" />

<DoDont aspectRatio="1:2" text="1:2" type="do" />

<DoDont aspectRatio="3:4" text="3:4" type="do" />

</DoDontRow>
<DoDontRow>

<DoDont aspectRatio="1:1" text="1:1" type="do" />

</DoDontRow>

## Tabs

<Tabs>

    <Tab label="Bla bla">

    bla bla bla bla bla bla bla bla bla.

    </Tab>

    <Tab label="More bla">
    bla bla bla bla bla bla bla bla bla.
    </Tab>

</Tabs>



`

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- will remove later
const toTest = `
## AnchorLinks <- children issue

<AnchorLinks>
  <AnchorLink>Link 1</AnchorLink>
  <AnchorLink>Link 2</AnchorLink>
  <AnchorLink>Link 3</AnchorLink>
  <AnchorLink>Link 4</AnchorLink>
  <AnchorLink>Link 5</AnchorLink>
  <AnchorLink>Link 6</AnchorLink>
  <AnchorLink>Link 7</AnchorLink>
</AnchorLinks>

<AnchorLinks small>
  <AnchorLink>Small link 1</AnchorLink>
  <AnchorLink>Small link 2</AnchorLink>
  <AnchorLink>Small link 3</AnchorLink>
</AnchorLinks>

## Blockquote <- no handler

 > Without aesthetic, design is either the humdrum repetition of familiar clichés
 > or a wild scramble for novelty. Without aesthetic, the computer is but a
 > mindless speed machine, producing effects without substance, form without
 > relevant content, or content without meaningful form.
 >
 > <cite>– Paul Rand</cite>

 ## PageTable <- problem with children

| Header 1 | Header 2 | Header 3 |
| ---- | ---- | ----------- |
| Cell 1-1 | Cell 1-2 | Cell 1-3 |
| Cell 2-1 | Cell 2-2 | Cell 2-3 |

<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>


`

const RmdxTest = () => {
  const ast = process(mdx, Object.keys(components))

  console.log(JSON.stringify(ast, undefined, 2))

  return <RmdxNode components={components} astNode={ast} />
}

export default RmdxTest
