/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { Link, P, PageDescription, PageTable, ResourceCard } from '@carbon-platform/mdx-components'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ContentWrapper from '@/components/content-wrapper/content-wrapper'
import H2 from '@/components/markdown/h2'
import H3 from '@/components/markdown/h3'
import MdxIcon from '@/components/mdx-icon/mdx-icon'
import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

const Releases = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Releases',
    description:
      'Learn about our latest updates, our release history, and what the team has planned for Carbon’s future.'
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
          Learn about our latest updates, our release history, and what the team has planned for
          Carbon’s future.
        </PageDescription>
        <H2>Resources</H2>
        <Grid condensed className="resource-card-group">
          <Column md={4} lg={4}>
            <ResourceCard
              subTitle="Changelog"
              href="https://github.com/carbon-design-system/carbon/releases"
            >
              <MdxIcon name="github" />
            </ResourceCard>
          </Column>
          <Column md={4} lg={4}>
            <ResourceCard
              subTitle="Roadmap"
              href="https://app.zenhub.com/workspaces/system-squad-593830641344b813db10934d/roadmap"
            >
              <MdxIcon name="zenhub" />
            </ResourceCard>
          </Column>
        </Grid>

        <H2>Releases</H2>

        <P>
          Each Carbon Design System release includes independently versioned package releases
          following the industry–standard <Link href="https://semver.org">semantic versioning</Link>{' '}
          specification. The team also ships minor package releases every other week and patch{''}
          {"releases between minor versions to address bugs when necessary. Read more in Carbon's "}
          <Link href="https://github.com/carbon-design-system/carbon/wiki/Release-radar">
            release radar
          </Link>
          .
        </P>

        <H3>Carbon v11</H3>

        <P>
          Carbon v11 focuses on quality of life updates for designers and developers including token
          and prop renaming for ease of use, component API updates for a more predictable developer
          experience, and introducing CSS grid for accurate layout building in line with the design
          language.
        </P>

        <P>
          With no changes to the IBM Design Language, v11 will not require any brand–driven product
          redesigns and teams are free to update at their convenience. For more details about this
          release, see our{' '}
          <Link href="http://www.carbondesignsystem.com/migrating/guide/overview/">
            v11 release page
          </Link>
          .
        </P>

        <H3>Carbon v10</H3>

        <P>
          Carbon v10 implemented our newly–updated brand expression (IBM Design Language v2) into
          our components. The updated components required product teams to redesign product UIs and
          begin a migration plan to comply with IBM brand experience standards. For more details
          about this release, see our{' '}
          <Link href="https://v10.carbondesignsystem.com/help/migration-guide/overview">
            v10 release page
          </Link>
          .
        </P>

        <H2>Release history</H2>

        <PageTable columns={5}>
          <thead>
            <tr>
              <th>Carbon Design System</th>
              <th>IBM Design Language</th>
              <th>Carbon Elements</th>
              <th>Carbon Components</th>
              <th>Carbon React</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link href="https://www.carbondesignsystem.com">Carbon v11</Link>
                <br />
                — 31 Mar 2022
                <br />
                — Improves token and prop naming
                <br />
                — Adds light/dark mode support
                <br />— Uses CSS grid
              </td>
              <td>
                <Link href="https://www.ibm.com/design/language">IDL v2</Link>
              </td>
              <td>v11.x</td>
              <td>v11.x</td>
              <td>v8.x</td>
            </tr>
            <tr>
              <td>
                <Link href="https://v10.carbondesignsystem.com">Carbon v10</Link>
                <br />
                — 29 Mar 2019
                <br />
                — Updates assets to IDL v2
                <br />
                — Updates grid to 16 columns
                <br />— Adds Carbon Elements package
              </td>
              <td>
                <Link href="https://www.ibm.com/design/language">IDL v2</Link>
              </td>
              <td>
                <Link href="https://www.npmjs.com/package/@carbon/elements/v/latest">v10.x</Link>
              </td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components/v/latest">v10.x</Link>
              </td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components-react/v/latest">
                  v7.x
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://v9.carbondesignsystem.com">Carbon v9</Link>
                <br />— 4 June 2018
              </td>
              <td>IDL v1</td>
              <td>—</td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components/v/9.x">v9.x</Link>
              </td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components-react/v/6.x">v6.x</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://v8.carbondesignsystem.com">Carbon v8</Link>
                <br />— 26 Oct 2017
              </td>
              <td>IDL v1</td>
              <td>—</td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components/v/8.23.1">v8.23.1</Link>
              </td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components-react/v/5.x">v5.x</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://v7.carbondesignsystem.com">Carbon v7</Link>
                <br />— 30 Mar 2017
              </td>
              <td>IDL v1</td>
              <td>—</td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components/v/7.26.10">
                  v7.26.10
                </Link>
              </td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components-react/v/4.2.2">
                  v4.2.2
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="https://v6.carbondesignsystem.com">Carbon v6</Link>
              </td>
              <td>IDL v1</td>
              <td>—</td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components/v/6.20.1">v6.20.1</Link>
              </td>
              <td>
                <Link href="https://www.npmjs.com/package/carbon-components-react/v/3.14.0">
                  v3.14.0
                </Link>
              </td>
            </tr>
          </tbody>
        </PageTable>
      </ContentWrapper>
    </>
  )
}

export default Releases
