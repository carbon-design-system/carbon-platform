/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AspectRatio, Column, Grid } from '@carbon/react'
import { Events, Scales } from '@carbon/react/icons'
import clsx from 'clsx'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import { teams } from '@/data/teams'
import { libraryPropTypes } from '@/types'
import { getAssetLicense } from '@/utils/schema'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './library-catalog-item.module.scss'

const LibraryCatalogItem = ({ library = {}, index }) => {
  const isMd = useMatchMedia(mediaQueries.md)

  if (isEmpty(library)) return null

  const { name, description } = library.content
  const { maintainer } = library.params
  const maintainerName = teams[maintainer]?.name

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
              <span>{getAssetLicense(library)}</span>
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
    <Column as="li" sm={4} md={8} lg={12}>
      <a
        className={clsx(styles.anchor, {
          [styles['no-border']]: index === 0
        })}
        href={`/libraries/${library.params.library}`}
      >
        {isMd && <div>{renderContent()}</div>}
        {!isMd && <AspectRatio ratio="3x2">{renderContent()}</AspectRatio>}
      </a>
    </Column>
  )
}

export default LibraryCatalogItem

LibraryCatalogItem.defaultPropTypes = {
  library: {}
}

LibraryCatalogItem.propTypes = {
  /**
   * Index of item in list
   */
  index: PropTypes.number,
  /**
   * Library item to render.
   */
  library: libraryPropTypes.isRequired
}
