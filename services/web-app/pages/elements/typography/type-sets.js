/*
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSnippet } from '@carbon/react'
import {
  AnchorLink,
  AnchorLinks,
  H2,
  H4,
  InlineNotification,
  LI,
  Link,
  P,
  PageDescription,
  UL
} from '@carbon-platform/mdx-components'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ContentWrapper from '@/components/content-wrapper'
import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'
import TypesetStyle from '@/components/typeset-style'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

const tabs = [
  {
    name: 'Overview',
    path: '/elements/typography/overview'
  },
  {
    name: 'Style strategies',
    path: '/elements/typography/style-strategies'
  },
  {
    name: 'Type sets',
    path: '/elements/typography/type-sets'
  },
  {
    name: 'Code',
    path: '/elements/typography/code'
  }
]

const TypeSets = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Typography',
    description:
      'The productive and expressive type sets support designers creating for a full ' +
      'range of user needs and activities across product and web pages.'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} withTabs />
      <PageTabs title="Page tabs" tabs={tabs} />
      <ContentWrapper>
        <PageDescription>
          Carbon uses a clear naming approach and type tokens to manage typography across complex
          and layered layouts and patterns, and these tokens sit within two type sets: expressive
          and productive.
        </PageDescription>
        <InlineNotification>
          <P>
            <strong>v11 update:</strong> The two v10 type sets—Productive and Expressive—have been
            blended together to work as a unified collection in v11. As a result of this
            convergence, type token names have been renamed to better define their relationship to
            one another and reflect its styling. Helpful links:{' '}
            <Link href="https://v10.carbondesignsystem.com/guidelines/typography/overview">
              v10 type tokens
            </Link>{' '}
            |{' '}
            <Link href="/migrating/guide/design#type-tokens-breaking">
              Type token migration guide
            </Link>
            .
          </P>
        </InlineNotification>

        <AnchorLinks>
          <AnchorLink>Overview</AnchorLink>
          {''}
          <AnchorLink>Utility styles</AnchorLink>
          {''}
          <AnchorLink>Body styles</AnchorLink>
          <AnchorLink>Fixed heading styles</AnchorLink>
          {''}
          <AnchorLink>Fluid heading styles</AnchorLink>
          {''}
          <AnchorLink>Fluid display styles</AnchorLink>
          {''}
          <AnchorLink>Questions</AnchorLink>
        </AnchorLinks>

        <H2>Overview</H2>

        <P>
          Carbon uses type tokens to manage typography, and these tokens sit within two type sets.
          The productive and expressive type sets support designers creating for a full range of
          user needs and activities across product and web pages. To understand when to use styles
          from each set, see{' '}
          <Link href="/guidelines/typography/style-strategies">Style strategies</Link>.
        </P>

        <H4>Base type sizes</H4>

        <P>
          The productive type set uses a base type size of 14px, while the expressive type set uses
          a base type size of 16px.
        </P>

        <H4>Style naming conventions</H4>

        <P>
          Within <strong>Body styles</strong> and <strong>Supporting styles</strong>, the same set
          of styles are offered, and an easy way to spot which type set they belong to is to look at
          the suffix. Productive styles are named with a suffix of{' '}
          <CodeSnippet type="inline">-01</CodeSnippet> and expressive style names have a suffix of{' '}
          <CodeSnippet type="inline">-02</CodeSnippet>.
        </P>

        <H4>Two heading sets</H4>

        <P>
          There are two heading sets, one for productive and one for expressive. The major
          difference between them is in how they are implemented in code because of the nature of
          the pages.
        </P>

        <UL>
          <LI>
            <P>
              The productive type set uses <em>fixed</em> headings. Product pages have a higher
              density of information housed inside containers for space efficiency, and in these
              situations fixed type styles are a must.
            </P>
          </LI>
          <LI>
            <P>
              The expressive type set has two fixed headings that are to be used where smaller
              headings are needed. The remaining headings are <em>fluid</em>. Web pages need to be
              able to flex and work at different breakpoints, and the fluid heading styles change
              size at different breakpoints, and can extrapolate/stretch in between sizes for smooth
              transitions.
            </P>
          </LI>
        </UL>

        <H2>Utility styles</H2>

        <P>
          The utility styles are used with productive and expressive moments and include styles for
          code snippets, labels for captions and helper text, as well as legal copy. Productive
          styles have a suffix of <CodeSnippet type="inline">-01</CodeSnippet> and expressive styles
          have a suffix of <CodeSnippet type="inline">-02</CodeSnippet>.
        </P>

        <TypesetStyle typesets="smallStyle" />

        <H2>Body styles</H2>

        <P>
          There are two body styles for productive and expressive moments. Productive styles have a
          suffix of <CodeSnippet type="inline">-01</CodeSnippet> and expressive styles have a suffix
          of <CodeSnippet type="inline">-02</CodeSnippet>.
        </P>

        <TypesetStyle typesets="body" />

        <H2>Fixed heading styles</H2>

        <P>
          The fixed heading styles are used for product pages where multiple containers are used and
          space efficiency is key. Fixed means they are not responsive. The type size remains
          constant regardless of break point.
        </P>

        <P>
          Creators of web pages also use the fixed headings{' '}
          <CodeSnippet type="inline">-01</CodeSnippet> and{' '}
          <CodeSnippet type="inline">-02</CodeSnippet> where smaller headings are needed.
        </P>

        <TypesetStyle typesets="fixedHeadings" />

        <H2>Fluid display styles</H2>

        <P>
          The callout and display styles are part of the expressive set and being fluid, they will
          adjust at different breakpoints. Do not use these styles inside a container. For guidance
          about using display styles, see{' '}
          <Link href="/guidelines/typography/style-strategies#expressive-use-cases">
            Style strategies
          </Link>
          .
        </P>

        <TypesetStyle typesets="fluidCallouts,fluidDisplay" breakpointControls={true} />

        <H2>Questions?</H2>

        <P>
          <em>For IBMers only:</em> If you have any questions about using either of these
          experiences, reach out to the teams on Slack or sign up to share your work in a review.
        </P>

        <H4>Carbon Design System</H4>

        <UL>
          <LI>
            Slack channel:{' '}
            <Link href="https://ibm-studios.slack.com/messages/C0M053VPT/">
              #carbon-design-system
            </Link>
          </LI>
          <LI>
            <Link href="https://www.carbondesignsystem.com/whats-happening/meetups/">Meetups</Link>{' '}
            with Carbon Design System
          </LI>
        </UL>

        <H4>Carbon for IBM Dotcom</H4>

        <UL>
          <LI>
            Slack channel:{' '}
            <Link href="https://cognitive-app.slack.com/archives/C2PLX8GQ6">
              #carbon-for-ibm-dotcom
            </Link>
          </LI>
          <LI>
            Office hours with Carbon for IBM.com. See our{' '}
            <Link href="https://cognitive-app.slack.com/archives/C2PLX8GQ6">Slack channel</Link> for
            details.
          </LI>
        </UL>
      </ContentWrapper>
    </>
  )
}

export default TypeSets
