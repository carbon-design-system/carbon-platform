/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import * as Mdx from '../main/index.js'

test.afterEach(cleanup)

test.serial('anchor links renders without crashing', (t) => {
  const result = render(
    <Mdx.AnchorLinks>
      <Mdx.AnchorLink>Link 1</Mdx.AnchorLink>
    </Mdx.AnchorLinks>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('accordion renders without crashing', (t) => {
  const result = render(
    <Mdx.Accordion>
      <Mdx.AccordionItem title="Title 1">Content Section</Mdx.AccordionItem>
      <Mdx.AccordionItem title="Title 2">Content Section</Mdx.AccordionItem>
      <Mdx.AccordionItem title="Title 3">Content Section</Mdx.AccordionItem>
    </Mdx.Accordion>
  )

  t.snapshot(result.container.innerHTML)
})
test.serial('article card renders without crashing', (t) => {
  const result = render(
    <Mdx.ArticleCard
      subTitle="Sub title"
      title="Title"
      author="Author"
      date="July 4, 1975"
      readTime="Read time: 5 min"
      href="/"
    >
      <img src="wowimagesrc" alt="Use markdown for images in mdx files. ![](img.png)" />
    </Mdx.ArticleCard>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('arrow right button renders without crashing', (t) => {
  const result = render(<Mdx.ArrowRightButton>Button Text</Mdx.ArrowRightButton>)

  t.snapshot(result.baseElement.innerHTML)
})

test.serial('aside renders without crashing', (t) => {
  const result = render(<Mdx.Aside aria-label="Example aside">Wow aside text</Mdx.Aside>)

  t.snapshot(result.container.innerHTML)
})

test.serial('caption renders without crashing', (t) => {
  const result = render(<Mdx.Caption>Lorem Lorem Lorem Lorem Lorem Lorem Lorem.</Mdx.Caption>)

  t.snapshot(result.container.innerHTML)
})

test.serial('card group renders without crashing', (t) => {
  const result = render(
    <Mdx.CardGroup>
      <Mdx.ResourceCard
        subTitle="With subtitle"
        title="Title"
        aspectRatio="2:1"
        actionIcon="arrowRight"
        href="https://www.carbondesignsystem.com"
      >
        <img src="" alt="Use markdown for images in mdx files. ![](img.png)" />
      </Mdx.ResourceCard>
      <Mdx.ResourceCard
        subTitle="With subtitle"
        title="Title"
        href="https://www.carbondesignsystem.com"
      >
        <img src="" alt="Use markdown for images in mdx files. ![](img.png)" />
      </Mdx.ResourceCard>
    </Mdx.CardGroup>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('code renders without crashing', (t) => {
  const result = render(
    <Mdx.Code>
      <code>const a = 16</code>
    </Mdx.Code>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('divider renders without crashing', (t) => {
  const result = render(<Mdx.Divider>Some stuff inside of the divider</Mdx.Divider>)

  t.snapshot(result.container.innerHTML)
})

test.serial('do dont renders without crashing', (t) => {
  const result = render(
    <Mdx.DoDontRow>
      <Mdx.DoDont
        aspectRatio="1:1"
        text="DoDont example"
        captionTitle="Caption title"
        caption="This is a caption."
        type="do"
        color="dark"
      >
        wow do this and don&apos;t do that
      </Mdx.DoDont>
      <Mdx.DoDont aspectRatio="1:1" type="dont">
        <img alt="Use markdown in mdx files. ![](dodont.png)" src="wowimagesrc" />
      </Mdx.DoDont>
    </Mdx.DoDontRow>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('gif player renders without crashing', (t) => {
  const result = render(
    <Mdx.GifPlayer>
      <img alt="static" src="wowsrc" />
    </Mdx.GifPlayer>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('grid renders without crashing', (t) => {
  const result = render(
    <Mdx.Grid>
      <Mdx.Column sm={4} md={4} lg={4}>
        Span 4
      </Mdx.Column>
    </Mdx.Grid>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('image wrapper renders without crashing', (t) => {
  const result = render(
    <Mdx.ImageWrapper type="fixed">
      <img alt="fixed demo" src="" />
    </Mdx.ImageWrapper>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('inline notification renders without crashing', (t) => {
  const result = render(
    <Mdx.InlineNotification kind="info">
      Lorem ipsum: dolor sit amet, elit. Curabitur ac odio arcu. Vestibulum egestas eleifend
      porttitor. Quisque malesuada pulvinar pellentesque. Nunc dictum odio eu enim venenatis
      fringilla. Nunc finibus enim dui, a tempus quam commodo vitae. Donec non eros gravida dolor
      porta suscipit non vel quam.
    </Mdx.InlineNotification>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('launch button renders without crashing', (t) => {
  const result = render(<Mdx.LaunchButton>Button Text</Mdx.LaunchButton>)

  t.snapshot(result.baseElement.innerHTML)
})

test.serial('link renders without crashing', (t) => {
  const result = render(
    <Mdx.Link href="https://platform.carbondesignsystem.com">Carbon Platform Storybook</Mdx.Link>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('blockquote renders without crashing', (t) => {
  const result = render(
    <Mdx.Blockquote>
      <Mdx.P>
        Without aesthetic, design is either the humdrum repetition of familiar clichés or a wild
        scramble for novelty. Without aesthetic, the computer is but a mindless speed machine,
        producing effects without substance, form without relevant content, or content without
        meaningful form.
      </Mdx.P>
      <cite>– Paul Rand</cite>
    </Mdx.Blockquote>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('h1 renders without crashing', (t) => {
  const result = render(<Mdx.H1>This is a Heading 1</Mdx.H1>)

  t.snapshot(result.container.innerHTML)
})

test.serial('h2 renders without crashing', (t) => {
  const result = render(<Mdx.H2>This is a Heading 2</Mdx.H2>)

  t.snapshot(result.container.innerHTML)
})

test.serial('h3 renders without crashing', (t) => {
  const result = render(<Mdx.H3>This is a Heading 3</Mdx.H3>)

  t.snapshot(result.container.innerHTML)
})

test.serial('h4 renders without crashing', (t) => {
  const result = render(<Mdx.H4>This is a Heading 4</Mdx.H4>)

  t.snapshot(result.container.innerHTML)
})

test.serial('h5 renders without crashing', (t) => {
  const result = render(<Mdx.H5>This is a Heading 5</Mdx.H5>)

  t.snapshot(result.container.innerHTML)
})

test.serial('h6 renders without crashing', (t) => {
  const result = render(<Mdx.H6>This is a Heading 6</Mdx.H6>)

  t.snapshot(result.container.innerHTML)
})

test.serial('li renders without crashing', (t) => {
  const result = render(<Mdx.LI>list item 1</Mdx.LI>)

  t.snapshot(result.container.innerHTML)
})

test.serial('ol renders without crashing', (t) => {
  const result = render(
    <Mdx.OL>
      <Mdx.LI>list item 1</Mdx.LI>
      <Mdx.LI>list item 2</Mdx.LI>
      <Mdx.LI>
        <Mdx.OL>
          <Mdx.LI>list item 1</Mdx.LI>
        </Mdx.OL>
      </Mdx.LI>
    </Mdx.OL>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('p renders without crashing', (t) => {
  const result = render(
    <Mdx.P>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat ex massa, in tincidunt
      ipsum tempor in. Maecenas ultrices sem nec blandit dictum. Fermentum ullamcorper pretium. Duis
      turpis elit.
    </Mdx.P>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('ul renders without crashing', (t) => {
  const result = render(
    <Mdx.UL>
      <Mdx.LI>list item 1</Mdx.LI>
      <Mdx.LI>list item 2</Mdx.LI>
      <Mdx.LI>
        <Mdx.UL>
          <Mdx.LI>list item 1</Mdx.LI>
        </Mdx.UL>
      </Mdx.LI>
    </Mdx.UL>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('mini card renders without crashing', (t) => {
  const result = render(
    <>
      <Mdx.MiniCard
        title="Tree view component"
        href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
        actionIcon="arrowRight"
      />
      <Mdx.MiniCard title="React tutorial" href="">
        {'something'}
      </Mdx.MiniCard>
    </>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('page description renders without crashing', (t) => {
  const result = render(
    <Mdx.PageDescription>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat ex massa, in tincidunt
      ipsum tempor in. Maecenas ultrices sem nec blandit dictum. Fermentum ullamcorper pretium. Duis
      turpis elit.
    </Mdx.PageDescription>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('page table renders without crashing', (t) => {
  const result = render(
    <Mdx.PageTable columns={3}>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1-1</td>
          <td>Cell 1-2</td>
          <td>Cell 1-3</td>
        </tr>
        <tr>
          <td>Cell 2-1</td>
          <td>Cell 2-2</td>
          <td>Cell 2-3</td>
        </tr>
      </tbody>
    </Mdx.PageTable>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('preview renders without crashing', (t) => {
  const result = render(
    <Mdx.Preview
      height="400"
      title="Carbon Tutorial Step 5"
      src="https://react-step-6--carbon-tutorial.netlify.com"
    />
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('resource card renders without crashing', (t) => {
  const result = render(
    <Mdx.ResourceCard
      subTitle="With subtitle"
      title="Title"
      aspectRatio="2:1"
      actionIcon="arrowRight"
      href="https://www.carbondesignsystem.com"
    >
      <img src="" alt="Use markdown for images in mdx files. ![](img.png)" />
    </Mdx.ResourceCard>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('storybook demo renders without crashing', (t) => {
  const result = render(
    <Mdx.StorybookDemo themeSelector={true} wide tall url="https://react.carbondesignsystem.com">
      <Mdx.Variant label="Button" variant="components-button--default" />
      <Mdx.Variant label="Secondary" variant="components-button--secondary" />
      <Mdx.Variant label="Tertiary" variant="components-button--tertiary" />
      <Mdx.Variant label="Ghost" variant="components-button--ghost" />
      <Mdx.Variant label="Danger" variant="components-button--danger" />
      <Mdx.Variant label="Icon button" variant="components-button--icon-button" />
      <Mdx.Variant label="Set of buttons" variant="components-button--set-of-buttons" />
      <Mdx.Variant label="Skeleton" variant="components-button--skeleton" />
    </Mdx.StorybookDemo>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('tabs renders without crashing', (t) => {
  const result = render(
    <Mdx.Tabs idPrefix="test">
      <Mdx.Tab astNode={{ props: { label: 'Tab 1' } }} _id="2" index={3}>
        Maecenas ultrices sem nec blandit dictum. ermentum ullamcorper pretium. Duis turpis elit,
        facilisis nec elit id, fermentum porttitor nisl. Nulla dignissim euismod maximus. Cras
        euismod facilisis rutrum. Etiam nisi sem, malesuada auctor pretium vel, ullamcorper sed mi.
        In hac habitasse platea dictumst.
      </Mdx.Tab>
      <Mdx.Tab astNode={{ props: { label: 'Tab 1' } }} _id="2" index={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat ex massa, in
        tincidunt ipsum tempor in. Maecenas ultrices sem nec blandit dictum. ermentum ullamcorper
        pretium. Duis turpis elit, facilisis nec elit id, fermentum porttitor nisl. Nulla dignissim
        euismod maximus. Cras euismod facilisis rutrum.
      </Mdx.Tab>
      <Mdx.Tab astNode={{ props: { label: 'Tab 1' } }} _id="2" index={3}>
        Duis turpis elit, facilisis nec elit id, fermentum porttitor nisl. Nulla dignissim euismod
        maximus. Cras euismod facilisis rutrum. Etiam nisi sem, malesuada auctor pretium vel,
        ullamcorper sed mi. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Aenean feugiat ex massa, in tincidunt ipsum tempor in.
      </Mdx.Tab>
    </Mdx.Tabs>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('title renders without crashing', (t) => {
  const result = render(
    <>
      <Mdx.Title>Lorem ipsum</Mdx.Title>
      <Mdx.P>This is the element after the title with its default top margin removed.</Mdx.P>
    </>
  )

  t.snapshot(result.container.innerHTML)
})

test.serial('video renders without crashing', (t) => {
  const result = render(<Mdx.Video src="wowsrc" poster="wowposter" />)

  t.snapshot(result.container.innerHTML)
})
