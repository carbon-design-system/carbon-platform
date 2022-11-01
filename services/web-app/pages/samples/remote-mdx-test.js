/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import { MDXRemote } from 'next-mdx-remote'

import MdxPage from '@/components/mdx-page/mdx-page'
import { getRemoteMdxSource } from '@/lib/github'
import { processMdxSource } from '@/utils/mdx'

const RemoteMdxTest = ({ compiledSource, tabs, mdxError, warnings }) => {
  const frontmatter = compiledSource?.data?.matter || {}
  const { title, description, keywords, pageHeaderType } = frontmatter

  return (
    <MdxPage
      title={title}
      description={description}
      keywords={keywords}
      tabs={tabs}
      mdxError={mdxError}
      warnings={warnings}
      pageHeaderType={pageHeaderType}
    >
      {/* {compiledSource && <MDXRemote compiledSource={compiledSource.value} />} */}
      {compiledSource?.html &&
    <div dangerouslySetInnerHTML={{ __html: compiledSource.html }}/>}
    </MdxPage>
  )
}

export const getStaticProps = async () => {
  let mdxSource
  let url

  try {
    const response = await getRemoteMdxSource(
      {
        host: 'github.com',
        org: 'carbon-design-system',
        repo: 'carbon-platform',
        library: 'carbon-website',
        ref: 'main'
      },
      'services/web-app/pages/about-carbon/articles.mdx'
    )
    mdxSource = response.mdxSource
    url = response.url
  } catch (err) {
    return {
      props: {
        mdxError: {
          name: err.name,
          message: err.message,
          stack: err.stack
        }
      }
    }
  }

  mdxSource = `
  # H1
  # This is an H1

  # H2
  ## This is an H2

  # H3
  ### This is an H3

  # H4
  #### This is an H4

  # H5
  ##### This is an H5

  # H6
  ###### This is an H6

  # P

  This is a paragraph

  # OL

  1. LI 1
  2. LI 2
  3. LI 3

  # UL

  * Apples
  * Oranges
  * Berries
    * Strawberries
    * Raspberries

  # Link

  [eBay](https://ebay.com)

  # Blockquote
  > So we beat on, boats against the current, borne back ceaselessly into the past.

  # Image
  ![this image](https://github.com/carbon-design-system/carbon-platform/blob/main/services/web-app/public/carbon.png?raw=true)

  # PageTable

  | Name | Type | Description |
  | ---- | ---- | ----------- |
  | name | string | Name of the resource |
  | path | string | Path to the resource |

  # pre (Code)

  ` + '`some code`' + `

  # Code
  ` +
  '```yaml' +
  `\n# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
  ---
  docs:
    usagePath: 'https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/components/accordion/usage.mdx'
    stylePath: './components/accordion/styles.mdx'
    codePath: './components/accordion/code.mdx'
    accessibilityPath: './components/accordion/accessibility.mdx'
    overviewPath: './components/accordion/overview.mdx'\n` +
  '```' + `

  # MdxNotification

  <MdxNotification
    title="Component not rendering"
    description="This is the description"
    content="This is the content"
    link="Get support"
    href="/TODO"/>


  # FullPageError

  <FullPageError
      title="The page you are looking for cannot be found."
      subtitle="Supplied Github route does not exist. Update to a valid route."
      link="See common errors for further information on valid urls"
      href="/common-mdx-errors#the-page-you're-looking-for-cannot-be-found"
    >
      <p>The error message here</p>
    </FullPageError>


  # Accordion

  <Accordion>
    <AccordionItem title="Title 1">Content Section</AccordionItem>
    <AccordionItem title="Title 2">Content Section</AccordionItem>
    <AccordionItem title="Title 3">Content Section</AccordionItem>
  </Accordion>

  # ArtDirection

  <ArtDirection>

  Mobile

  Tablet

  Desktop

  </ArtDirection>

  # Article Card

<Row>
<Column colMd={4} colLg={4} noGutterMdLeft>
    <ArticleCard
      subTitle="subTitle"
      title="Title"
      author="Josh Black"
      date="April 29, 2019"
      readTime="Read time: 5 min"
      href="/"
      >

![Dark article layout mockup](/mdx/Article_06.png)

  </ArticleCard>
</Column>
<Column colMd={4} colLg={4} noGutterMdLeft>
    <ArticleCard
      title="Explore & Create"
      author="Josh Black"
      href="https://www.ibm.com"
      actionIcon="arrowRight"
      >

![Dark article layout mockup](/mdx/Article_06.png)

  </ArticleCard>
</Column>
<Column colMd={4} colLg={4} noGutterMdLeft>
    <ArticleCard
      title="Explore & Create a longer title example in this space"
      href="https://www.ibm.com"
      disabled
      >

![Dark article layout mockup](/mdx/Article_06.png)

  </ArticleCard>
</Column>
<Column colMd={4} colLg={4} noGutterMdLeft>
    <ArticleCard
      title="Explore & Create"
      color="dark"
      href="https://www.ibm.com"
      actionIcon="download"
      >

![Dark article layout mockup](/mdx/Article_06.png)

  </ArticleCard>
</Column>
<Column colMd={4} colLg={4} noGutterMdLeft>
    <ArticleCard
      subTitle="subTitle"
      title="Explore & Create"
      author="Josh Black"
      readTime="Read time: 5 min"
      color="dark"
      href="https://www.ibm.com"
      actionIcon="email"
      >

![Dark article layout mockup](/mdx/Article_06.png)

  </ArticleCard>
</Column>
<Column colMd={4} colLg={4} noGutterMdLeft>
    <ArticleCard
      subTitle="subTitle"
      title="Explore & Create"
      author="Josh Black"
      date="April 29, 2019"
      readTime="Read time: 5 min"
      color="dark"
      disabled
      >

![Dark article layout mockup](/mdx/Article_06.png)

  </ArticleCard>
</Column>
</Row>

# Aside

<Grid>
<Column md={5} lg={8}>

<Title>With hanging rule</Title>

</Column>
<Column md={3} lg={4}>
<Aside aria-label="Example aside">

**Good design is always good design.**

What we borrow from our own design history is not a mid-century aesthetic in stylistic terms, but
the modernist attitudes and approach used at the time.

</Aside>
</Column>
</Grid>

<Grid>
<Column md={5} lg={8}>

<Title>Without hanging rule</Title>

</Column>
<Column md={3} lg={4}>
<Aside aria-label="Example aside" hideRule>

A by-product of every experience with IBM should be time—time saved or time well-spent.

</Aside>
</Column>
</Grid>


# Caption

<Caption>Lorem ipsum dolor sit amet Lorem Lorem Lorem Lorem Lorem Lorem ipsum.</Caption>

# Card Group

<CardGroup>
  <MiniCard title="Figma tutorial" href="https://next.carbondesignsystem.com/designing/figma">
    <MdxIcon name="figma" />
  </MiniCard>
  <MiniCard title="Sketch tutorial" href="https://next.carbondesignsystem.com/designing/sketch">
    <MdxIcon name="sketch" />
  </MiniCard>
  <MiniCard title="Adobe XD tutorial" href="https://next.carbondesignsystem.com/designing/adobe-xd">
    <MdxIcon name="adobe24" />
  </MiniCard>
  <MiniCard title="Axure tutorial" href="https://next.carbondesignsystem.com/designing/axure">
    <MdxIcon name="axure32" />
  </MiniCard>
</CardGroup>

# ColorGrid

<Grid>
  <Column>
    <ColorGrid colorFamily="blue" />
    <ColorGrid colorFamily="gray" />
  </Column>
  <Column>
    <ColorGrid colorFamily="alerts" style={{ marginTop: '2rem' }} />
    <Caption>Alert Colors</Caption>
  </Column>
</Grid>

# ColorPalette

## categorical

<ColorPalette type="categorical" />

## grouped

<ColorPalette type="grouped" />

## sequential mono

<ColorPalette type="sequential" isMono />

## sequential diverging

<ColorPalette type="sequential" isDiverging />

## alert

<ColorPalette twoColumn type="alert" />

## status

<ColorPalette twoColumn type="status" />

## status-extended with out controls

<ColorPalette type="status-extended" shouldShowControls={false} />


# Grid

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
    ![Grid Example](/mcdx/Article_05.jpg)
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

# ColorTokenTable

<ColorTokenTable />

# DoDont

<DoDontRow>

<DoDont aspectRatio="1:1">

![Alt text](/mdx/light-theme.jpg)

</DoDont>

<DoDont aspectRatio="1:1" type="dont">

![Alt text](/mdx/light-theme.jpg)

</DoDont>

</DoDontRow>

<DoDontRow>

<DoDont aspectRatio="1:1" text="This is some text" />

<DoDont type="dont" aspectRatio="1:1" text="This is some text" color="dark" />

</DoDontRow>

<DoDontRow>

<DoDont
  text="This is some text that is 8 columns"
  color="dark"
  captionTitle="Caption title"
  caption="Caption"
  colLg="8"
/>

</DoDontRow>

<DoDontRow>

<DoDont aspectRatio="4:3" text="4:3" />

<DoDont aspectRatio="16:9" text="16:9" />

<DoDont aspectRatio="2:1" text="2:1" />

</DoDontRow>

<DoDontRow>

<DoDont aspectRatio="9:16" text="9:16" />

<DoDont aspectRatio="1:2" text="1:2" />

<DoDont aspectRatio="3:4" text="3:4" />

</DoDontRow>
<DoDontRow>

<DoDont aspectRatio="1:1" text="1:1" />

</DoDontRow>

## Video example coming soon

<DoDontRow>

<DoDont colLg='8'>

<Video title="Video example" vimeoId="310583077" />

</DoDont>

</DoDontRow>

# Divider

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

# FilterableDesignKitTable

<FilterableDesignKitTable
  designKitsData={[
    {
      name: 'Sketch white theme',
      description: 'Use this White theme Sketch kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'sketch://add-library/cloud/557b75ff-67d3-41ab-ada5-fa25447218c1',
      action: 'download',
      maintainer: 'carbon',
      id: 'carbon-white-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Sketch gray 10 theme',
      description: 'Use this Gray 10 theme Sketch kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'sketch://add-library/cloud/b4ea2a21-4b1a-4c64-99dc-a1365eff5d5f',
      action: 'download',
      maintainer: 'carbon',
      id: 'carbon-g10-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Sketch gray 90 theme',
      description: 'Use this Gray 90 theme Sketch kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'sketch://add-library/cloud/a324c6dd-df97-435e-b79f-3a29e04922fc',
      action: 'download',
      maintainer: 'carbon',
      id: 'carbon-g90-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Sketch gray 100 theme',
      description: 'Use this Gray 100 theme Sketch kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'sketch://add-library/cloud/9d47a4fd-70dd-44ff-bc57-22c79da8e477',
      action: 'download',
      maintainer: 'carbon',
      id: 'carbon-g100-sketch',
      statusKey: 'stable'
    },
    {
      name: 'IBM Design Language',
      description: 'Use this Sketch kit to apply type and colors styles to your projects using the IBM Design Language.',
      tool: 'sketch',
      type: 'elements',
      status: 'stable',
      url: 'sketch://add-library/cloud/4f1cbe6c-6626-405e-8c46-a9ae41a30cba',
      action: 'download',
      maintainer: 'ibm-brand',
      id: 'ibm-design-language-sketch',
      statusKey: 'stable'
    },
    {
      name: 'IBM Icons (16px, 20px)',
      description: 'This Sketch kit includes 16px and 20px IBM icons to apply in projects that use the IBM Design Language.',
      tool: 'sketch',
      type: 'elements',
      status: 'stable',
      url: 'sketch://add-library/cloud/028e0598-591e-428c-a490-f6ec64b15ea7',
      action: 'download',
      maintainer: 'ibm-brand',
      id: 'ibm-icons-16-20-sketch',
      statusKey: 'stable'
    },
    {
      name: 'IBM Icons (24px, 32px)',
      description: 'This Sketch kit includes 24px and 32px IBM icons to apply in projects that use the IBM Design Language.',
      tool: 'sketch',
      type: 'elements',
      status: 'stable',
      url: 'sketch://add-library/cloud/d530998a-c94c-4f1c-bc0e-c05417e067e3',
      action: 'download',
      maintainer: 'ibm-brand',
      id: 'ibm-icons-24-32-sketch',
      statusKey: 'stable'
    },
    {
      name: 'IBM Grid template',
      description: 'This Sketch template contains the IBM 2x Grid, including structure and guidance around the basic grid and grid influencers.',
      tool: 'sketch',
      type: 'elements',
      status: 'stable',
      url: 'https://www.sketch.com/s/3a3f3f2d-94d7-4c16-8e2e-88ba80a6382e',
      action: 'link',
      maintainer: 'ibm-brand',
      id: 'ibm-grid-sketch',
      statusKey: 'stable'
    },
    {
      name: 'UI Shell template',
      description: 'Use this Sketch kit to consistently apply components and interaction patterns shared by products within a platform.',
      tool: 'sketch',
      type: 'elements',
      status: 'stable',
      url: 'https://www.sketch.com/s/6a8e1d7b-f00a-4d8d-9d83-79ecf4dc12a0',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-shell-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Figma white theme',
      description: 'Use this White theme Figma kit to rapidly design user interfaces with Carbon’s core components. The v10 libraries will not receive continuous updates and will remain permanently on v10.',
      tool: 'figma',
      type: 'ui',
      status: 'experimental',
      url: 'https://www.figma.com/file/Vzz8k68Pqk5HfaTdQOQrGu/White-Theme---Carbon-Design-System',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-white-figma',
      statusKey: 'experimental'
    },
    {
      name: 'Figma gray 10 theme',
      description: 'Use this Gray 10 theme Figma kit to rapidly design user interfaces with Carbon’s core components. The v10 libraries will not receive continuous updates and will remain permanently on v10.',
      tool: 'figma',
      type: 'ui',
      status: 'experimental',
      url: 'https://www.figma.com/file/i6y80WeotmhmbWxpmcffz7/Gray-10-Theme---Carbon-Design-System',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-g10-figma',
      statusKey: 'experimental'
    },
    {
      name: 'Figma gray 90 theme',
      description: 'Use this Gray 90 theme Figma kit to rapidly design user interfaces with Carbon’s core components. The v10 libraries will not receive continuous updates and will remain permanently on v10.',
      tool: 'figma',
      type: 'ui',
      status: 'experimental',
      url: 'https://www.figma.com/file/fCucrHE8tdGDVJX7ODqajd/Gray-90-Theme---Carbon-Design-System',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-g90-figma',
      statusKey: 'experimental'
    },
    {
      name: 'Figma gray 100 theme',
      description: 'Use this Gray 100 theme Figma kit to rapidly design user interfaces with Carbon’s core components. The v10 libraries will not receive continuous updates and will remain permanently on v10.',
      tool: 'figma',
      type: 'ui',
      status: 'experimental',
      url: 'https://www.figma.com/file/TckQzGe3bNxHPLoRhbXFal/Gray-100-Theme---Carbon-Design-System',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-g100-figma',
      statusKey: 'experimental'
    },
    {
      name: 'Adobe XD white theme',
      description: 'Use this white theme Adobe XD kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'adobe-xd',
      type: 'ui',
      status: 'stable',
      url: 'https://assets.adobe.com/libraries/urn:aaid:sc:VA7:35c94afd-9cc4-4703-a4b0-49acb165d28d?libraryVersion=8&org=973430F0543801CA0A4C98C6%40AdobeOrg',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-white-adobe-xd',
      statusKey: 'stable'
    },
    {
      name: 'Adobe XD gray 10 theme',
      description: 'Use this Gray 10 theme Adobe XD kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'adobe-xd',
      type: 'ui',
      status: 'stable',
      url: 'https://assets.adobe.com/libraries/urn:aaid:sc:VA7:92418e29-f824-4cfc-9be2-866a5230cbb1?libraryVersion=5&org=973430F0543801CA0A4C98C6%40AdobeOrg',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-g10-adobe-xd',
      statusKey: 'stable'
    },
    {
      name: 'Adobe XD gray 90 theme',
      description: 'Use this Gray 90 theme Adobe XD kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'adobe-xd',
      type: 'ui',
      status: 'stable',
      url: 'https://assets.adobe.com/libraries/urn:aaid:sc:VA7:fc4859fd-beea-4407-b41c-34170a4e8203?libraryVersion=9&org=973430F0543801CA0A4C98C6%40AdobeOrg',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-g90-adobe-xd',
      statusKey: 'stable'
    },
    {
      name: 'Adobe XD gray 100 theme',
      description: 'Use this Gray 100 theme Adobe XD kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'adobe-xd',
      type: 'ui',
      status: 'stable',
      url: 'https://assets.adobe.com/libraries/urn:aaid:sc:VA7:4f44b97f-34a1-413b-b188-fc15337df1b6?libraryVersion=14&org=973430F0543801CA0A4C98C6%40AdobeOrg',
      action: 'link',
      maintainer: 'carbon',
      id: 'carbon-g100-adobe-xd',
      statusKey: 'stable'
    },
    {
      name: 'IBM Icons',
      description: 'This Adobe XD kit includes IBM icons to apply in projects that use the IBM Design Language.',
      tool: 'adobe-xd',
      type: 'elements',
      status: 'stable',
      url: 'https://assets.adobe.com/more-libraries/urn:aaid:sc:VA7:3609d51f-f1ec-4ad3-87a5-744638af0413?libraryVersion=6&org=973430F0543801CA0A4C98C6%40AdobeOrg',
      action: 'link',
      maintainer: 'ibm-brand',
      id: 'ibm-icons-adobe-xd',
      statusKey: 'stable'
    },
    {
      name: 'Axure gray 10',
      description: 'Use this Gray 10 theme to rapidly create wireframes, interactive prototypes, and documentation in Axure RP.',
      tool: 'axure',
      type: 'ui',
      status: 'stable',
      url: 'https://github.com/IBM/design-kit/blob/master/Axure/IBM%20Carbon%2010.rplib?raw=true',
      action: 'download',
      maintainer: 'community',
      id: 'carbon-g10-axure',
      statusKey: 'stable'
    },
    {
      name: 'Axure template',
      description: 'This kit provides all the settings you need to use elements in Axure RP.',
      tool: 'axure',
      type: 'ui',
      status: 'stable',
      url: 'https://github.com/IBM/design-kit/blob/master/Axure/ibm-carbon-template.rp?raw=true',
      action: 'download',
      maintainer: 'community',
      id: 'carbon-template-axure',
      statusKey: 'stable'
    },
    {
      name: 'Axure widget library',
      description: 'This Axure kit contains the widgets for core Carbon components, design elements, and other common shapes. All widgets come with pre-built styles and interactions.',
      tool: 'axure',
      type: 'ui',
      status: 'stable',
      url: 'https://github.com/IBM/design-kit/blob/master/Axure/IBM%20Carbon%2010.rplib?raw=true',
      action: 'download',
      maintainer: 'community',
      id: 'axure-widget-library',
      statusKey: 'stable'
    },
    {
      name: 'Data vizualization',
      description: 'This Sketch kit includes basic and complex chart assets, along with usage guidance, theming guidance, palettes, and sample layouts.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'https://www.sketch.com/s/1a36060a-7a5d-4ddb-aab1-639caa1f74d4',
      action: 'link',
      maintainer: 'carbon',
      id: 'data-viz-sketch',
      statusKey: 'stable'
    },
    {
      name: 'RGB color palettes (.ase and .clr)',
      description: 'These .ase and .clr color palettes contain the IBM Design Language color families.',
      tool: 'adobe-ase',
      type: 'elements',
      status: 'stable',
      url: 'https://github.com/carbon-design-system/carbon/raw/v10/packages/colors/artifacts/IBM_Colors.zip',
      action: 'download',
      maintainer: 'community',
      id: 'ibm-color-palettes-ase-clr',
      statusKey: 'stable'
    },
    {
      name: 'Text toolbar pattern',
      description: 'This Sketch kit includes guidance and structure around buttons, dropdowns, and groups for the Text toolbar pattern.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'sketch://add-library/cloud/f32b7e90-d97e-48ef-ae53-beabf75f5846',
      action: 'download',
      maintainer: 'community',
      id: 'text-toolbar-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Gatsby theme',
      description: 'This Sketch kit includes all the Gatsby components, patterns, and sample layouts that have been developed by the IBM community.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'sketch://add-library/cloud/304313c1-29a8-4946-a6f0-51dbec953bc2',
      action: 'link',
      maintainer: 'community',
      id: 'carbon-gatsby-theme-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Image production guidelines',
      description: 'This Sketch kit includes guidance, symbols, and templates to help designers with every aspect of image creation and component specs.',
      tool: 'sketch',
      type: 'guidelines',
      status: 'stable',
      url: 'https://www.sketch.com/s/240226b0-f455-484d-b412-cfd13fb1bb39',
      action: 'link',
      maintainer: 'carbon',
      id: 'image-production-guidelines-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Light theme for mobile',
      description: 'Use this light theme Sketch kit to rapidly design user interfaces for mobile experiences with Carbon’s core components.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'sketch://add-library/cloud/s/a3343128-adb6-489c-9e62-709d89ba76e9',
      action: 'link',
      maintainer: 'community',
      id: 'carbon-mobile-light-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Dark theme for mobile',
      description: 'Use this dark theme Sketch kit to rapidly design user interfaces for mobile experiences with Carbon’s core components.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'sketch://add-library/cloud/s/1f59f590-6915-47b0-bf06-6fd66209b3b3',
      action: 'link',
      maintainer: 'community',
      id: 'carbon-mobile-dark-sketch',
      statusKey: 'stable'
    },
    {
      name: 'IBM Grid template for mobile',
      description: 'This Sketch template contains the IBM 2x Grid for mobile experiences, including guidance for various device sizes.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'https://www.sketch.com/s/42e694ee-4b37-41c9-8c8f-480e2415d9de',
      action: 'link',
      maintainer: 'community',
      id: 'ibm-grid-mobile-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Mobile patterns and examples',
      description: 'This Sketch kit provides guidance for mobile experiences, including login, navigation, and UI examples.',
      tool: 'sketch',
      type: 'ui',
      status: 'stable',
      url: 'https://www.sketch.com/s/f13d67b9-3116-4b50-a2e9-56148f1976b0',
      action: 'link',
      maintainer: 'community',
      id: 'mobile-patterns-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Accessibility toolkit',
      description: 'This Sketch kit includes checklists, bite-sized guidance, and handoff assets to make sure your designs are accessible when implemented.',
      tool: 'sketch',
      type: 'guidelines',
      status: 'stable',
      url: 'https://www.sketch.com/s/f0a04c0d-fb62-4d71-92c6-07c402f8cae7',
      action: 'link',
      maintainer: 'ibm-accessibility',
      id: 'ibm-accessibility-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Accessibility toolkit',
      description: 'This Figma kit includes checklists, bite-sized guidance, and handoff assets to make sure your designs are accessible when implemented.',
      tool: 'figma',
      type: 'guidelines',
      status: 'stable',
      url: 'https://www.figma.com/file/zJlvN4TRbslRtyjFuxIDom/IBM-Accessibility-Design-Kit?node-id=0%3A1',
      action: 'link',
      maintainer: 'ibm-accessibility',
      id: 'ibm-accessibility-figma',
      statusKey: 'stable'
    },
    {
      name: 'Carbon Mid-Fi Sketch kit',
      description: 'Use this Sketch kit to visualize concepts and test them out before committing to high-fidelity designs.',
      tool: 'sketch',
      type: 'wireframes',
      status: 'stable',
      url: 'sketch://add-library/cloud/e888aa99-4d88-46a4-9b33-3a033e7f5ca2',
      action: 'download',
      maintainer: 'carbon',
      id: 'carbon-mid-fi-sketch',
      statusKey: 'stable'
    },
    {
      name: 'Invision Freehand wireframe kit',
      description: 'Quickly create and test low fidelity wireframes in InVision Freehand.',
      tool: 'invision-freehand',
      type: 'wireframes',
      status: 'stable',
      url: 'https://pages.github.ibm.com/cdai-design/cloud-pal/resources/resources/#invision-freehand-kit',
      action: 'download',
      license: 'ibm-internal',
      maintainer: 'ibm-cloud',
      id: 'carbon-wireframe-invision-freehand',
      statusKey: 'stable'
    },
    {
      name: 'IBM.com Figma white theme',
      description: "This white theme Figma kit includes components, color styles, and expressive and productive type styles to build web experiences that adhere to IBM's web standards.",
      tool: 'figma',
      type: 'ui',
      status: { key: 'draft', note: 'In beta.' },
      url: 'https://www.figma.com/file/RB6yqMPPsGutYnGTSvwGR4/Carbon-for-IBM.com-(White-Theme)-Beta?node-id=475%3A372',
      action: 'link',
      maintainer: 'ibm-dotcom',
      id: 'ibm-dotcom-white-figma',
      statusKey: 'draft'
    },
    {
      name: 'IBM.com Figma gray 10 theme',
      description: "This Gray 10 theme Figma kit includes components, color tokens, and expressive and productive type styles to build web experiences that adhere to IBM's web standards.",
      tool: 'figma',
      type: 'ui',
      status: {
        key: 'deprecated',
        note: 'Figma kits are being refactored now that Carbon has released their Figma kits.'
      },
      url: 'https://www.figma.com/file/8leBSqQSIv9GWzX9XXyeEP/%F0%9F%9A%ABCarbon-for-IBM.com-(Gray-10-Theme)-Beta-%5BTo-be-deprecated%5D?node-id=516%3A375',
      action: 'link',
      maintainer: 'ibm-dotcom',
      id: 'ibm-dotcom-g10-figma',
      statusKey: 'deprecated'
    },
    {
      name: 'IBM.com Figma gray 90 theme',
      description: "This Gray 90 theme Figma kit includes components, color tokens, and expressive and productive type styles to build web experiences that adhere to IBM's web standards.",
      tool: 'figma',
      type: 'ui',
      status: {
        key: 'deprecated',
        note: 'Figma kits are being refactored now that Carbon has released their Figma kits.'
      },
      url: 'https://www.figma.com/file/89LMb0HHcVQBslVrg4lTEj/%F0%9F%9A%ABCarbon-for-IBM.com-(Gray-90-Theme)-Beta-%5BTo-be-deprecated%5D',
      action: 'link',
      maintainer: 'ibm-dotcom',
      id: 'ibm-dotcom-g90-figma',
      statusKey: 'deprecated'
    },
    {
      name: 'IBM.com Figma gray 100 theme',
      description: "This Gray 100 theme Figma kit includes components, color tokens, and expressive and productive type styles to build web experiences that adhere to IBM's web standards.",
      tool: 'figma',
      type: 'ui',
      status: {
        key: 'deprecated',
        note: 'Figma kits are being refactored now that Carbon has released their Figma kits.'
      },
      url: 'https://www.figma.com/file/s8bPpdt9JQDi07Z8NLj2g8/%F0%9F%9A%ABCarbon-for-IBM.com-(Gray-100-Theme)-Beta-%5BTo-be-deprecated%5D',
      action: 'link',
      maintainer: 'ibm-dotcom',
      id: 'ibm-dotcom-g100-figma',
      statusKey: 'deprecated'
    },
    {
      name: 'IBM Products Figma gray 10 theme',
      description: 'This Gray 10 theme Figma kit provides a portfolio of components and resources for designers working on products within Cloud, Data, and Security.',
      tool: 'figma',
      type: 'ui',
      status: 'stable',
      url: 'https://www.figma.com/file/Yz74b1hPqqYWwEtmcPqojq/Gray-10---IBM-Products',
      action: 'link',
      maintainer: 'ibm-products',
      id: 'ibm-products-g10-figma',
      statusKey: 'stable'
    },
    {
      name: 'Cloud PAL Figma light theme',
      description: 'This light theme Figma kit contains all components used to create scalable and accessible experiences on IBM Cloud.',
      tool: 'figma',
      type: 'ui',
      status: 'stable',
      url: 'https://www.figma.com/file/upZIO5LXG9OnHCKwCawlur/Light---Cloud-PAL',
      action: 'link',
      noIndex: true,
      maintainer: 'ibm-cloud',
      id: 'ibm-cloud-light-figma',
      statusKey: 'stable'
    },
    {
      name: 'Figma v11 white theme',
      description: 'Use this v11 white theme Figma kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'figma',
      type: 'ui',
      status: 'stable',
      url: 'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11-BETA)-White-Theme---Carbon-Design-System',
      action: 'link',
      maintainer: 'carbon',
      id: 'figma-v11-white-theme',
      statusKey: 'stable'
    },
    {
      name: 'Figma v11 gray 10 theme',
      description: 'Use this v11 Gray 10 theme Figma kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'figma',
      type: 'ui',
      status: 'stable',
      url: 'https://www.figma.com/file/0sd447WTcazDI6Dq9tjXOe/(v11-BETA)-Gray-10-Theme---Carbon-Design-System',
      action: 'link',
      maintainer: 'carbon',
      id: 'figma-v11-gray-10-theme',
      statusKey: 'stable'
    },
    {
      name: 'Figma v11 gray 90 theme',
      description: 'Use this v11 Gray 90 theme Figma kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'figma',
      type: 'ui',
      status: 'stable',
      url: 'https://www.figma.com/file/fH8rkv1VUTw5pvFDvO1kPO/(v11-BETA)-Gray-90-Theme---Carbon-Design-System',
      action: 'link',
      maintainer: 'carbon',
      id: 'figma-v11-gray-90-theme',
      statusKey: 'stable'
    },
    {
      name: 'Figma v11 gray 100 theme',
      description: 'Use this v11 Gray 100 theme Figma kit to rapidly design user interfaces with Carbon’s core components.',
      tool: 'figma',
      type: 'ui',
      status: 'stable',
      url: 'https://www.figma.com/file/XhRIHF6qGiJQaJ5eOSSBRm/(v11-BETA)-Gray-100-Theme---Carbon-Design-System',
      action: 'link',
      maintainer: 'carbon',
      id: 'figma-v11-gray-100-theme',
      statusKey: 'stable'
    },
    {
      name: 'Figma color styles',
      description: 'Use this Figma kit to apply colors from the IBM Design Language to your projects.',
      tool: 'figma',
      type: 'elements',
      status: 'stable',
      url: 'https://www.figma.com/file/Gvwx2RnAZzDKTjVuC5xOlO/Color-Styles---IBM-Design-Language?node-id=129%3A2',
      action: 'link',
      maintainer: 'ibm-brand',
      id: 'color-styles-figma',
      statusKey: 'stable'
    },
    {
      name: 'Figma v11 text styles',
      description: 'Use this Figma kit to apply v11 type styles to your projects using the IBM Design Language.',
      tool: 'figma',
      type: 'elements',
      status: 'stable',
      url: 'https://www.figma.com/file/rK06GY6bvEfokuzrFGdtWB/(v11)-Text-Styles---IBM-Design-Language?node-id=129%3A2',
      action: 'link',
      maintainer: 'ibm-brand',
      id: 'v11-text-styles-figma',
      statusKey: 'stable'
    },
    {
      name: 'Figma IBM icons',
      description: 'This Figma kit includes IBM icons to apply in projects that use the IBM Design Language.',
      tool: 'figma',
      type: 'elements',
      status: 'stable',
      url: 'https://www.figma.com/file/J5c0d85dSJn9JnBhSYYLmD/Icons---IBM-Design-Language?node-id=129%3A2',
      action: 'link',
      maintainer: 'ibm-brand',
      id: 'ibm-icons-figma',
      statusKey: 'stable'
    },
    {
      name: 'Figma IBM pictograms',
      description: 'This Figma kit includes IBM pictograms to apply in projects that use the IBM Design Language.',
      tool: 'figma',
      type: 'elements',
      status: 'stable',
      url: 'https://www.figma.com/file/PkUl9UBuvA41GPpyl84NBc/Pictograms---IBM-Design-Language',
      action: 'link',
      maintainer: 'ibm-brand',
      id: 'ibm-pictograms-figma',
      statusKey: 'stable'
    }
  ]}
  designTools={['Figma', 'Sketch', 'Adobe XD', 'Axure']}
  designKitIds={[
    'axure-widget-library',
    'ibm-accessibility-figma',
    'ibm-icons-16-20-sketch',
    'ibm-icons-24-32-sketch',
    'ibm-grid-sketch',
    'carbon-white-sketch',
    'carbon-g10-sketch',
    'carbon-g90-sketch',
    'carbon-g100-sketch',
    'ibm-accessibility-sketch',
    'carbon-white-adobe-xd',
    'carbon-g10-adobe-xd',
    'carbon-g90-adobe-xd',
    'carbon-g100-adobe-xd',
    'ibm-icons-adobe-xd',
    'carbon-template-axure',
    'ibm-design-language-sketch',
    'carbon-g10-axure',
    'carbon-mid-fi-sketch',
    'figma-v11-white-theme',
    'figma-v11-gray-10-theme',
    'figma-v11-gray-90-theme',
    'figma-v11-gray-100-theme',
    'ibm-pictograms-figma',
    'ibm-icons-figma',
    'v11-text-styles-figma',
    'color-styles-figma'
  ]}
/>

# GifPlayer

<Column colLg='4'>
<GifPlayer>

![IBM Cloud Pictograms](https://github.com/carbon-design-system/carbon-platform/blob/main/services/web-app/public/mdx/cloud.gif?raw=true)

![IBM Cloud Pictograms](https://github.com/carbon-design-system/carbon-platform/blob/main/services/web-app/public/mdx/cloud.jpg?raw=true)

</GifPlayer>
</Column>

<Column colLg='4'>
    <GifPlayer>

    <Image src="https://github.com/carbon-design-system/carbon-platform/blob/main/services/web-app/public/mdx/cloud.gif?raw=truef" />
    <Image src="https://github.com/carbon-design-system/carbon-platform/blob/main/services/web-app/public/mdx/cloud.jpg?raw=true" />

    </GifPlayer>

</Column>

# ImageWrapper

Fixed image demo.

<ImageWrapper type="fixed">

![demo fixed image](https://github.com/carbon-design-system/carbon-platform/blob/main/services/web-app/public/mdx/accordion-style-3.png?raw=true)

</ImageWrapper>

# MdxIcon

<Grid>
  <Column>
    <MdxIcon name="figma" />
  </Column>
  <Column>
    <MdxIcon name="sketch" />
  </Column>
  <Column>
    <MdxIcon name="ase" />
  </Column>
</Grid>

## MdxIcon Inverse

<Grid style={{ background: 'gray' }}>
  <Column>
    <MdxIcon name="github" color="inverse" />
  </Column>
  <Column>
    <MdxIcon name="bee" color="inverse" />
  </Column>
</Grid>


  `

  const safeSource = await processMdxSource(mdxSource, url)

  // TODO: query GH for the actual tabs and have one supersede the other
  const tabs = safeSource?.compiledSource?.data?.matter?.tabs || []

  return {
    props: {
      ...safeSource,
      tabs
    }
  }
}

export default RemoteMdxTest
