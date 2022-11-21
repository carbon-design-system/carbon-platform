/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as MdxComponents from '@carbon-platform/mdx-components'
import { process, RmdxNode } from '@carbon-platform/rmdx'
import Link from 'next/link'
import React from 'react'

import { AnchorLinkMapper } from '@/utils/mappers/anchor-link.mapper'
import { DivMapper } from '@/utils/mappers/div.mapper'
import { ImgMapper } from '@/utils/mappers/img.mapper'
import { ParagraphMapper } from '@/utils/mappers/paragraph.mapper'
import { RowMapper } from '@/utils/mappers/row.mapper'
import { SpanMapper } from '@/utils/mappers/span.mapper'
import { StorybookDemoMapper } from '@/utils/mappers/storybook-demo.mapper'
import { StrongMapper } from '@/utils/mappers/strong.mapper'
import { TabsMapper } from '@/utils/mappers/tabs.mapper'
import { UniversalMapper } from '@/utils/mappers/universal.mapper'

/** @type {import('@carbon-platform/rmdx').NodeMappers} */
// TODOASKJOE: I have some html elements here
const components = {
  ...MdxComponents,
  AnchorLink: AnchorLinkMapper,
  'unordered-list': MdxComponents.UL,
  'ordered-list': MdxComponents.OL,
  'list-item': MdxComponents.LI,
  Row: RowMapper,
  StorybookDemo: StorybookDemoMapper,
  Tabs: TabsMapper,
  // html
  blockquote: MdxComponents.Blockquote,
  document: UniversalMapper,
  div: DivMapper,
  'heading-1': MdxComponents.H1,
  'heading-2': MdxComponents.H2,
  'heading-3': MdxComponents.H3,
  'heading-4': MdxComponents.H4,
  'heading-5': MdxComponents.H5,
  'heading-6': MdxComponents.H6,
  img: ImgMapper,
  image: ImgMapper,
  link: Link,
  paragraph: ParagraphMapper,
  span: SpanMapper,
  strong: StrongMapper,
  table: MdxComponents.PageTable,
  text: UniversalMapper,
  td: ({ children }) => <td>{children}</td>,
  th: ({ children }) => <th>{children}</th>,
  tr: ({ children }) => <tr>{children}</tr>,
  track: ({ src, srcLang, kind, default: defaultTrackProp }) => (
    <track src={src} srcLang={srcLang} kind={kind} default={defaultTrackProp} />
  )
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

## Gatsby grid examples

### Example

<Row>
  <Column colMd={4} colLg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column colMd={4} colLg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column colMd={4} colLg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
</Row>

### No gutter left -> translate to narrow grid mode

<Row>
  <Column colMd={4} colLg={4} noGutterMdLeft>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column colMd={4} colLg={4} noGutterMdLeft>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column colMd={4} colLg={4} noGutterMdLeft>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
</Row>

### No gutter -> translate to condensed grid mode

<Row>
  <Column colMd={4} colLg={4} noGutterSm>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column colMd={4} colLg={4} noGutterSm>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column colMd={4} colLg={4} noGutterSm>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
</Row>

### Offset

<Row>
  <Column colMd={4} colLg={4} offsetLg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column colMd={4} colLg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
</Row>

## CSS Grid examples

### Default

<Grid>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
</Grid>

### Narrow

<Grid narrow>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
</Grid>

### Condensed

<Grid condensed>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
</Grid>

### Offset

<Grid>
  <Column md={4} lg={{ span: 4, offset: 4 }}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
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
    bla bla bla bla bla bla bla bla bla. but this is the second bla
    </Tab>

</Tabs>


## AnchorLinks

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

## Blockquote

> Without aesthetic, design is either the humdrum repetition of familiar clichés
> or a wild scramble for novelty. Without aesthetic, the computer is but a
> mindless speed machine, producing effects without substance, form without
> relevant content, or content without meaningful form.

## img

![RIP Roberto](/carbon.png)

## List

### UL

- LI
- LI > UL
  - Unordered Nested
  - Unordered Nested
- LI > OL
  1. Ordered Nested
  2. Ordered Nested

### OL

1. LI
2. LI > UL
   - Unordered Nested
   - Unordered Nested
   - Unordered Nested
3. LI > OL
   1. Ordered Nested
   2. Ordered Nested
   3. LI > OL > UL
      - Unordered Double Nested

## StorybookDemo

  <StorybookDemo
      wide
      tall
      url="https://react.carbondesignsystem.com"
      themeSelector
    >
      <Variant label="Skeleton" variant="components-button--skeleton" />
      <Variant label="Set of buttons" variant="components-button--set-of-buttons" />
      <Variant label="Icon button" variant="components-button--icon-button" />
      <Variant label="Danger" variant="components-button--danger" />
      <Variant label="Ghost" variant="components-button--ghost" />
      <Variant label="Tertiary" variant="components-button--tertiary" />
      <Variant label="Secondary" variant="components-button--secondary" />
      <Variant label="Button" variant="components-button--default" />
    </StorybookDemo>

    ## Video

    <Video title="Carbon homepage video" vimeoId="322021187" />

    <Video src="/videos/hero-video.mp4" poster="/videos/poster.png">
      <track kind="captions" default src="/videos/hero-video.vtt" srcLang="en" />
    </Video>

    <Video src="/videos/hero-video.mp4" poster="/videos/poster.png" />

    ### inside of DoDont

    <DoDontRow>

    <DoDont aspectRatio="1:1" type="do">

    <Video src="/videos/hero-video.mp4" poster="/videos/poster.png" />

    </DoDont>

    <DoDont aspectRatio="1:1" type="dont">

    <Video src="/videos/hero-video.mp4" poster="/videos/poster.png" />

    </DoDont>

    </DoDontRow>

`

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- will remove later
const toTest = `


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

### Offset <- TODOASKJOE: doesn't work with object

<Grid>
  <Column md={4} lg={{ span: 4, offset: 4 }}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
  <Column md={4} lg={4}>
    ![Grid Example](/mdx/Article_05.jpg)
  </Column>
</Grid>

`

const RmdxTest = () => {
  const ast = process(mdx, Object.keys(components))

  // console.log(JSON.stringify(ast, undefined, 2))

  return <RmdxNode components={components} astNode={ast} />
}

export default RmdxTest
