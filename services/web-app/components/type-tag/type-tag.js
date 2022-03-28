/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'
import PropTypes from 'prop-types'

import { type as typeMap } from '@/data/type'

import styles from './type-tag.module.scss'

const TypeTag = ({ className, type }) => {
  const item = typeMap[type]

  if (!item) return null

  const { name, bgColor, textColor } = item

  if (!name || !bgColor || !textColor) return null

  return (
    <span
      className={clsx(styles.container, className)}
      style={{ '--cds-background': bgColor, '--cds-text-primary': textColor }}
    >
      {name}
    </span>
  )
}

TypeTag.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(typeMap))
}

export default TypeTag
