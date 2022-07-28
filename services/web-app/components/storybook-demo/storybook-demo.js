/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Dropdown, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useState } from 'react'

import * as styles from './storybook-demo.module.scss'

const StorybookDemo = ({ height, themeSelector, size, url, variants }) => {
  const columnSize = size === 'large' ? 12 : 8

  const demoClassNames = clsx(styles['storybook-demo'], styles[`${height}`], {
    [styles.large]: size === 'large'
  })

  const themeItems = [
    {
      id: 'white',
      label: 'White',
      src: 'white'
    },
    {
      id: 'g10',
      label: 'Gray 10',
      src: 'g10'
    },
    {
      id: 'g90',
      label: 'Gray 90',
      src: 'g90'
    },
    {
      id: 'g100',
      label: 'Gray 100',
      src: 'g100'
    }
  ]

  const [theme, setTheme] = useState('')
  const onThemeChange = (item) => {
    setTheme(item.selectedItem.src)
  }

  const initialSetVariant = variants[0].variant
  const initialSelectedVariant = variants[0].label
  const initialSelectedTheme = themeItems[0]

  const [variant, setVariant] = useState(initialSetVariant)

  const iframeUrl = url + '/iframe.html?id=' + variant + '&globals=theme:' + theme

  const onVariantChange = (item) => {
    setVariant(item.selectedItem.variant)
  }

  return (
    <>
      <Grid condensed>
        {themeSelector && (
          <Column sm={2} md={4}>
            <Dropdown
              titleText="Theme selector"
              label="theme"
              items={themeItems}
              onChange={onThemeChange}
              initialSelectedItem={initialSelectedTheme}
            />
          </Column>
        )}
        <Column sm={2} md={4}>
          <Dropdown
            titleText="Variant selector"
            label="variant"
            items={variants}
            initialSelectedItem={initialSelectedVariant}
            onChange={onVariantChange}
          />
        </Column>
      </Grid>
      <Grid condensed>
        <Column sm={4} md={columnSize} lg={columnSize} className={demoClassNames}>
          <iframe
            title="Component demo"
            className={styles.iframe}
            src={iframeUrl}
            frameBorder="no"
            allowtransparency="true"
            allowFullScreen="true"
          />
        </Column>
      </Grid>
    </>
  )
}

StorybookDemo.propTypes = {
  /**
   * Storybook demo height: default or tall
   */
  height: PropTypes.oneOf(['tall']),
  /**
   * Storybook demo size: small or large
   */
  size: PropTypes.oneOf(['small', 'large']),
  /**
   * Storybook demo display or hide theme selector
   */
  themeSelector: PropTypes.bool,
  /**
   * Storybook demo url to change themes and variants
   */
  url: PropTypes.string,
  /**
   * Storybook demo variants for the specified component
   */
  variants: PropTypes.object
}

export default StorybookDemo
