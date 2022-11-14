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
import { ColumnMapper } from '@/utils/mappers/column.mapper'
import { DivMapper } from '@/utils/mappers/div.mapper'
import { DividerMapper } from '@/utils/mappers/divider.mapper'
import { GridMapper } from '@/utils/mappers/grid.mapper'
import { H1Mapper } from '@/utils/mappers/h1.mapper'
import { H2Mapper } from '@/utils/mappers/h2.mapper'
import { H3Mapper } from '@/utils/mappers/h3.mapper'
import { H4Mapper } from '@/utils/mappers/h4.mapper'
import { H5Mapper } from '@/utils/mappers/h5.mapper'
import { H6Mapper } from '@/utils/mappers/h6.mapper'
import { ImgMapper } from '@/utils/mappers/img.mapper'
import { LinkMapper } from '@/utils/mappers/link.mapper'
import { ParagraphMapper } from '@/utils/mappers/paragraph.mapper'
import { PreviewMapper } from '@/utils/mappers/preview.mapper'
import { RowMapper } from '@/utils/mappers/row.mapper'
import { SpanMapper } from '@/utils/mappers/span.mapper'
import { StrongMapper } from '@/utils/mappers/strong.mapper'
import { UniversalMapper } from '@/utils/mappers/universal.mapper'

const components = {
  // html
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
  text: UniversalMapper,
  // components
  Accordion: AccordionMapper,
  AccordionItem: AccordionItemMapper,
  Column: ColumnMapper,
  Divider: DividerMapper,
  Grid: GridMapper,
  H1: H1Mapper,
  H2: H2Mapper,
  H3: H3Mapper,
  H4: H4Mapper,
  H5: H5Mapper,
  H6: H6Mapper,
  Link: LinkMapper,
  Preview: PreviewMapper,
  Row: RowMapper
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

`

const RmdxTest = () => {
  const ast = process(mdx, Object.keys(components))

  console.log(JSON.stringify(ast, undefined, 2))

  return <RmdxNode components={components} astNode={ast} />
}

export default RmdxTest
