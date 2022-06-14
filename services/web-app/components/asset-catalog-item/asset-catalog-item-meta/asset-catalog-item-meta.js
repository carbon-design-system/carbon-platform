/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Scales } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { assetPropTypes } from 'types'

import StatusIcon from '@/components/status-icon'
import { status } from '@/data/status'
import { getLicense } from '@/utils/schema'

import styles from './asset-catalog-item-meta.module.scss'

const AssetCatalogItemMeta = ({ asset, className, properties }) => {
  const renderStatus = () => {
    const statusKey = asset?.content.status?.key ?? asset?.content.status ?? 'draft'
    const { name } = status[statusKey]

    if (!name) return null

    return (
      <span className={styles.container}>
        <StatusIcon className={styles['meta-icon']} status={statusKey} />
        <span>{name}</span>
      </span>
    )
  }

  const renderLicense = () => {
    return (
      <span className={styles.container}>
        <Scales className={styles['meta-icon']} size={16} />
        <span>{getLicense(asset)}</span>
      </span>
    )
  }

  return (
    <ul className={clsx(styles.meta, className)}>
      {properties.map((prop, i) => (
        <li className={styles['meta-item']} key={i}>
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
