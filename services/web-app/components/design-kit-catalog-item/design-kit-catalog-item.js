/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Tag } from '@carbon/react'
import { ArrowUpRight, Events } from '@carbon/react/icons'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

import { designKitTypes } from '@/data/design-kit-types'
import { teams } from '@/data/teams'
import { designKitPropTypes } from '@/types'
import { getDesignKitLicense } from '@/utils/schema'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import CatalogItemMeta from '../catalog-item-meta'
import DesignKitIcon from '../design-kit-icon/design-kit-icon'
import styles from './design-kit-catalog-item.module.scss'

const DesignKitCatalogItem = ({ designKit }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  const { name, description } = designKit
  const { maintainer } = designKit

  const maintainerTitle = teams[maintainer]
    ? `Maintained by ${teams[maintainer].name}`
    : 'Community maintained'

  const MaintainerIcon = teams[maintainer] ? teams[maintainer].icon : Events

  const [onHover, setOnHover] = useState(false)

  const isSeparatedMeta = !isLg

  const type = designKit.type
  const anchorHref = designKit.url ?? designKit.url

  const iconRender = () => {
    if (onHover) {
      return <ArrowUpRight className={clsx(styles['icon-external'], 'icon-maintainer')} size={24} />
    } else {
      return <MaintainerIcon className={styles['icon-maintainer']} size={24} />
    }
  }

  return (
    <Column as="li" sm={4} md={8} lg={12}>
      <Link href={anchorHref}>
        <a
          className={styles.anchor}
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
        >
          <Grid narrow>
            <Column
              className={clsx(styles.column, styles['column--content'])}
              sm={4}
              md={8}
              lg={12}
            >
              <Grid className={styles.content}>
                <Column sm={4} md={4} lg={7} xlg={6}>
                  {designKit.name && <p className={styles.library}>{designKit.name}</p>}
                  {name && <p className={styles.name}>{name}</p>}
                  {description && <p className={styles.description}>{description}</p>}
                  <div className={styles.icon} title={maintainerTitle}>
                    {iconRender()}
                  </div>
                  {isSeparatedMeta && (
                    <>
                      <CatalogItemMeta
                        properties={['license']}
                        license={getDesignKitLicense(designKit)}
                        statusKey={designKit?.statusKey}
                      />
                      <CatalogItemMeta
                        element={designKit}
                        className={styles['meta--absolute']}
                        properties={['status']}
                        license={getDesignKitLicense(designKit)}
                        statusKey={designKit?.statusKey}
                      />
                    </>
                  )}
                  {!isSeparatedMeta && (
                    <CatalogItemMeta
                      element={designKit}
                      className={styles['meta--absolute']}
                      properties={['status', 'license']}
                      license={getDesignKitLicense(designKit)}
                      statusKey={designKit?.statusKey}
                    />
                  )}
                  <div className={styles.tags}>
                    <Tag className={styles['tags-item']} type={designKitTypes[type].tagType}>
                      {designKitTypes[type].name}
                    </Tag>
                    <DesignKitIcon designTool={designKit.tool} />
                  </div>
                </Column>
              </Grid>
            </Column>
          </Grid>
        </a>
      </Link>
    </Column>
  )
}

DesignKitCatalogItem.defaultProps = {
  designKit: designKitPropTypes.isRequired
}

DesignKitCatalogItem.propTypes = {
  /**
   * Design kit object to render visually
   */
  designKit: designKitPropTypes.isRequired
}

export default DesignKitCatalogItem
