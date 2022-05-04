/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'

// `node_modules` import is necessary to not create a cyclically resolving alias
import Image from '../../../node_modules/next/image'
import styles from './next-image.module.scss'

const NextImage = (props) => {
  const modifiedProps = { ...props, layout: 'fill' }

  delete modifiedProps.className
  delete modifiedProps.placeholder

  return (
    <div className={clsx(styles['image-container'], props.className)}>
      <Image {...modifiedProps} className={styles.image} unoptimized />
    </div>
  )
}

export default NextImage
