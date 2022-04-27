/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogoGithub32 } from '@carbon/icons-react'
import { Svg32Illustrator } from '@carbon-platform/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { Column, Row } from '@/components/grid-transform'
import markdownStyles from '@/components/markdown/markdown.module.scss'
import ResourceCard from '@/components/resource-card'

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
  return (
    <div className={styles['no-result']}>
      {allIconResults > 0 && (
        <>
          <span className={styles['search-label']}>
            {`0 results found in the "${selectedCategory}" category.`}
          </span>
          <h2 className={markdownStyles.h2}>
            {allIconResults} matches found in{' '}
            <button
              type="button"
              onClick={() => setSelectedCategory(`All ${type}`)}
              className={clsx(styles['all-svgs'], 'cds--link')}
            >
              all {type}.
            </button>
          </h2>
        </>
      )}
      {!allIconResults && (
        <>
          <h2 className={markdownStyles.h2}>No result found</h2>
          <p className={markdownStyles.paragraph}>
            It appears we don’t have an icon that matches your search. Try different search terms or
            give us a hand—submit your own design to the library!
          </p>
          <Row className="resource-card-group">
            <Column colMd={4} colLg={4} noGutterSm>
              <ResourceCard
                subTitle={`Submit ${designType} design`}
                href="https://github.ibm.com/brand/pictograms/issues/new"
              >
                <LogoGithub32 className={styles.icon} />
              </ResourceCard>
            </Column>
            <Column colMd={4} colLg={4} noGutterSm>
              <ResourceCard
                actionIcon="download"
                href={pageUrl}
                subTitle={`Download the ${pageName} master`}
              >
                <Svg32Illustrator />
              </ResourceCard>
            </Column>
          </Row>
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