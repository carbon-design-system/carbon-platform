/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Accordion,
  AccordionItem,
  Column,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Link,
  P,
  Preview,
  Row
} from '@carbon-platform/mdx-components'
import { process, RmdxNode } from '@carbon-platform/rmdx'
import React from 'react'

const UniversalMapper = ({ children }) => children

const components = {
  // html
  document: UniversalMapper,
  div: ({ children }) => <div>{children}</div>,
  'heading-1': ({ children }) => <H1>{children}</H1>,
  'heading-2': ({ children, noAnchor }) => <H2 noAnchor={noAnchor}>{children}</H2>,
  'heading-3': ({ children }) => <H3>{children}</H3>,
  'heading-4': ({ children, autoLink }) => <H4 autoLink={autoLink}>{children}</H4>,
  'heading-5': ({ children }) => <H5>{children}</H5>,
  'heading-6': ({ children }) => <H6>{children}</H6>,
  link: ({ children, href, inline, disabled, visited, size }) => (
    <Link href={href} inline={inline} disabled={disabled} visited={visited} size={size}>
      {children}
    </Link>
  ),
  paragraph: ({ children, large }) => <P large={large}>{children}</P>,
  span: ({ children }) => <span>{children}</span>,
  strong: ({ children }) => <strong>{children}</strong>,
  text: UniversalMapper,
  // components
  Accordion: ({ align, children, disabled, isFlush }) => (
    <Accordion disabled={disabled} isFlush={isFlush} align={align}>
      {children}
    </Accordion>
  ),
  AccordionItem: ({ children, disabled, open, title }) => (
    <AccordionItem disabled={disabled} open={open} title={title}>
      {children}
    </AccordionItem>
  ),
  Column: ({
    children,
    colSm,
    colMd,
    colLg,
    colXl,
    colMax,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    offsetMax,
    as,
    lg,
    max,
    md,
    sm,
    xlg
  }) => (
    <Column
      colSm={colSm}
      colMd={colMd}
      colLg={colLg}
      colXl={colXl}
      colMax={colMax}
      offsetSm={offsetSm}
      offsetMd={offsetMd}
      offsetLg={offsetLg}
      offsetXl={offsetXl}
      offsetMax={offsetMax}
      as={as}
      lg={lg}
      max={max}
      md={md}
      sm={sm}
      xlg={xlg}
    >
      {children}
    </Column>
  ),
  Divider: ({ children }) => <Divider>{children}</Divider>,
  Grid: ({ children, condensed, fullWidth, narrow, as }) => (
    <Grid condensed={condensed} fullWidth={fullWidth} narrow={narrow} as={as}>
      {children}
    </Grid>
  ),
  H1: ({ children }) => <H1>{children}</H1>,
  H2: ({ children, noAnchor }) => <H2 noAnchor={noAnchor}>{children}</H2>,
  H3: ({ children }) => <H3>{children}</H3>,
  H4: ({ children, autoLink }) => <H4 autoLink={autoLink}>{children}</H4>,
  H5: ({ children }) => <H5>{children}</H5>,
  H6: ({ children }) => <H6>{children}</H6>,
  Link: ({ children, href, inline, disabled, visited, size }) => (
    <Link href={href} inline={inline} disabled={disabled} visited={visited} size={size}>
      {children}
    </Link>
  ),
  Preview: ({ title, height, src }) => <Preview title={title} height={height} src={src} />,
  Row: ({ children }) => <Row>{children}</Row>
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

`

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- ignore
const testLater = `
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

## Divider

<Divider>
  <Grid>
    <Column sm={4} md={2} lg={4}>
      <h3>
        <strong>v1.0</strong>
      </h3>
      <h2>
        Target release: <div>June</div>
      </h2>
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

## Row
<Row>one row</Row>
`

const RmdxTest = () => {
  const ast = process(mdx)

  console.log(JSON.stringify(ast, undefined, 2))

  return <RmdxNode components={components} astNode={ast} />
}

export default RmdxTest
