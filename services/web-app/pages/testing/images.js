/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import Image from 'next/image'

import { getPlaceholderImages } from '@/lib/image'

import styles from './images.module.scss'
import testImg from './test.png'

const Page = ({ imageData }) => {
  const getImageProps = (imagePath) => {
    const imageProps = imageData.find((image) => image.src === imagePath) ?? {
      className: styles.image,
      layout: 'fill',
      src: imagePath
    }

    if (imageProps.blurDataURL) {
      imageProps.placeholder = 'blur'
      imageProps.layout = 'responsive'
    }

    return imageProps
  }

  return (
    <Grid className={styles.grid}>
      <Column sm={4} lg={6}>
        <h2>1 Static import (optimized, blur)</h2>
        <Image alt="Static import" src={testImg} placeholder="blur" />
      </Column>
      <Column sm={4} lg={6}>
        <h2>2 Public directory (plaiceholder&apos;ed)</h2>
        <Image alt="Public directory" {...getImageProps('/pages/testing/test.png')} />
      </Column>
      <Column sm={4} lg={6}>
        <h2>3 Absolute path (plaiceholder&apos;ed)</h2>
        <Image
          alt="Public directory"
          {...getImageProps(
            'https://github.com/carbon-design-system/carbon-platform/raw/main/services/web-app/pages/assets/index/images/react-banner.png'
          )}
        />
      </Column>
      <Column sm={4} lg={6}>
        <h2>4 Public directory (unoptimized, no blur)</h2>
        <div className={styles.imageContainer}>
          <Image
            alt="Public directory"
            className={styles.image}
            layout="fill"
            src="/pages/testing/test.png"
          />
        </div>
      </Column>
      <Column sm={4} lg={6}>
        <h2>5 Absolute path (unoptimized, no blur)</h2>
        <div className={styles.imageContainer}>
          <Image
            alt="Absolute path"
            className={styles.image}
            layout="fill"
            src="https://github.com/carbon-design-system/carbon-platform/raw/main/services/web-app/pages/assets/index/images/react-banner.png"
          />
        </div>
      </Column>
      <Column sm={4} lg={6}>
        <h2>6 Spacer</h2>
      </Column>
      <Column sm={4} lg={6}>
        <h2>7 Content</h2>
      </Column>
      <Column sm={4} lg={6}>
        <h2>8 Content</h2>
      </Column>
    </Grid>
  )
}

export const getStaticProps = async () => {
  // somehow get every relative path before we render this page. no idea how to do this, unless we
  // read this file in node.js and search the page's React return JSX.
  const relativeImgPaths = ['/pages/testing/test.png']

  // somehow get every absolute path before we render this page. this should be easier, as we can
  // search the MDX content that we just fetched
  const absoluteImgPaths = [
    'https://github.com/carbon-design-system/carbon-platform/raw/main/services/web-app/pages/assets/index/images/react-banner.png'
  ]

  const allImagePaths = [...relativeImgPaths, ...absoluteImgPaths]

  const imageData = await getPlaceholderImages(allImagePaths)

  return {
    props: {
      imageData
    }
  }
}

export default Page
