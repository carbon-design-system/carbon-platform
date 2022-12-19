/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid } from '@carbon/react'
import {
  AnchorLink,
  AnchorLinks,
  Column,
  H2,
  H3,
  H4,
  Link,
  P,
  PageDescription,
  PageTable,
  ResourceCard,
  Row
} from '@carbon-platform/mdx-components'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ContentWrapper from '@/components/content-wrapper'
import Image from '@/components/image'
import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs/page-tabs'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

const Color = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Accessibility',
    description:
      'IBM firmly believes that web and software experiences should be accessible for everyone. Carbon is ' +
      'committed to following best practices when it comes to accessibility.'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  const tabs = [
    {
      name: 'Overview',
      path: '/guidelines/accessibility/overview'
    },
    {
      name: 'Color',
      path: '/guidelines/accessibility/color'
    },
    {
      name: 'Developers',
      path: '/guidelines/accessibility/developers'
    },
    {
      name: 'Keyboard',
      path: '/guidelines/accessibility/keyboard'
    }
  ]

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} withTabs />
      <PageTabs title="Page tabs" tabs={tabs} />
      <ContentWrapper>
        <PageDescription>
          Visual impairments can include low vision, color blindness, and complete blindness. Carbon
          components are designed to accommodate the entire spectrum of visual impairment, though
          designers still need to exercise diligence to ensure that the components are used
          correctly.
        </PageDescription>

        <AnchorLinks>
          <AnchorLink>Color contrast</AnchorLink>
          <AnchorLink>Low vision</AnchorLink>
          <AnchorLink>Tools</AnchorLink>
          <AnchorLink>Resources</AnchorLink>
        </AnchorLinks>

        <H2>Color contrast</H2>

        <P>
          Carbon strives to meet{' '}
          <Link href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
            WCAG AA standards
          </Link>{' '}
          across all standard themes in the system, including color contrast ratios.
        </P>

        <PageTable columns={2}>
          <thead>
            <tr>
              <th>Element type</th>
              <th>Contrast ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard text</td>
              <td>4.5:1</td>
            </tr>
            <tr>
              <td>Large text</td>
              <td>3:1</td>
            </tr>
            <tr>
              <td>UI components</td>
              <td>3:1</td>
            </tr>
          </tbody>
        </PageTable>

        <H4>Standard text</H4>

        <P>
          Standard text and images of text must have a contrast ratio of at least <em>4.5:1</em>.
        </P>

        <H4>Large text</H4>

        <P>
          Large text (at least 24 px regular and light / 19 px semi-bold) must have a contrast ratio
          of <em>3:1</em>
        </P>

        <H4>Text against non–static backgrounds</H4>

        <P>
          When text is rendered on a gradient background or image, make sure the text color meets
          contrast standards in all places it appears. This is especially important for parallax
          applications or animations where text and backgrounds are moving independently of each
          other.
        </P>

        <P>
          Visual information used to indicate states and boundaries of UI components must have a
          contrast ratio of 3:1 against adjacent colors. See{' '}
          <Link href="https://www.ibm.com/able/requirements/requirements/#1_4_11">
            IBM checkpoint 1.4.11 Non–text Contrast
          </Link>
        </P>

        <H3>Use of color and color blindness</H3>

        <P>
          Don&apos;t rely on color alone to convey meaning. This includes conveying information,
          indicating an action, prompting the user for a response, or distinguishing one visual
          element from another. When designing with color, it might help to use a color–blind
          simulator to review visibility of content. If you&apos;re working in Sketch, we recommend
          the <Link href="http://www.getstark.co/">Stark</Link> plugin.
        </P>

        <Row>
          <Column colLg={8}>
            <Image
              alt="rainbow palette showing relationship between colors for users with color blindness"
              src="/guidelines/accessibility/color-accessibility-1.png"
            />
          </Column>
        </Row>

        <H2>Tools</H2>

        <Grid className="resource-card-group" condensed>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="High contrast Chrome plugin"
              href="https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph/related?hl=en"
            >
              <Image alt="High–contrast icon" src="/guidelines/accessibility/high-contrast.png" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4} noGutterSm>
            <ResourceCard subTitle="Stark Sketch plugin" href="http://www.getstark.co/">
              <Image alt="Stark logo" src="/guidelines/accessibility/stark.png" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="Color contrast tool"
              href="https://marijohannessen.github.io/color-contrast-checker/"
            >
              <Image
                alt="color contrast icon"
                src="/guidelines/accessibility/color-contrast-icon.png"
              />
            </ResourceCard>
          </Column>
        </Grid>

        <H2>Resources</H2>

        <Grid className="resource-card-group" condensed>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="IBM Equal Access Toolkit"
              href="https://www.ibm.com/able/toolkit"
            >
              <Image alt="IBM bee icon" src="/guidelines/accessibility/bee.svg" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="IBM Web Accessibility Checklist"
              href="https://www.ibm.com/able/requirements/requirements/"
            >
              <Image alt="IBM bee icon" src="/guidelines/accessibility/bee.svg" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4}>
            <ResourceCard subTitle="WCAG 2.1 guidelines" href="https://www.w3.org/TR/WCAG21/">
              <Image alt="IBM bee icon" src="/guidelines/accessibility/bee.svg" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="W3C low vision requirements"
              href="https://www.w3.org/TR/low-vision-needs/"
            >
              <Image alt="IBM bee icon" src="/guidelines/accessibility/bee.svg" />
            </ResourceCard>
          </Column>
        </Grid>
      </ContentWrapper>
    </>
  )
}

export default Color
