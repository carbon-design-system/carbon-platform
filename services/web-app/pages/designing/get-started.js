/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSnippet, Grid } from '@carbon/react'
import {
  AnchorLink,
  AnchorLinks,
  ArtDirection,
  CardGroup,
  Column,
  Link,
  MiniCard,
  P,
  PageDescription,
  PageTable,
  ResourceCard
} from '@carbon-platform/mdx-components'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ContentWrapper from '@/components/content-wrapper'
import FilterableDesignKitTable from '@/components/filterable-design-kit-table'
import Image from '@/components/image'
import H2 from '@/components/markdown/h2'
import H3 from '@/components/markdown/h3'
import MdxIcon from '@/components/mdx-icon/mdx-icon'
import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getAllDesignKits } from '@/lib/github'

const GetStarted = ({ designKitsData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Get Started'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} />
      <ContentWrapper>
        <PageDescription>
          If you’re just starting out designing with Carbon, you’re in the right place. Navigate
          through each of the four steps to get up and running.
        </PageDescription>

        <AnchorLinks>
          <AnchorLink>Step 1: Learn about Carbon</AnchorLink>
          <AnchorLink>Step 2: Access design tools</AnchorLink>
          <AnchorLink>Step 3: Get the design kits</AnchorLink>
          <AnchorLink>Step 4: Review foundational guidance</AnchorLink>
        </AnchorLinks>

        <H2>Step 1: Learn about Carbon</H2>

        <P>
          By adopting Carbon, designers gain a collection of reusable assets to design websites and
          user interfaces quickly and efficiently.
        </P>

        <P>
          The <Link href="https://www.ibm.com/design/language/">IBM Design Language</Link> governs
          IBM’s brand story and visual expression, and Carbon translates the design language into
          resources for building digital experiences.
        </P>

        <P>
          This is done through <CodeSnippet type="inline">elements</CodeSnippet> such as color
          tokens, type tokens, and spacing tokens that are meant to be applied to all sorts of
          things like websites, banners at conferences, and email templates. Carbon also applies the
          design language to product UI through guidance and components.
        </P>

        <H3>Understand the ecosystem</H3>

        <P>
          Carbon is a system of systems. At the epicenter lies the{' '}
          <CodeSnippet type="inline">core system</CodeSnippet>, with elements, assets, code, design
          kits, and guidelines intended as a base for the widest variety of situations. These assets
          are open source and can be easily extended or adapted.
        </P>

        <P>
          Teams at IBM also create <CodeSnippet type="inline">local systems</CodeSnippet> that
          depend on and extend the core system for specific use cases.
        </P>

        <ArtDirection>
          <Image
            alt={'Carbon ecosystem'}
            src="/about-carbon/ecosystemSm.png"
            layout="responsive"
            objectFit="cover"
          />
          <Image
            alt={'Carbon ecosystem'}
            src="/designing/get-started/CarbonSystem.png"
            layout="responsive"
            objectFit="cover"
          />
        </ArtDirection>

        <H2>Step 2: Access design tools</H2>

        <P>
          IBMers should ask their team about which tool they should adopt and follow instructions in
          the <Link href="https://w3.ibm.com/design/toolbox/#/">Design Toolbox</Link> to procure a
          software license. Carbon is supported on Figma, Sketch, Adobe XD, and Axure.
        </P>

        <Grid className="resource-card-group" condensed>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="Get Figma"
              aspectRatio="2:1"
              actionIcon="launch"
              href="https://w3.ibm.com/design/toolbox/#/ui-design-tools/figma/README"
            >
              <MdxIcon name="figma" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="Get Sketch"
              actionIcon="launch"
              aspectRatio="2:1"
              href="https://w3.ibm.com/design/toolbox/#/ui-design-tools/sketch/README"
            >
              <MdxIcon name="sketch" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="Get Adobe XD"
              aspectRatio="2:1"
              actionIcon="launch"
              href="https://w3.ibm.com/design/toolbox/#/ui-design-tools/adobe-creative-cloud/README"
            >
              <MdxIcon name="adobe32" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="Get Axure"
              aspectRatio="2:1"
              actionIcon="launch"
              href="https://w3.ibm.com/design/toolbox/#/prototyping-tools/axure/README"
            >
              <MdxIcon name="axure32" />
            </ResourceCard>
          </Column>
        </Grid>

        <H2>Step 3: Get the design kits</H2>

        <P>
          <CodeSnippet type="inline">Design kits</CodeSnippet> are libraries from Sketch and
          Figma—and other tools such as Adobe XD and Invision. They contain components and elements
          as well as wireframes and guidance to aid designers.
        </P>

        <P>
          They are also living, breathing documents. This means you’ll automatically get any updates
          made by the Carbon team so you don’t need to go back and change any designs to match the
          latest release. And when handing off to your developers there won’t be confusion about
          components and their behaviors.
        </P>

        <P>The following illustration shows how design kits depend on one another.</P>

        <Image src="/designing/get-started/KitDependencies.png" />

        <H3>Tutorials</H3>

        <P>
          When you have access to your design tool of choice, head over to our tool–based tutorials
          to get step–by–step guidance on installing the kits.
        </P>

        <CardGroup>
          <MiniCard
            title="Figma tutorial"
            href="https://next.carbondesignsystem.com/designing/figma"
          >
            <MdxIcon name="figma" />
          </MiniCard>
          <MiniCard
            title="Sketch tutorial"
            href="https://next.carbondesignsystem.com/designing/sketch"
          >
            <MdxIcon name="sketch" />
          </MiniCard>
          <MiniCard
            title="Adobe XD tutorial"
            href="https://next.carbondesignsystem.com/designing/adobe-xd"
          >
            <MdxIcon name="adobe24" />
          </MiniCard>
          <MiniCard
            title="Axure tutorial"
            href="https://next.carbondesignsystem.com/designing/axure"
          >
            <MdxIcon name="axure32" />
          </MiniCard>
        </CardGroup>

        <H3>Core design kits</H3>

        <P>
          Everyone using Carbon should use core design kits as a starting point for building user
          interfaces. This brings consistency and speed, allowing teams to focus on solving more
          specific user tasks. Core design kits include elements, core components, wireframes, and
          guidelines.
        </P>

        <FilterableDesignKitTable
          designKitsData={designKitsData}
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

        <H3>Local design kits</H3>

        <P>
          Additional design kits compliment and extend Carbon. For example, IBM.com provides
          components for an editorial approach. More kits can be found in the{' '}
          <Link href="/design-kits">design kit catalog</Link>. The kits in the table below are only
          offered in Figma.
        </P>

        <FilterableDesignKitTable
          designKitsData={designKitsData}
          designKitIds={[
            'ibm-dotcom-g10-figma',
            'ibm-dotcom-white-figma',
            'ibm-dotcom-g90-figma',
            'ibm-dotcom-g100-figma'
          ]}
        />

        <H2>Step 4: Review foundational guidance</H2>

        <P>
          The following sites provide guidance for creating experiences that are consistent, provide
          an interoperability of experience with other offerings, and represent IBM as a company.
        </P>

        <PageTable columns={2}>
          <thead>
            <tr>
              <th>
                <strong>Resource</strong>
              </th>
              <th>
                <strong>What you&apos;ll find</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link href="https://www.ibm.com/brand/">IBM Brand Center</Link>
              </td>
              <td>
                Home base for the IBM Brand story, visual brand elements, guidelines, and assets.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://www.ibm.com/brand/experience-guides">IBM Brand Systems</Link>
              </td>
              <td>
                Documentation of the rationale behind every visual and verbal detail for IBM
                businesses, audiences, categories, and offerings.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://www.ibm.com/design/language/">IBM Design Language</Link>
              </td>
              <td>
                IBM’s design philosophy and principles that govern and guide every experience
                designed by IBM.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://ibmdocs-test.mybluemix.net/docs/en/ibm-style?_ga=2.139068405.716538948.1649782752-687898146.1623775061">
                  IBM Style
                </Link>
              </td>
              <td>
                A central reference that ensures all IBM content for external audiences is
                grammatically correct, clear, consistent, appropriate for global audiences, and easy
                to translate.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://w3.ibm.com/design/experience-standards/">
                  IBM Experience Standards
                </Link>
              </td>
              <td>
                Provides a shared definition of our standards at IBM, a way to measure excellence,{' '}
                and actionable ways to improve product or service experiences.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://www.ibm.com/able/">IBM Accessibility</Link>
              </td>
              <td>Discipline-specific direction on how to make your product more accessible.</td>
            </tr>
          </tbody>
        </PageTable>
      </ContentWrapper>
    </>
  )
}

export const getStaticProps = async () => {
  const designKitsData = await getAllDesignKits()
  return {
    props: { designKitsData },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export default GetStarted
