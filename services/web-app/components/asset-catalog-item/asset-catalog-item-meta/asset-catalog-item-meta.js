/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Scales } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import StatusIcon from '@/components/status-icon'
import { status } from '@/data/status'
import { assetPropTypes } from '@/types'
import { getAssetLicense } from '@/utils/schema'

import styles from './asset-catalog-item-meta.module.scss'

const AssetCatalogItemMeta = ({ asset, className, properties }) => {
  const renderStatus = () => {
    const { name } = status[asset?.statusKey]

    if (!name) return null

    return (
      <span className={styles.container}>
        <StatusIcon className={styles['meta-icon']} status={asset?.statusKey} />
        <span>{name}</span>
      </span>
    )
  }

  const renderLicense = () => {
    return (
      <span className={styles.container}>
        <Scales className={styles['meta-icon']} size={16} />
        <span>{getAssetLicense(asset)}</span>
      </span>
    )
  }

  return (
    <ul className={clsx(styles.meta, className)}>
      {properties.map((prop) => (
        <li className={styles['meta-item']} key={prop}>
          {prop === 'status' && renderStatus()}
          {prop === 'license' && renderLicense()}
        </li>
      ))}
    </ul>
  )
}

AssetCatalogItemMeta.propTypes = {
  asset: assetPropTypes,
  className: PropTypes.string,
  properties: PropTypes.array
}

export default AssetCatalogItemMeta
