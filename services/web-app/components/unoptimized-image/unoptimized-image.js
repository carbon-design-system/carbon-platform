/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Image from 'next/image'
import PropTypes from 'prop-types'

import styles from './unoptimized-image.module.scss'

const UnoptimizedImage = ({ alt, ...props }) => (
  <div className={styles.imageContainer}>
    <Image layout="fill" className={styles.image} alt={alt} {...props} />
  </div>
)

UnoptimizedImage.propTypes = {
  alt: PropTypes.string
}

export default UnoptimizedImage
