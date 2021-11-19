/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { breakpoints } from '@carbon/layout'
import { AspectRatio, Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import useMedia from 'use-media'

import { getSlug } from '@/utils/slug'

import thumbnail from '../../public/thumbnail.svg'
import styles from './catalog-item.module.scss'

const ItemImage = () => {
  return <Image alt="Thumbnail" src={thumbnail} layout="fill" objectFit="cover" />
}

const ItemContent = () => {
  return <div className={styles.content}>Content</div>
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

  const cnAnchor = clsx(styles.anchor, isGrid && styles.anchorGrid)

  const renderGrid = () => (
    <Column as="li" md={4}>
      <Link href={`/assets/${asset.params.library}/latest/${getSlug(asset.content)}`}>
        <a className={cnAnchor}>
          <AspectRatio ratio="3x2">
            <ItemImage />
          </AspectRatio>
          <AspectRatio ratio="16x9">
            <ItemContent />
          </AspectRatio>
        </a>
      </Link>
    </Column>
  )

  const renderList = () => (
    <Column as="li" sm={4} md={8} lg={12}>
      <Link href={`/assets/${asset.params.library}/latest/${getSlug(asset.content)}`}>
        <a className={cnAnchor}>
          <Grid condensed={isMobile} narrow={!isMobile}>
            <Column className={clsx(styles.column, styles.columnImage)} md={4}>
              <AspectRatio ratio={imageAspectRatio()}>
                <ItemImage />
              </AspectRatio>
            </Column>
            <Column className={clsx(styles.column, styles.columnContent)} sm={4} md={4} lg={8}>
              <ItemContent />
            </Column>
          </Grid>
        </a>
      </Link>
    </Column>
  )

  return isGrid ? renderGrid() : renderList()
}

export default CatalogItem
