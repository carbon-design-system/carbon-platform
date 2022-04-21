/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RouterContext } from 'next/dist/shared/lib/router-context'
import '../styles/styles.scss'
import * as NextImage from 'next/image'
import styles from './styles.module.scss'
import clsx from 'clsx'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => {
    const modifiedProps = { ...props, layout: 'fill' }

    delete modifiedProps.className
    delete modifiedProps.placeholder

    return (
      <div className={clsx(styles.imageContainer, props.className)}>
        <OriginalNextImage {...modifiedProps} className={styles.image} unoptimized />
      </div>
    )
  }
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    disable: true,
    grid: {
      disable: true
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  nextRouter: {
    Provider: RouterContext.Provider
  }
}
