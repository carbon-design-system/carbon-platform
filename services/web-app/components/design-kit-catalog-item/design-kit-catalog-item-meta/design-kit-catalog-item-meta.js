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
import { designKitPropTypes } from '@/types'
import { getDesignKitLicense } from '@/utils/schema'

import styles from './design-kit-catalog-item-meta.module.scss'

const DesignKitCatalogItemMeta = ({ designKit, className, properties }) => {
  const renderStatus = () => {
    const { name } = status[designKit?.statusKey]

    if (!name) return null

    return (
      <span className={styles.container}>
        <StatusIcon className={styles['meta-icon']} status={designKit?.statusKey} />
        <span>{name}</span>
      </span>
    )
  }

  const renderLicense = () => {
    return (
      designKit.license && (
        <span className={styles.container}>
          <Scales className={styles['meta-icon']} size={16} />
          <span>{getDesignKitLicense(designKit)}</span>
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

DesignKitCatalogItemMeta.propTypes = {
  /**
   * Optional container classname.
   */
  className: PropTypes.string,
  /**
   * Design kit being passed in.
   */
  designKit: designKitPropTypes,
  /**
   * Design kit properties / information.
   */
  properties: PropTypes.array
}

export default DesignKitCatalogItemMeta
