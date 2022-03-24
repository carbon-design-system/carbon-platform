/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AspectRatio, Column, Grid } from '@carbon/react'
import { ArrowUpRight, Events, Scales } from '@carbon/react/icons'
import clsx from 'clsx'
import { get } from 'lodash'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { assetPropTypes } from 'types'

import FrameworkIcon from '@/components/framework-icon'
import StatusIcon from '@/components/status-icon'
import TypeTag from '@/components/type-tag'
import { status } from '@/data/status'
import { teams } from '@/data/teams'
import { collapseAssetGroups, getBaseIdentifier, getLicense } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-item.module.scss'

const CatalogItemImage = ({ asset }) => {
  const [src, setSrc] = useState(`/assets/thumbnails/${getSlug(asset.content)}.svg`)

  return (
    // The Next.js Image component isn't firing the onError callback for some reason, so for now,
    // use the unoptimized img element since we're just using SVGs for now. We'll eventually want
    // to use the Image component for placeholders.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={`${asset.content.name} thumbnail`}
      src={src}
      className={styles.image}
      onError={() => setSrc('/assets/thumbnails/coming-soon.svg')}
    />
  )
}

CatalogItemImage.propTypes = {
  asset: assetPropTypes
}

const CatalogItemContent = ({
  asset,
  assetCounts,
  filter = {},
  isGrid = false,
  isType = false
}) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  const { name, description, externalDocsUrl } = asset.content
  const { sponsor } = asset.params

  const sponsorTitle = teams[sponsor]
    ? `Sponsored by ${teams[sponsor].name}`
    : 'Community maintained'

  const SponsorIcon = teams[sponsor] ? teams[sponsor].icon : Events

  const isSeparatedMeta = !isLg || isGrid

  const otherFrameworkCount = () => {
    const baseIdentifier = getBaseIdentifier(asset)

    return collapseAssetGroups(asset, filter) ? get(assetCounts, baseIdentifier, 0) - 1 : 0
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
          {SponsorIcon && <SponsorIcon className={styles.iconSponsor} size={24} />}
          {externalDocsUrl && <ArrowUpRight className={styles.iconExternal} size={24} />}
        </div>
        {isSeparatedMeta && (
          <>
            <CatalogItemMeta asset={asset} className={styles.metaInline} properties={['license']} />
            <CatalogItemMeta
              asset={asset}
              className={styles.metaAbsolute}
              properties={['status']}
            />
          </>
        )}
        {!isSeparatedMeta && (
          <CatalogItemMeta
            asset={asset}
            className={styles.metaAbsolute}
            properties={['status', 'license']}
          />
        )}
        <div className={styles.tags}>
          {!isType && <TypeTag className={styles.tagsItem} type={asset.content.type} />}
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

CatalogItemContent.propTypes = {
  asset: assetPropTypes,
  isGrid: PropTypes.bool,
  isType: PropTypes.bool
}

const CatalogItemMeta = ({ asset, className, properties }) => {
  const renderStatus = () => {
    const statusKey = asset?.content.status?.key ?? asset?.content.status ?? 'draft'
    const { name } = status[statusKey]

    if (!name) return null

    return (
      <>
        <StatusIcon className={styles.metaIcon} status={statusKey} />
        <span>{name}</span>
      </>
    )
  }

  const renderLicense = () => {
    return (
      <>
        <Scales className={styles.metaIcon} size={16} />
        <span>{getLicense(asset)}</span>
      </>
    )
  }

  return (
    <ul className={clsx(styles.meta, className)}>
      {properties.map((prop, i) => (
        <li className={styles.metaItem} key={i}>
          {prop === 'status' && renderStatus()}
          {prop === 'license' && renderLicense()}
        </li>
      ))}
    </ul>
  )
}

CatalogItemMeta.propTypes = {
  asset: assetPropTypes,
  className: PropTypes.string,
  properties: PropTypes.array
}

const CatalogItem = ({ asset, assetCounts, filter, isGrid = false, isType = false }) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isXlg = useMatchMedia(mediaQueries.xlg)

  const imageAspectRatio = () => {
    if (isXlg) return '16x9'
    if (isLg) return '3x2'
    return '4x3'
  }

  const anchorStyles = clsx(styles.anchor, {
    [styles.anchorGrid]: isGrid,
    [styles.anchorExternal]: asset.content.externalDocsUrl
  })

  const anchorHref =
    asset.content.externalDocsUrl ||
    `/assets/${asset.params.library}/latest/${getSlug(asset.content)}`

  const anchorProps = asset.content.externalDocsUrl
    ? {
        rel: 'noreferrer',
        target: '_blank'
      }
    : {}

  const renderGrid = () => (
    <Column as="li" md={4}>
      <Link href={anchorHref}>
        <a className={anchorStyles} {...anchorProps}>
          <AspectRatio ratio="3x2">
            <CatalogItemImage asset={asset} />
          </AspectRatio>
          <AspectRatio ratio="16x9">
            <CatalogItemContent
              asset={asset}
              assetCounts={assetCounts}
              filter={filter}
              isGrid={isGrid}
              isType={isType}
            />
          </AspectRatio>
        </a>
      </Link>
    </Column>
  )

  const renderList = () => (
    <Column as="li" sm={4} md={8} lg={12}>
      <Link href={anchorHref}>
        <a className={anchorStyles} {...anchorProps}>
          <Grid narrow>
            <Column className={clsx(styles.column, styles.columnImage)} md={4}>
              <AspectRatio ratio={imageAspectRatio()}>
                <CatalogItemImage asset={asset} />
              </AspectRatio>
            </Column>
            <Column className={clsx(styles.column, styles.columnContent)} sm={4} md={4} lg={8}>
              {!isMd && (
                <AspectRatio ratio="3x2">
                  <CatalogItemContent
                    asset={asset}
                    assetCounts={assetCounts}
                    filter={filter}
                    isGrid={isGrid}
                    isType={isType}
                  />
                </AspectRatio>
              )}
              {isMd && (
                <CatalogItemContent
                  asset={asset}
                  assetCounts={assetCounts}
                  filter={filter}
                  isGrid={isGrid}
                  isType={isType}
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

CatalogItem.propTypes = {
  asset: assetPropTypes,
  assetCounts: PropTypes.object,
  filter: PropTypes.object,
  isGrid: PropTypes.bool,
  isType: PropTypes.bool
}

export default CatalogItem
