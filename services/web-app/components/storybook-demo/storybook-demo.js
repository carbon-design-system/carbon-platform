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

const StorybookDemo = ({ tall, themeSelector, wide, url, variants }) => {
  const columnWidth = wide ? 12 : 8

  const demoClassNames = clsx(styles['storybook-demo'], {
    [styles.tall]: tall,
    [styles.wide]: wide
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

  const variantsDefined = (typeof variants !== 'undefined') && variants.length > 1

  // TODO: need to update this initialStateVarint --> need a default variant
  const initialSetVariant = variantsDefined ? variants[1].variant : 'components-button--default'

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
              initialSelectedItem={themeItems[0]}
            />
          </Column>
        )}
        {variantsDefined && <Column sm={2} md={4}>
          <Dropdown
            titleText="Variant selector"
            label="variant"
            items={variants}
            initialSelectedItem={variants[1].label}
            onChange={onVariantChange}
          />
        </Column>}
      </Grid>
      <Grid condensed>
        <Column sm={4} md={8} lg={columnWidth} className={demoClassNames}>
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
   * Storybook demo height
   */
  tall: PropTypes.bool,
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
  variants: PropTypes.object,
  /**
   * Storybook demo width
   */
  wide: PropTypes.bool
}

export default StorybookDemo
