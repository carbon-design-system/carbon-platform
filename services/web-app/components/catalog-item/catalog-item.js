/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { breakpoints } from '@carbon/layout'
import { AspectRatio, Column, Grid } from '@carbon/react'
import { ArrowUpRight } from '@carbon/react/icons'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useMedia from 'use-media'

import FrameworkIcon from '@/components/framework-icon'
import { teams } from '@/data/teams'
import { getSlug } from '@/utils/slug'

import styles from './catalog-item.module.scss'

const ItemImage = ({ asset }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  return (
    <>
      {showPlaceholder && (
        <Image
          alt={`${asset.content.name} placeholder`}
          src="/assets/thumbnails/coming-soon.svg"
          layout="fill"
          objectFit="cover"
        />
      )}
      <Image
        alt={`${asset.content.name} thumbnail`}
        src={`/assets/thumbnails/${getSlug(asset.content)}.svg`}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => {
          setShowPlaceholder(false)
        }}
      />
    </>
  )
}

const ItemContent = ({ asset }) => {
  const { name, description, externalDocsUrl } = asset.content
  const { sponsor } = asset.params

  const { name: sponsorName, icon: SponsorIcon } = teams[sponsor]

  return (
    <div className={styles.content}>
      {sponsorName && <p className={styles.sponsor}>{sponsorName}</p>}
      {name && <p className={styles.name}>{name}</p>}
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.icon}>
        {SponsorIcon && <SponsorIcon className={styles.iconSponsor} size={24} />}
        {externalDocsUrl && <ArrowUpRight className={styles.iconExternal} size={24} />}
      </div>
      <FrameworkIcon className={styles.framework} framework={asset.content.framework} />
    </div>
  )
}

const CatalogItem = ({ asset, isGrid = false }) => {
  const isMobile = useMedia({ maxWidth: breakpoints.md.width })
  const isLg = useMedia({ minWidth: breakpoints.lg.width })
  const isXlg = useMedia({ minWidth: breakpoints.xlg.width })

  const imageAspectRatio = () => {
    if (isXlg) return '16x9'
    if (isLg) return '3x2'
    return '4x3'
  }

  const anchorStyles = clsx(styles.anchor, {
    [styles.anchorGrid]: isGrid,
    [styles.anchorExternal]: asset.content.externalDocsUrl,
    [styles.anchorSponsor]: asset.params.sponsor
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
            <ItemImage asset={asset} />
          </AspectRatio>
          <AspectRatio ratio="16x9">
            <ItemContent asset={asset} />
          </AspectRatio>
        </a>
      </Link>
    </Column>
  )

  const renderList = () => (
    <Column as="li" sm={4} md={8} lg={12}>
      <Link href={anchorHref}>
        <a className={anchorStyles} {...anchorProps}>
          <Grid condensed={isMobile} narrow={!isMobile}>
            <Column className={clsx(styles.column, styles.columnImage)} md={4}>
              <AspectRatio ratio={imageAspectRatio()}>
                <ItemImage asset={asset} />
              </AspectRatio>
            </Column>
            <Column className={clsx(styles.column, styles.columnContent)} sm={4} md={4} lg={8}>
              {isMobile && (
                <AspectRatio ratio="3x2">
                  <ItemContent asset={asset} />
                </AspectRatio>
              )}
              {!isMobile && <ItemContent asset={asset} />}
            </Column>
          </Grid>
        </a>
      </Link>
    </Column>
  )

  return isGrid ? renderGrid() : renderList()
}

export default CatalogItem
