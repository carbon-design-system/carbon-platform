/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AspectRatio, Column, Grid } from '@carbon/react'
import { Events, Scales } from '@carbon/react/icons'
import { get, isEmpty } from 'lodash'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import { libraryPropTypes } from 'types'

import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { teams } from '@/data/teams'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'
import { getLicense, librarySortComparator } from '@/utils/schema'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './index.module.scss'

const LibrariesList = ({ libraries = [] }) => {
  if (isEmpty(libraries)) return null

  return (
    <ul className={styles.list}>
      {libraries.map((library, i) => (
        <LibrariesItem key={i} library={library} />
      ))}
    </ul>
  )
}

const LibrariesItem = ({ library = {} }) => {
  const isMd = useMatchMedia(mediaQueries.md)

  if (isEmpty(library)) return null

  const { name, description } = library.content
  const { maintainer } = library.params
  const maintainerName = get(teams, `${maintainer}.name`)

  const maintainerTitle = teams[maintainer]
    ? `Maintained by ${teams[maintainer].name}`
    : 'Community maintained'

  const MaintainerIcon = teams[maintainer] ? teams[maintainer].icon : Events

  const renderContent = () => (
    <Grid className={styles.grid}>
      <Column sm={4} md={8}>
        <div className={styles.content}>
          {maintainerName && <p className={styles.maintainer}>{maintainerName}</p>}
          {name && <p className={styles.name}>{name}</p>}
          {description && <p className={styles.description}>{description}</p>}
          <ul className={styles.meta}>
            <li className={styles['meta-item']}>
              <Scales className={styles['meta-icon']} size={16} />
              <span>{getLicense(library)}</span>
            </li>
          </ul>
          <div className={styles.icon} title={maintainerTitle}>
            {MaintainerIcon && <MaintainerIcon className={styles['icon-maintainer']} size={24} />}
          </div>
        </div>
      </Column>
    </Grid>
  )

  return (
    <li className={styles.item}>
      <Link href={`/libraries/${library.params.library}`}>
        <a className={styles.anchor}>
          {isMd && <div>{renderContent()}</div>}
          {!isMd && <AspectRatio ratio="3x2">{renderContent()}</AspectRatio>}
        </a>
      </Link>
    </li>
  )
}

const Libraries = ({ librariesData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Libraries'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  const libraries = librariesData.libraries
    .filter((library) => !library.content.noIndex)
    .sort(librarySortComparator)

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} />
      <LibrariesList libraries={libraries} />
    </>
  )
}

Libraries.propTypes = {
  librariesData: PropTypes.shape({
    libraries: PropTypes.arrayOf(libraryPropTypes)
  })
}

export const getStaticProps = async () => {
  const librariesData = await getAllLibraries()

  return {
    props: {
      librariesData
    }
  }
}

export default Libraries
