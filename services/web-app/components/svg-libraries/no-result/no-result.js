/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { LogoGithub } from '@carbon/react/icons'
import { Svg32Illustrator } from '@carbon-platform/icons'
import { H2, P } from '@carbon-platform/mdx-components'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import ResourceCard from '@/components/resource-card'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from '../svg-library.module.scss'

const NoResult = ({
  allIconResults,
  setSelectedCategory,
  selectedCategory,
  type = 'icons',
  pageName,
  pageUrl
}) => {
  const designType = pageName === 'icon' ? 'an icon' : 'a pictogram'
  const isSm = useMatchMedia(mediaQueries.sm)
  return (
    <div className={styles['no-result']}>
      {allIconResults > 0 && (
        <>
          <span className={styles['search-label']}>
            {`0 results found in the "${selectedCategory}" category.`}
          </span>
          <H2>
            {allIconResults} matches found in{' '}
            <button
              type="button"
              onClick={() => setSelectedCategory(`All ${type}`)}
              className={clsx(styles['all-svgs'], 'cds--link')}
            >
              all {type}.
            </button>
          </H2>
        </>
      )}
      {!allIconResults && (
        <>
          <H2>No result found</H2>
          <P>
            It appears we don’t have an icon that matches your search. Try different search terms or
            give us a hand—submit your own design to the library!
          </P>
          <Grid className="resource-card-group" condensed={isSm}>
            <Column sm={4} md={4} lg={4}>
              <ResourceCard
                subTitle={`Submit ${designType} design`}
                href="https://github.ibm.com/brand/pictograms/issues/new"
              >
                <LogoGithub size={32} className={styles.icon} />
              </ResourceCard>
            </Column>
            <Column sm={4} md={4} lg={4}>
              <ResourceCard
                actionIcon="download"
                href={pageUrl}
                subTitle={`Download the ${pageName} master`}
              >
                <Svg32Illustrator />
              </ResourceCard>
            </Column>
          </Grid>
        </>
      )}
    </div>
  )
}

NoResult.defaultProps = {
  type: 'icons'
}

NoResult.propTypes = {
  allIconResults: PropTypes.number,
  pageName: PropTypes.string,
  pageUrl: PropTypes.string,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
  type: PropTypes.string
}

export default NoResult
