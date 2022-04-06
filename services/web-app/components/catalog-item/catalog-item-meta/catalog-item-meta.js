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

import styles from './catalog-item-meta.module.scss'

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

export default CatalogItemMeta
