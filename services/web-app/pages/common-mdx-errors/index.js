/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import { AnchorLink, AnchorLinks, CodeSnippet } from '@carbon-platform/mdx-components'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import H2 from '@/components/markdown/h2'
import H3 from '@/components/markdown/h3'
import { UL } from '@/components/markdown/index'
import LI from '@/components/markdown/li'
import P from '@/components/markdown/p'
import MdxNotification from '@/components/mdx-notification'
import FullPageError from '@/components/mdx-page/errors/full-page-error/full-page-error'
import PageDescription from '@/components/page-description/page-description'
import PageHeader from '@/components/page-header/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import styles from './index.module.scss'

const CommonMdxErrors = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Common Mdx Errors'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} />
      <div className={styles.content}>
        <PageDescription>
          {' '}
          Find solutions to common MDX errors found in migrated MDX pages
        </PageDescription>
        <AnchorLinks>
          <AnchorLink>Import statement found</AnchorLink>
          <AnchorLink>Export statement found</AnchorLink>
          <AnchorLink>Component not recognized</AnchorLink>
          <AnchorLink>Error Compiling MDX</AnchorLink>
          <AnchorLink>Component not rendering</AnchorLink>
          <AnchorLink>{"The page you're looking for cannot be found"}</AnchorLink>
          <AnchorLink>Contact</AnchorLink>
        </AnchorLinks>
        <H2>Import statement found</H2>
        <P>
          For security reasons import stamenets are not allowed in remotely loaded MDX files. Remove
          all imports from the affected MDX files.
        </P>
        <H3>Error Example</H3>
        <div className={styles['error-container']}>
          <FullPageError
            title="Something's gone wrong"
            subtitle="Import statement found"
            link="See common errors for more information"
            href="/common-mdx-errors#import-statement-found"
          >
            <p style={{ marginBottom: '20px' }}>
              For security reasons, import statements are not allowed and should be removed.
            </p>
            <span>Line 34: </span>
            <CodeSnippet type="inline">{"import {hey} from '../hey.js"}</CodeSnippet>
          </FullPageError>
        </div>

        <H2>Export statement found</H2>
        <P>
          For security reasons export stamenets are not allowed in remotely loaded MDX files. Please
          revise your MDX content, remove all exports and try again.
          <H3>Error Example</H3>
        </P>
        <div className={styles['error-container']}>
          <FullPageError
            title="Something's gone wrong"
            subtitle="Export statement found"
            link="See common errors for more information"
            href="/common-mdx-errors#export-statement-found"
          >
            <p style={{ marginBottom: '20px' }}>
              For security reasons, export statements are not allowed and should be removed.
            </p>
            <span>Line 34: </span>

            <CodeSnippet type="inline">{'export const a = 5'}</CodeSnippet>
          </FullPageError>
        </div>

        <H2>Component not recognized</H2>
        <P>
          {"You will see this message when we identify there is a component being used that we don't " +
            "currently support; Revise your MDX content to make sure you don't have a typo in the " +
            'component name and please visit our '}
          <Link href="https://platform.carbondesignsystem.com">component list</Link>
          {' to view an updated list of our supported components.'}
        </P>
        <H3>Error Example</H3>
        <Grid narrow>
          <Column sm={4} md={6} lg={8}>
            <MdxNotification
              title="UnknownComponent not recognized"
              description="This component is not supported or there is a typo. Please update to a supported component or review any mistakes.
      It is referenced in your code at \`13:1-13:23\`"
              link="Supported components"
              href="https://platform.carbondesignsystem.com"
            />
          </Column>
        </Grid>

        <H2>Error Compiling MDX </H2>
        <P>
          {'This type of error indicate there was a problem trying to parse the ' +
            'supplied MDX content, likely due to syntax error; these can range from a variety of reasons ' +
            'relating to MDX files themselves, not the context of the application. Vist ' +
            (
              <Link
                href={
                  'https://mdxjs.com/docs/troubleshooting-mdx/#could-not-parse-importexports-with-acorn-error'
                }
              >
                {"MDXjs.com's troubleshooting page"}
              </Link>
            ) +
            'for a comprehensive list of common MDX parsing errors'}
        </P>
        <H3>Error Example</H3>
        <Grid>
          <Column sm={4} md={6} lg={8}>
            <MdxNotification
              title="[next-mdx-remote] error compiling MDX:"
              description="Expected a closing tag for `<div>` (13:1-13:6) before the end of `paragraph`"
            />
          </Column>
        </Grid>
        <H2>Component not rendering</H2>
        <P>
          You will see this type of error when the MDX content was succesfully parsed but a runtime
          error occured which prevented the content from rendering. Some instances of when this type
          of error can occur are:
        </P>
        <UL>
          <LI>
            Inline styles
            <div>
              Inline styles in the form of string:{' '}
              <CodeSnippet type="inline">{'style="padding-top: 20px; color: red"'}</CodeSnippet>{' '}
              instead of javascript objects:
              <CodeSnippet type="inline">
                {"style={{ paddingTop: '20px', color: 'red' }}"}
              </CodeSnippet>{' '}
              will result in a Component not rendering error.
            </div>
          </LI>
          <LI>
            Components with missing or incorrect props
            <div>
              {'If a component is being used incorrectly or some ' +
                'required props are omitted, the content may be unable to render and display this type of error ' +
                'as well; please refer to the ' +
                <Link href="https://platform.carbondesignsystem.com">component list</Link> +
                ' to view an updated list of our supported ' +
                'components and how to use them correctly.'}
            </div>
          </LI>
        </UL>
        <H3>Error Example</H3>
        <Grid>
          <Column sm={4} md={6} lg={8}>
            <MdxNotification
              title="Component not rendering"
              description="Verify component usage documentation to make sure you're supplying all necessary information in the correct format"
              link="Get support"
              href="https://platform.carbondesignsystem.com"
            />
          </Column>
        </Grid>
        <H2>{"The page you're looking for cannot be found"}</H2>
        <P>
          {'This error occurs when the registered route ' +
            'either does not exist or has been incorrectly configured. Valid MDX routes are: '}
        </P>
        <UL>
          <LI>
            Absolute URLs
            <div>
              {
                "'https://github.com/[some-organization]/[some-repository]/blob/[ref]/[path-to-file].[extension]?raw=true'"
              }
            </div>
          </LI>
          <LI>
            Relative URLs
            <div>{"./relative/path/to/file.mdx', '../../../relative/path/to/file.mdx'"}</div>
            <div>
              {"*These will be relative from the carbon.yml file they're defined in, see "}
              <Link href="/contributing/schema">schema</Link>
              {' for further details. Note that a relative file can not go so ' +
                "far back (../../../...) that it goes out of it's defined github repository or org."}
            </div>
          </LI>
        </UL>
        <H3>Error Example</H3>
        <div className={styles['error-container']}>
          <FullPageError
            title="The page you are looking for cannot be found."
            subtitle="Supplied Github route does not exist. Update to a valid route."
            link="See common errors for further information on valid urls"
            href="/common-mdx-errors#the-page-you're-looking-for-cannot-be-found"
          >
            <CodeSnippet type="inline">{'./anything.mdx'}</CodeSnippet>
          </FullPageError>
        </div>
        <H2>Contact</H2>
        <P>
          If you cannot find a solution to your MDX error, need to report bugs, or leave feedback,
          open a{' '}
          <Link href={'https://github.com/carbon-design-system/carbon-platform/issues/new/choose'}>
            Github Issue
          </Link>
        </P>
      </div>
    </>
  )
}

export default CommonMdxErrors
