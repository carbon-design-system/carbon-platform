/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AspectRatio, Column, Grid } from '@carbon/react'
import { Events } from '@carbon/react/icons'
import clsx from 'clsx'
import { get } from 'lodash'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { assetPropTypes } from 'types'

import FrameworkIcon from '@/components/framework-icon'
import TypeTag from '@/components/type-tag'
import { teams } from '@/data/teams'
import { collapseAssetGroups, getBaseIdentifier } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './asset-catalog-item.module.scss'
import AssetCatalogItemMeta from './asset-catalog-item-meta'

const AssetCatalogItemImage = ({ asset }) => {
  const [src, setSrc] = useState(`/assets/thumbnails/${getSlug(asset.content)}.svg`)

  return (
    // The Next.js Image component isn't firing the onError callback for some reason, so for now,
    // use the unoptimized img element since we're just using SVGs for now. We'll eventually want
    // to use the Image component for placeholders.
    // eslint-disable-next-line @next/next/no-img-element -- See previous line for rationale.
    <img
      alt={`${asset.content.name} thumbnail`}
      src={src}
      className={styles.image}
      onError={() => setSrc('/assets/thumbnails/coming-soon.svg')}
    />
  )
}

AssetCatalogItemImage.propTypes = {
  asset: assetPropTypes
}

const AssetCatalogItemContent = ({ asset, groupedAssets, filter = {}, isGrid = false }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  const { name, description } = asset.content
  const { sponsor } = asset.params

  const sponsorTitle = teams[sponsor]
    ? `Sponsored by ${teams[sponsor].name}`
    : 'Community maintained'

  const SponsorIcon = teams[sponsor] ? teams[sponsor].icon : Events

  const isSeparatedMeta = !isLg || isGrid

  const otherFrameworkCount = () => {
    const baseIdentifier = getBaseIdentifier(asset)

    return collapseAssetGroups(asset, filter) ? get(groupedAssets, baseIdentifier, 0) - 1 : 0
  }

  return (
    <Grid className={styles.content}>
      <Column sm={4} md={4} lg={7} xlg={6}>
        {asset.library.content.name && (
          <p className={styles.library}>{asset.library.content.name}</p>
        )}
        {name && <p className={styles.name}>{name}</p>}
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.icon} title={sponsorTitle}>
          <SponsorIcon className={styles['icon-sponsor']} size={24} />
        </div>
        {isSeparatedMeta && (
          <>
            <AssetCatalogItemMeta asset={asset} properties={['license']} />
            <AssetCatalogItemMeta
              asset={asset}
              className={styles['meta--absolute']}
              properties={['status']}
            />
          </>
        )}
        {!isSeparatedMeta && (
          <AssetCatalogItemMeta
            asset={asset}
            className={styles['meta--absolute']}
            properties={['status', 'license']}
          />
        )}
        <div className={styles.tags}>
          <TypeTag className={styles['tags-item']} type={asset.content.type} />
          <FrameworkIcon
            className={styles.framework}
            framework={asset.content.framework}
            otherCount={otherFrameworkCount()}
          />
        </div>
      </Column>
    </Grid>
  )
}

AssetCatalogItemContent.propTypes = {
  asset: assetPropTypes,
  filter: PropTypes.object,
  groupedAssets: PropTypes.object,
  isGrid: PropTypes.bool
}

const AssetCatalogItem = ({ asset, assetCounts, filter, isGrid = false }) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isXlg = useMatchMedia(mediaQueries.xlg)

  const imageAspectRatio = () => {
    if (isXlg) return '16x9'
    if (isLg) return '3x2'
    return '4x3'
  }

  const anchorStyles = clsx(styles.anchor, {
    [styles['anchor--grid']]: isGrid
  })

  const anchorHref = `/assets/${asset.params.library}/latest/${getSlug(asset.content)}`

  const renderGrid = () => (
    <Column as="li" md={4}>
      <Link href={anchorHref}>
        <a className={anchorStyles}>
          <AspectRatio ratio="3x2">
            <AssetCatalogItemImage asset={asset} />
          </AspectRatio>
          <AspectRatio ratio="16x9">
            <AssetCatalogItemImage
              asset={asset}
              assetCounts={assetCounts}
              filter={filter}
              isGrid={isGrid}
            />
          </AspectRatio>
        </a>
      </Link>
    </Column>
  )

  const renderList = () => (
    <Column as="li" sm={4} md={8} lg={12}>
      <Link href={anchorHref}>
        <a className={anchorStyles}>
          <Grid narrow>
            <Column className={clsx(styles.column, styles['column--image'])} md={4}>
              <AspectRatio ratio={imageAspectRatio()}>
                <AssetCatalogItemImage asset={asset} />
              </AspectRatio>
            </Column>
            <Column className={clsx(styles.column, styles['column--content'])} sm={4} md={4} lg={8}>
              {!isMd && (
                <AspectRatio ratio="3x2">
                  <AssetCatalogItemContent
                    asset={asset}
                    assetCounts={assetCounts}
                    filter={filter}
                    isGrid={isGrid}
                  />
                </AspectRatio>
              )}
              {isMd && (
                <AssetCatalogItemContent
                  asset={asset}
                  assetCounts={assetCounts}
                  filter={filter}
                  isGrid={isGrid}
                />
              )}
            </Column>
          </Grid>
        </a>
      </Link>
    </Column>
  )

  return isGrid ? renderGrid() : renderList()
}

AssetCatalogItem.propTypes = {
  asset: assetPropTypes,
  assetCounts: PropTypes.object,
  filter: PropTypes.object,
  isGrid: PropTypes.bool
}

export default AssetCatalogItem
