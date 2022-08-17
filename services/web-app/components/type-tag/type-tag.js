/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { gray } from '@carbon/colors'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { assetTypes } from '@/data/asset-types'

import styles from './type-tag.module.scss'

const TypeTag = ({ className, name, type }) => {
  const item = assetTypes[type]

  const tagName = item?.name ?? name
  const bgColor = item?.bgColor ?? gray[20]
  const textColor = item?.textColor ?? gray[70]

  console.log(name, item, tagName, bgColor, textColor)

  if (!tagName) return null

  return (
    <span
      className={clsx(styles.container, className)}
      style={{
        '--cds-background': bgColor,
        '--cds-text-primary': textColor
      }}
    >
      {tagName}
    </span>
  )
}

TypeTag.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(assetTypes))
}

export default TypeTag
