/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Scales } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import StatusIcon from '@/components/status-icon'
import { status } from '@/data/status'

import styles from './catalog-item-meta.module.scss'

const CatalogItemMeta = ({ className, properties, license, statusKey }) => {
  const renderStatus = () => {
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
      license && (
        <span className={styles.container}>
          <Scales className={styles['meta-icon']} size={16} />
          <span>{license}</span>
        </span>
      )
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

CatalogItemMeta.propTypes = {
  /**
   * Optional container classname.
   */
  className: PropTypes.string,
  /**
   * Element license being passed in.
   */
  license: PropTypes.string,
  /**
   * Element properties.
   */
  properties: PropTypes.array,
  /**
   * Element status key.
   */
  statusKey: PropTypes.array
}

export default ElementCatalogItemMeta
