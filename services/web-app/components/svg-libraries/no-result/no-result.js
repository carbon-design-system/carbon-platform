/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import React from 'react'

import { Column, Row } from '@/components/grid-transform'
import { h2, paragraph } from '@/components/markdown/markdown.module.scss'
import ResourceCard from '@/components/resource-card'

import { Github, Illustrator } from '../icons'
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
    <div className={styles.noResult}>
      {allIconResults
        ? (
        <>
          <span className={styles.searchLabel}>
            {`0 results found in the "${selectedCategory}" category.`}
          </span>
          <h2 className={h2}>
            {allIconResults} matches found in{' '}
            <button
              type="button"
              onClick={() => setSelectedCategory(`All ${type}`)}
              className={clsx(styles.allSvgs, 'cds--link')}
            >
              all {type}.
            </button>
          </h2>
        </>
          )
        : (
        <>
          <h2 className={h2}>No result found</h2>
          <p className={paragraph}>
            It appears we don’t have an icon that matches your search. Try different search terms or
            give us a hand—submit your own design to the library!
          </p>
          <Row className="resource-card-group">
            <Column colMd={4} colLg={4} noGutterSm>
              <ResourceCard
                subTitle={`Submit ${designType} design`}
                href="https://github.ibm.com/brand/pictograms/issues/new"
              >
                <Github />
              </ResourceCard>
            </Column>
            <Column colMd={4} colLg={4} noGutterSm>
              <ResourceCard
                actionIcon="download"
                href={pageUrl}
                subTitle={`Download the ${pageName} master`}
              >
                <Illustrator />
              </ResourceCard>
            </Column>
          </Row>
        </>
          )}
    </div>
  )
}

export default NoResult
