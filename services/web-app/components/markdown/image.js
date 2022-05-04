/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import NextImage from 'next/image'
import PropTypes from 'prop-types'

import styles from './image.module.scss'

const getImageProps = (props) => {
  const { height, width, blurDataURL } = props.src

  if (!(height && width)) {
    props.className = styles.image
    props.layout = 'fill'
  }

  if (blurDataURL) {
    props.placeholder = 'blur'
    props.layout = 'responsive'
  }

  return props
}

const Image = ({ alt, ...props }) => {
  const imageProps = getImageProps(props)

  return (
    <Grid>
      <Column sm={4} md={8} lg={12}>
        <div className={clsx(imageProps.layout === 'fill' && styles['image-container'])}>
          <NextImage alt={alt} {...imageProps} />
        </div>
      </Column>
    </Grid>
  )
}

Image.propTypes = {
  alt: PropTypes.string
}

export default Image
