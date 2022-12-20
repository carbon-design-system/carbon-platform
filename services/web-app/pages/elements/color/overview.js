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
  Caption,
  Column,
  DoDont,
  DoDontRow,
  GifPlayer,
  H4,
  LI,
  Link,
  P,
  PageDescription,
  PageTable,
  ResourceCard,
  Row,
  Tab,
  Tabs,
  Title,
  UL,
  Video
} from '@carbon-platform/mdx-components'
import clsx from 'clsx'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ColorBlock from '@/components/color-block'
import ColorGrid from '@/components/color-grid'
import ContentWrapper from '@/components/content-wrapper'
import Image from '@/components/image'
import H2 from '@/components/markdown/h2'
import H3 from '@/components/markdown/h3'
import MdxIcon from '@/components/mdx-icon/mdx-icon'
import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { useId } from '@/utils/use-id'

import styles from './color-block.module.scss'

const Overview = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const lightThemeTabsId = useId('tabs')
  const darkThemeTabsId = useId('tabs')

  const seo = {
    title: 'Color',
    description:
      'Maintaining consistent and engaging digital interfaces throughout IBM, whether applications or ' +
      'experiences, demands extended guidance around color usage.'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  const tabs = [
    {
      name: 'Overview',
      path: '/elements/color/overview'
    },
    {
      name: 'Usage',
      path: '/elements/color/usage'
    },
    {
      name: 'Code',
      path: '/elements/color/code'
    },
    {
      name: 'Implementation',
      path: '/elements/color/implementation'
    }
  ]

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} withTabs />
      <PageTabs title="Page tabs" tabs={tabs} />
      <ContentWrapper>
        <PageDescription>
          Maintaining consistent and engaging digital interfaces throughout IBM, whether
          applications or experiences, demands extended guidance around color usage. The following
          concepts provide the foundation as we strive to achieve balance and harmony through our
          User Interface design.
        </PageDescription>
        <AnchorLinks>
          <AnchorLink>Introduction</AnchorLink>
          <AnchorLink>Color anatomy</AnchorLink>
          <AnchorLink>Implementing color</AnchorLink>
          <AnchorLink>Themes</AnchorLink>
          <AnchorLink>Tokens</AnchorLink>
          <AnchorLink>Interaction states</AnchorLink>
          <AnchorLink>Accessibility</AnchorLink>
          <AnchorLink>Resources</AnchorLink>
        </AnchorLinks>
        <Video title="Color Overview" vimeoId="281513790" />
        <br />
        <br />
        <H2>Introduction</H2>
        <P>
          Application of the color palette brings a unified and recognizable consistency to{' '}
          {"IBM's"} array of digital products and interfaces. This consistency is grounded in a set
          of well–defined rules about how to work with the Carbon component library in the context
          of dark and light themes.
        </P>
        <GifPlayer color="dark">
          <Image
            alt="6 screenshots showing a range of color schemes and considerations for text and data visualizations"
            src="/elements/color/introduction.gif"
          />
          <Image alt="UI color alternatives" src="/elements/color/introduction.jpeg" />
        </GifPlayer>
        <H2>Color anatomy</H2>
        <P>
          {'Carbon’s'} default themes are derived from the IBM Design Language color palette. The
          neutral gray family is dominant in the default themes, making use of subtle shifts in
          value to organize content into distinct zones.
        </P>
        <P>
          The core blue family serves as the primary action color across all IBM products and
          experiences. Additional colors are used sparingly and purposefully.
        </P>
        <div>
          <ColorGrid colorFamily="blue" />
          <ColorGrid colorFamily="gray" />
        </div>
        <ColorGrid colorFamily="alerts" style={{ marginTop: '2rem' }} />
        <Caption>Alert Colors</Caption>
        <H3>Layering model</H3>
        <P>
          Colors in the neutral gray palette are layered on top of each other to create depth and
          spatial associations. The layering model defines the logic of how colors stack on top of
          each other in a UI when using the Carbon themes. Aspects of the layering model are built
          directly into the themes, color tokens, and components.
        </P>
        <P>
          The layering model differs between the {<em>light</em>} and {<em>dark</em>} themes.
        </P>
        <UL>
          <LI>
            In the light themes, layers alternate between White and Gray 10 with each added layer.
          </LI>
          <LI>In the dark themes, layers become one step lighter with each added layer.</LI>
        </UL>
        <Row>
          <Column colLg={12}>
            <Image
              alt="Layering model for light themes"
              src="/elements/color/color-layering-model.png"
            />
          </Column>
        </Row>
        <Caption>Layering model for the White theme (left) and Gray 100 theme (right)</Caption>
        <br /> <H2>Implementing color</H2>
        <P>
          Carbon uses tokens and themes to manage color. Tokens are role–based, and themes specify
          the color values that serve those roles in the UI.
        </P>
        <PageTable columns={2}>
          <thead>
            <tr>
              <th>Term</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <em>Theme</em>
              </td>
              <td>
                A theme is a collection of colors designed to create a specific aesthetic. Themes
                control the color value assigned to a token. For example, Gray 100 theme.
              </td>
            </tr>
            <tr>
              <td>
                <em>Token</em>
              </td>
              <td>
                A token is the role–based identifier that assigns a color. Unlike hex codes, tokens
                apply universally across themes. For example,{' '}
                {<CodeSnippet type="inline">$layer</CodeSnippet>},{' '}
                {<CodeSnippet type="inline">$border-subtle</CodeSnippet>},{' '}
                {<CodeSnippet type="inline">$support-error</CodeSnippet>}
              </td>
            </tr>
            <tr>
              <td>
                <em>Role</em>
              </td>
              <td>
                A role is the systematic usage of a color assigned to a token. Roles cannot be
                changed between themes.
              </td>
            </tr>
            <tr>
              <td>
                <em>Value</em>
              </td>
              <td>
                A value is the unique visual attribute (hex code, rgba value) assigned to a token
                through the use of themes.
              </td>
            </tr>
          </tbody>
        </PageTable>
        <H2>Themes</H2>
        <P>
          Themes serve as an organizational framework for color in Carbon, with each theme based on
          a specific primary background color. And they actually get their names from their
          background color. There are two default {<em>light</em>} themes and two default{' '}
          {<em>dark</em>} themes.
        </P>
        <P>
          The light themes are based on White and Gray 10 backgrounds, and the dark themes use Gray
          100 and Gray 90 backgrounds. Within each theme, the values for the universal color tokens
          use the primary background color as the base of its layering model.
        </P>
        <Grid condensed className={styles['color-block']}>
          <Column sm={1} md={1} lg={2}>
            <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <div
                className={clsx(
                  'cds--aspect-ratio--object',
                  styles['color-square'],
                  styles['color-square--white']
                )}
              >
                White
              </div>
            </div>

            <Caption>Light</Caption>
          </Column>
          <Column sm={1} md={1} lg={2}>
            <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <div
                className={clsx(
                  'cds--aspect-ratio--object',
                  styles['color-square'],
                  styles['color-square--gray-10']
                )}
              >
                Gray 10
              </div>
            </div>
          </Column>
          <Column sm={1} md={1} lg={2}>
            <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <div
                className={clsx(
                  'cds--aspect-ratio--object',
                  styles['color-square'],
                  styles['color-square--gray-100']
                )}
              >
                Gray 100
              </div>
            </div>

            <Caption>Dark</Caption>
          </Column>
          <Column sm={1} md={1} lg={2}>
            <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <div
                className={clsx(
                  'cds--aspect-ratio--object',
                  styles['color-square'],
                  styles['color-square--gray-90']
                )}
              >
                Gray 90
              </div>
            </div>
          </Column>
        </Grid>
        <br />
        <Title> Global background colors </Title>
        <PageTable columns={5}>
          <thead>
            <tr>
              <th>Theme</th>
              <th>Primary background</th>
              <th>Token</th>
              <th>Hex value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>White</td>
              <td>Global Background Light</td>
              <td>
                <CodeSnippet type="inline">$background</CodeSnippet>
              </td>
              <td>
                <CodeSnippet type="inline">#ffffff</CodeSnippet>
              </td>
              <td>
                <ColorBlock size="xs">#ffffff</ColorBlock>
              </td>
            </tr>
            <tr>
              <td>Gray 10</td>
              <td>Global Background Light</td>
              <td>
                <CodeSnippet type="inline">$background</CodeSnippet>
              </td>
              <td>
                <CodeSnippet type="inline">#f4f4f4</CodeSnippet>
              </td>
              <td>
                <ColorBlock size="xs">#f4f4f4</ColorBlock>
              </td>
            </tr>
            <tr>
              <td>Gray 90</td>
              <td>Global Background Dark</td>
              <td>
                <CodeSnippet type="inline">$background</CodeSnippet>
              </td>
              <td>
                <CodeSnippet type="inline">#262626</CodeSnippet>
              </td>
              <td>
                <ColorBlock size="xs">#282828</ColorBlock>
              </td>
            </tr>
            <tr>
              <td>Gray 100</td>
              <td>Global Background Dark</td>
              <td>
                <CodeSnippet type="inline">$background</CodeSnippet>
              </td>
              <td>
                <CodeSnippet type="inline">#161616</CodeSnippet>
              </td>
              <td>
                <ColorBlock size="xs">#171717</ColorBlock>
              </td>
            </tr>
          </tbody>
        </PageTable>
        <br />
        <H3>Light themes</H3>
        <P>
          There are two light themes in Carbon: White and Gray 10. For enabled UI colors light
          themes primarily use the color range of White to Gray 20, and for text and icons uses the
          color range between Gray 100 and Gray 60.
        </P>
        <P>All of the themes are available in {<Link href="/design-kits">Design kits</Link>}.</P>
        <H4>Layering model</H4>
        <P>In the light themes, layers alternate between White and Gray 10.</P>
        <UL>
          <LI>
            <strong>White theme</strong>: uses White as the global background color and is layered
            first with components using Gray 10 backgrounds. The second layer uses White and the
            third layer used Gray 10.
          </LI>
          <LI>
            <strong>Gray 10 theme</strong>: uses Gray 10 as the global background color and is
            layered first with components using White backgrounds. The second layer uses Gray 10 and
            the third layer used White.
          </LI>
        </UL>
        <Tabs idPrefix={lightThemeTabsId} tabLabels={['White', 'Gray 10']}>
          <Tab label="White" _id={`${lightThemeTabsId}__0`} index={0}>
            <Image
              alt="A dashboard in the white theme"
              src="/elements/color/color-overview-themes-white.png"
            />
          </Tab>
          <Tab label="Gray 10" _id={`${lightThemeTabsId}__1`} index={1}>
            <Image
              alt="A dashboard in the Gray 10 theme"
              src="/elements/color/color-overview-themes-gray10.png"
            />
          </Tab>
        </Tabs>
        <DoDontRow>
          <DoDont type="do" caption="Gray 10 dropdown on White background." colLg={6}>
            <Image
              alt="Gray 10 dropdown on White background."
              src="/elements/color/Light_theme_01.png"
            />
          </DoDont>
          <DoDont type="dont" colLg={6} caption="Avoid use of midtones.">
            <Image
              alt="Gray 10 dropdown on a Gray 20 background"
              src="/elements/color/Light_theme_04.png"
            />
          </DoDont>
        </DoDontRow>
        <br />
        <H3>Dark themes</H3>
        <P>
          There are two dark themes: Gray 90 and Gray 100. For enabled UI colors, dark themes
          primarily use the color range of Gray 100 through Gray 70, and for text and icons uses the
          color range between White and Gray 50.
        </P>
        <P>All of the themes are available in {<Link href="/design-kits">Design kits</Link>}.</P>
        <H4>Layering model</H4>
        <P>In the dark themes, layers become one step lighter with each added layer.</P>
        <UL>
          <LI>
            <strong>Gray 90 theme</strong>: uses Gray 90 as the global background color and is
            layered first with components using Gray 80 backgrounds. The second layer uses Gray 70
            and the third layer used Gray 60.
          </LI>
          <LI>
            <strong>Gray 100 theme</strong>: uses Gray 100 as the global background color and is
            layered first with components using Gray 90 backgrounds. The second layer uses Gray 80
            and the third layer used Gray 70.
          </LI>
        </UL>
        <Tabs idPrefix={darkThemeTabsId} tabLabels={['Gray 90', 'Gray 100']}>
          <Tab label="Gray 90" _id={`${darkThemeTabsId}__0`} index={0}>
            <Image
              alt="A dashboard in the Gray 90 theme"
              src="/elements/color/color-overview-themes-gray90.png"
            />
          </Tab>

          <Tab label="Gray 100" _id={`${darkThemeTabsId}__1`} index={1}>
            <Image
              alt="A dashboard in the Gray 100 theme"
              src="/elements/color/color-overview-themes-gray100.png"
            />
          </Tab>
        </Tabs>
        <DoDontRow>
          <DoDont type="do" colLg={6} caption="Gray 90 dropdown on Gray 100 background.">
            <Image
              alt="Gray 90 dropdown on Gray 100 background"
              src="/elements/color/Dark_theme_01_new.png"
            />
          </DoDont>
          <DoDont
            type="dont"
            colLg={6}
            caption="Do not apply components that are darker than the background unless using high-contrast mode."
          >
            <Image
              alt="Gray 100 dropdown on Gray 90 background"
              src="/elements/color/Dark_theme_04_new.png"
            />
          </DoDont>
        </DoDontRow>
        <br />
        <H3>High contrast moments</H3>
        <P>
          In some cases, it is helpful to apply light components to dark backgrounds or dark
          components to light backgrounds. This technique is useful to focus attention or create
          visual tension. Some high contrast moments are baked into the themes by using the{' '}
          <CodeSnippet type="inline">inverse</CodeSnippet> tokens, like the tooltip component. Other
          times high contrast moments can be achieved through applying
          <Link href="/elements/color/implementation#inline-theming">inline theming</Link> for
          instances like a dark UI Shell Header with a light theme page.
        </P>
        <DoDontRow>
          <DoDont type="do" colLg={6}>
            <Image
              alt="High contrast example in a light theme."
              src="/elements/color/High_contrast_01.png"
            />
          </DoDont>
          <DoDont type="do" colLg={6}>
            <Image
              alt="High contrast example in a dark theme."
              src="/elements/color/High_contrast_02.png"
            />
          </DoDont>
        </DoDontRow>
        <br />
        <H2>Tokens</H2>
        <P>
          Tokens are method of applying color in a consistent, reusable, and scalable way. They help
          us abstract how we use color from the values themselves. They are used in place of hard
          coded values, like hex codes. Tokens allow for value changes to be made at scale, making
          design language changes easy to implement, as well as making possible color
          functionalities like inline theming and light or dark mode.
        </P>
        <P>
          Each token is assigned a role and a value. The role determines what element to apply a
          token too and the value is the actual color (hex code) that appears in the assigned theme.
          Color token names and roles are the same across themes, only the assigned value will
          change with the theme. For example, under the hood the{' '}
          <CodeSnippet type="inline">$text-secondary</CodeSnippet> token can dynamically map to
          <CodeSnippet type="inline">Gray 70</CodeSnippet> or{' '}
          <CodeSnippet type="inline">Gray 30</CodeSnippet> depending on the theme.
        </P>
        <P>
          See the <Link href="/elements/color/usage">color usage</Link> tab for the full list of
          color tokens.
        </P>
        <H3>Token names</H3>
        <P>
          For quick reference, the role of a token is represented in the token name itself to help
          you correctly apply tokens. The first part of the token name references the general UI
          element the color is being applied to, like{' '}
          <CodeSnippet type="inline">background</CodeSnippet>,{' '}
          <CodeSnippet type="inline">text</CodeSnippet>, or{' '}
          <CodeSnippet type="inline">border</CodeSnippet>. The second part of token name will
          specify its unique role within the element group like{' '}
          <CodeSnippet type="inline">$border-subtle</CodeSnippet> or{' '}
          <CodeSnippet type="inline">$text-primary</CodeSnippet>. Additionally, some tokens include
          aninteraction state at the end, like{' '}
          <CodeSnippet type="inline">$background-hover</CodeSnippet>.
        </P>
        <Row>
          <Column colLg={12}>
            <Image
              alt="Generic text input showing same tokens assigned for White and Gray 100 themes."
              src="/elements/color/color-overview-tokens.png"
            />
          </Column>
        </Row>
        <Caption>
          Color tokens for components are the same across themes as shown by this text input using
          the White theme (left) and Gray 100 theme (right).
        </Caption>
        <br />
        <H3>Core tokens</H3>
        <P>
          Color tokens that can be applied across components are called <em>core tokens</em>. There
          are ten main groups of core color tokens. They are grouped by the common UI element that
          they are applied to. Token groups makes it easier to find and apply color tokens.
          Interaction state tokens are included in the group along side their enabled state tokens.
          There are a few core tokens that do not belong to the a group and stand as individual
          tokens like <CodeSnippet type="inline">$overlay</CodeSnippet>,{' '}
          <CodeSnippet type="inline">$highlight</CodeSnippet>, and{' '}
          <CodeSnippet type="inline">$interactive</CodeSnippet>.
        </P>
        <P>
          Some core tokens are part of an additional token group called <em>layering tokens</em>.
          These tokens are used to implement the layering model onto components. For more
          information, see the{' '}
          <Link href="/elements/color/implementation#layer-tokens">Implementation tab</Link>.
        </P>
        <PageTable columns={2}>
          <thead>
            <tr>
              <th>Token group</th>
              <th>Applied to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Background</td>
              <td>Page or primary backgrounds</td>
            </tr>
            <tr>
              <td>Layer</td>
              <td>Stacked backgrounds (includes layering tokens)</td>
            </tr>
            <tr>
              <td>Field</td>
              <td>Form and input backgrounds (includes layering tokens)</td>
            </tr>
            <tr>
              <td>Border</td>
              <td>
                Dividers, rules, and borders between and around elements (includes layering tokens)
              </td>
            </tr>
            <tr>
              <td>Text</td>
              <td>Type and type styles</td>
            </tr>
            <tr>
              <td>Link</td>
              <td>Standalone and inline links</td>
            </tr>
            <tr>
              <td>Icon</td>
              <td>Icons and pictograms</td>
            </tr>
            <tr>
              <td>Support</td>
              <td>Notification elements and status indicators</td>
            </tr>
            <tr>
              <td>Focus</td>
              <td>Focus states</td>
            </tr>
            <tr>
              <td>Skeleton</td>
              <td>Skeleton states </td>
            </tr>
          </tbody>
        </PageTable>
        <br />
        <H3>Component tokens</H3>
        <P>
          Some components have their own specific color tokens, known as <em>component tokens</em>.
          They represent the properties associated with a particular component. They are not global
          tokens like the core tokens and should never be used for anything other than their own
          component. For a full list for component tokens see the{' '}
          <Link href="/elements/color/usage">color usage</Link> tab.
        </P>
        <P>
          To see how the tokens are applied in the components themselves, visit the component’s
          style page.
        </P>
        <UL>
          <LI>
            <Link href="/components/button/style#color">Button</Link>
          </LI>
          <LI>
            <Link href="/components/tag/style#color">Tag</Link>
          </LI>
          <LI>
            <Link href="/components/notification/style#color">Notification</Link>
          </LI>
        </UL>
        <H2>Interaction states</H2>
        <P>
          In addition to the core set of enabled–state tokens, there are five other interaction
          states defined with tokens for each theme. Interaction tokens are signified by the
          addition of a state name added to the end of the base token name. For example, the{' '}
          <CodeSnippet type="inline">$background</CodeSnippet> hover state token is{' '}
          <CodeSnippet type="inline">$background-hover</CodeSnippet>.
        </P>
        <P>The color layering model for interaction tokens is as follows:</P>
        <UL>
          <LI>For values between Black and Gray 70, interaction gets lighter.</LI>
          <LI>For values between Gray 60 and White, interaction gets darker.</LI>
        </UL>
        <Row>
          <Column colLg={12}>
            <Image
              alt="Hover states palette"
              src="/elements/color/color-overview-interactive.png"
            />
          </Column>
        </Row>
        <br />
        <H3>Hover</H3>
        <P>
          Hover is a subtle visual change that appears when a mouse cursor moves over an interactive
          element. Hover states have their own tokens and are identified by{' '}
          <CodeSnippet type="inline">-hover</CodeSnippet> added to the end of the base token name,
          such as <CodeSnippet type="inline">$background-hover</CodeSnippet>.
        </P>
        <P>
          In the IBM themes, hover states token values are “half steps” between two adjacent colors
          on the IBM core color palette steps. These values fall outside of the IBM core color
          palette steps and have their own spectrum. Hover colors should not be used for anything
          other hover states.
        </P>
        <UL>
          <LI>For values between Black and 70, the hover state is a half step lighter.</LI>
          <LI>For values between 60 and White, the hover state is a half step darker.</LI>
        </UL>
        <P>
          Elements like text or icons that use <CodeSnippet type="inline">secondary</CodeSnippet>{' '}
          colors for their enabled state, will change to the
          <CodeSnippet type="inline">primary</CodeSnippet> color on hover, giving them a subtle
          emphasis. Most of the time, this shift in color (on the text or icon element) will be
          accompanied by a background hover color shift as well. For example, an overflow menu uses{' '}
          <CodeSnippet type="inline">$text-secondary</CodeSnippet> and{' '}
          <CodeSnippet type="inline">$layer</CodeSnippet> in its enabled state. On hover, the text
          switches to <CodeSnippet type="inline">$text-primary</CodeSnippet> and the background to{' '}
          <CodeSnippet type="inline">$layer-hover</CodeSnippet>.
        </P>
        <Row>
          <Column colLg={8}>
            <Image
              alt="Hover state colors are half steps"
              src="/elements/color/color-overview-interactive-hover.png"
            />
          </Column>
        </Row>
        <Caption>
          <P>
            Shown in the white theme, &apos;$layer&apos; enabled color (1) has a value of 10 and
            &apos;$layer-hover&apos; (2) has a value of 15.
          </P>
        </Caption>
        <br />
        <H3>Active</H3>
        <P>
          The active state can be used to indicate a <CodeSnippet type="inline">click</CodeSnippet>,{' '}
          <CodeSnippet type="inline">tap</CodeSnippet> or down press of a button. Active tokens are
          identified by <CodeSnippet type="inline">-active</CodeSnippet> added after the base token
          name, such as <CodeSnippet type="inline">$button-primary-active</CodeSnippet>. Active
          state values are two full steps lighter or darker on the IBM color scale. For example, the
          Blue 60 active state is Blue 80.
        </P>
        <UL>
          <LI>For values between 100 and 70, the active state is two full steps lighter.</LI>
          <LI>For values between 60 and 10, the active state is two full steps darker.</LI>
        </UL>
        <P>
          The exceptions are that White value shares the same active state value as Gray 10, and
          Black value shares the same active state value as Gray 100.
        </P>
        <Row>
          <Column colLg={8}>
            <Image
              alt="Active state colors are two steps over"
              src="/elements/color/color-overview-interactive-active.png"
            />
          </Column>
        </Row>
        <Caption>
          <P>
            Shown in the White theme, <CodeSnippet type="inline">$button-primary</CodeSnippet>{' '}
            enabled color (1) has a value of Blue 60 and{' '}
            <CodeSnippet type="inline">$button-primary-active</CodeSnippet> active color (2) has a
            value of Blue 80.
          </P>
        </Caption>
        <br />
        <H3>Selected</H3>
        <P>
          Selected states indicate item(s) or option(s) that have been chosen in the UI by the user
          through any input method. Selected tokens are identified by the{' '}
          <CodeSnippet type="inline">-selected</CodeSnippet> added after base token name, such as{' '}
          <CodeSnippet type="inline">$layer-selected-01</CodeSnippet>. The color logic for selected
          state is either one full step lighter or darker on the IBM color scale. For example, the
          Gray100 selected state is Gray 90.
        </P>
        <UL>
          <LI>For values between 100 and 70, the selected state is one full step lighter.</LI>
          <LI>For values between 60 and 10, the selected state one full step darker.</LI>
        </UL>
        <P>
          The exception is that White shares the same selected state value as Gray 10, and Black
          shares the same selected state value as Gray 100.
        </P>
        <P>
          Elements like text or icons that use <CodeSnippet type="inline">secondary</CodeSnippet>{' '}
          colors for their enabled state, will change to the{' '}
          <CodeSnippet type="inline">primary</CodeSnippet> color when selected, giving them a subtle
          emphasis. Most of the time, this shift in color (to the text or icon element) will be
          accompanied by a selected background color shift as well.
        </P>
        <Row>
          <Column colLg={8}>
            <Image
              alt="Selected state colors are one step over"
              src="/elements/color/color-overview-interactive-selected.png"
            />
          </Column>
        </Row>
        <Caption>
          Shown in the white theme, <CodeSnippet type="inline">$layer</CodeSnippet> enabled color
          (1) has a value of Gray 10 and <CodeSnippet type="inline">$layer-selected</CodeSnippet>{' '}
          selected color (2) has a value of Gray 20.
        </Caption>
        <br />
        <H3>Focus</H3>
        <P>
          The focus state draws attention to the active element on a page when using the keyboard or
          voice to navigate. In Carbon, the focus of an element is most commonly indicated by a 2px
          border around the element. In order to make it easy to identify and locate on a page, most
          focus states use only one color per theme controlled through the{' '}
          <CodeSnippet type="inline">$focus</CodeSnippet> color token.
        </P>
        <UL>
          <LI>In the light themes, the focus state usually appears as a Blue 60 border.</LI>
          <LI>In the dark themes, the focus state usually appears as a White border.</LI>
        </UL>
        <P>
          The exception is high contrast moments where a{' '}
          <CodeSnippet type="inline">$focus-inverse</CodeSnippet> color is used instead.
        </P>
        <P>
          Focus states are required on all interactive elements and must pass 3:1 color contrast
          accessibility. Often times to achieve proper 3:1 contrast a{' '}
          <CodeSnippet type="inline">$focus-inset</CodeSnippet> border is used between the focus
          border and the element itself.
        </P>
        <Row>
          <Column colLg={8}>
            <Image
              alt="Focus state colors"
              src="/elements/color/color-overview-interactive-focus.png"
            />
          </Column>
        </Row>
        <Caption>
          White theme <CodeSnippet type="inline">$focus</CodeSnippet> color (1) and Gray 90 theme{' '}
          <CodeSnippet type="inline">$focus</CodeSnippet> color (2).
        </Caption>
        <br />
        <H3>Disabled</H3>
        <P>
          A disabled state is applied to a component when the user is not allowed to interact with
          the component due to either permissions, dependencies, or pre–requisites. Disabled states
          completely remove the interactive function of a component and therefore don&apos;t receive
          hover or focus. Disabled state styling is not subject to WC3 contrast compliance standards
          and is intentionally de–emphasized in a faded fashion.
        </P>
        <P>
          Disabled elements are always styled in the Gray family no matter its base color. A
          component&apos;s specific styling will depend on the elements within it and what layers
          they are placed on. Some tokens have their own specific disabled tokens, such as{' '}
          <CodeSnippet type="inline">$layer-disabled</CodeSnippet>, while other elements are grouped
          together and share a disabled token like{' '}
          <CodeSnippet type="inline">$text-disabled</CodeSnippet>.
        </P>
        <UL>
          <LI>For the light themes, disabled color values range from White to Gray 50</LI>
          <LI>For the dark themes, disabled color values range from Gray 90 to Gray 40</LI>
        </UL>
        <H2>Accessibility</H2>
        <P>
          Using various forms of contrast is the most important consideration when making
          user–friendly color and interface choices. Awareness of standards and best practices is
          the key to accessible color selections.
        </P>
        <Grid condensed className="resource-card-group">
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="IBM Design Language: Accessibility"
              aspectRatio="2:1"
              href="https://www.ibm.com/design/language/color#accessibility"
            >
              <MdxIcon name="bee" />
            </ResourceCard>
          </Column>
          <Column colMd={4} colLg={4}>
            <ResourceCard
              subTitle="IBM Accessibility: Color and Contrast"
              aspectRatio="2:1"
              href="https://www.ibm.com/able/toolkit/design/visual/color-and-contrast"
            >
              <MdxIcon name="bee" />
            </ResourceCard>
          </Column>
        </Grid>
        <H3>Contrast ratios</H3>
        <P>
          Contrast is the difference in brightness between any two elements. The{' '}
          <Link href="https://www.w3.org/TR/WCAG21/">
            Web Content Acessibility Guidelines (WCAG)
          </Link>{' '}
          set specific ratios that achieve the minimum required contrast for legibility. Generally
          speaking, small text is any size below 24px and requires a 4.5:1 contrast ratio. Large
          text is anything above 24px and requires a 3:1 contrast ratio. Graphical elements, such as
          data visualizations, also require a 3:1 contrast ratio.
        </P>
        <P>
          The IBM palette is comprised of twelve color grades—Black, White and ten values for each
          hue. The following table indicates the minimum number of steps required to achieve
          commonly used contrast ratios between any two colors.
        </P>
        <Row>
          <Column colLg={8}>
            <ArtDirection>
              <Image
                alt="color grades – Mobile image"
                src="/elements/color/colorgrades_table_mobile.png"
              />
              <Image alt="color grades graphic" src="/elements/color/colorgrades_table.png" />
            </ArtDirection>
          </Column>
        </Row>
        <PageTable columns={3}>
          <thead>
            <tr>
              <th>Color 1</th>
              <th>Color 2 (4.5:1 contrast)</th>
              <th>Color 2 (3:1 contrast)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Black</td>
              <td>50 through White (6 steps)</td>
              <td>60 through White (5 steps)</td>
            </tr>
            <tr>
              <td>100</td>
              <td>50 through White (5 steps)</td>
              <td>60 through White (4 steps)</td>
            </tr>
            <tr>
              <td>90</td>
              <td>50 through White (4 steps)</td>
              <td>60 through White (3 steps)</td>
            </tr>
            <tr>
              <td>80</td>
              <td>40 through White (4 steps)</td>
              <td>50 through White (3 steps)</td>
            </tr>
            <tr>
              <td>70</td>
              <td>30 through White (4 steps)</td>
              <td>40 through White (3 steps)</td>
            </tr>
            <tr>
              <td>60</td>
              <td>20 through White (4 steps)</td>
              <td>20 through White (4 steps)</td>
            </tr>
            <tr>
              <td>50</td>
              <td>90 through Black (4 steps)</td>
              <td>80 through Black (3 steps)</td>
            </tr>
            <tr>
              <td>40</td>
              <td>80 through Black (4 steps)</td>
              <td>70 through Black (3 steps)</td>
            </tr>
            <tr>
              <td>30</td>
              <td>70 through Black (4 steps)</td>
              <td>70 through Black (4 steps)</td>
            </tr>
            <tr>
              <td>20</td>
              <td>70 through Black (5 steps)</td>
              <td>60 through Black (4 steps)</td>
            </tr>
            <tr>
              <td>10</td>
              <td>60 through Black (5 steps)</td>
              <td>50 through Black (4 steps)</td>
            </tr>
            <tr>
              <td>White</td>
              <td>60 through Black (6 steps)</td>
              <td>50 through Black (5 steps)</td>
            </tr>
          </tbody>
        </PageTable>
        <H2>Resources</H2>
        <Grid className="resource-card-group" condensed>
          <Column colLg={4} colMd={4}>
            <ResourceCard
              subTitle="RGB color palettes (.ase and .clr)"
              href="https://github.com/carbon-design-system/carbon/raw/v10/packages/colors/artifacts/IBM_Colors.zip"
            >
              <MdxIcon name="ase" />
            </ResourceCard>
          </Column>
          <Column colLg={4} colMd={4}>
            <ResourceCard
              subTitle="Elements package: Color"
              href="https://github.com/carbon-design-system/carbon/tree/v10/packages/colors"
            >
              <MdxIcon name="github" />
            </ResourceCard>
          </Column>
        </Grid>
      </ContentWrapper>
    </>
  )
}

export default Overview
