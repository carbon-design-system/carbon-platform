/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'
import NextImage from 'next/image'
import PropTypes from 'prop-types'

import { isAbsoluteUrl } from '@/utils/string'

import styles from './image.module.scss'

const getImageProps = (props) => {
  const { height, width, blurDataURL, src } = props.src

  if (!(height && width)) {
    props.className = styles.image
    props.layout = 'fill'
  }

  if (blurDataURL) {
    props.placeholder = 'blur'
    props.layout = 'responsive'
  }

  // do not optimize if is svg file (absolute or relative)
  const url = isAbsoluteUrl(src) ? new URL(src).pathname.split('/').pop().endsWith('.svg') : null
  if (src.endsWith('.svg') || !!url) {
    props.unoptimized = true
  }

  return props
}

const Image = ({ alt, ...props }) => {
  const { height, width, blurDataURL, src } = props
  // when dynamically set, src properties come spread out and we have to manually construct object
  const imageProps = getImageProps({
    src: typeof src === 'string' ? { height, width, blurDataURL, src } : src
  })

  return (
    <div className={clsx(imageProps.layout === 'fill' && styles['image-container'])}>
      <NextImage alt={alt} {...imageProps} />
    </div>
  )
}

Image.propTypes = {
  alt: PropTypes.string,
  blurDataURL: PropTypes.string,
  height: PropTypes.number,
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      blurDataURL: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
      src: PropTypes.string
    })
  ]),
  width: PropTypes.number
}

export default Image
