/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Dropdown, Grid, Link } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Caption from '@/components/caption'

import * as styles from './storybook-demo.module.scss'

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

/**
 * The `<StorybookDemo>` component displays an iframe embed for the storybook story
 * for a component. It has the option to show different variants and themes. It also has a
 * `wide` prop to span the full width, and `tall` for larger components. If you would like
 * to use the theme selector, please use the Carbon React Storybook url,
 * https://react.carbondesignsystem.com/?path=/story/components-button--default&globals=theme:g10
 *  as an example. The `themeSelctor` appends `&globals=theme:g10` to the url.
 */
const StorybookDemo = ({ tall, themeSelector, wide, url, variants }) => {
  const columnWidth = wide ? 12 : 8

  const demoClassNames = clsx(styles['storybook-demo'], {
    [styles.tall]: tall,
    [styles.wide]: wide
  })

  const [theme, setTheme] = useState(themeItems[0].src)
  const onThemeChange = (item) => {
    setTheme(item.selectedItem.src)
  }

  const multipleVariants = variants?.length > 1

  const variantsDefined = typeof variants !== 'undefined' && variants.length > 0

  const initialSetVariant = variantsDefined && variants[0].variant

  const [variant, setVariant] = useState(initialSetVariant)

  const onVariantChange = (item) => {
    setVariant(item.selectedItem.variant)
  }

  const iframeUrl = url + '/iframe.html?id=' + variant + '&globals=theme:' + theme

  // Only add border when theme and variant selectors are being displayed
  const border = clsx({
    [styles['theme-selector']]: multipleVariants
  })

  return (
    <>
      <Grid condensed>
        {themeSelector && (
          <Column sm={2} md={4}>
            <Dropdown
              id="theme-selector"
              titleText="Theme selector"
              label="theme"
              items={themeItems}
              onChange={onThemeChange}
              initialSelectedItem={themeItems[0]}
              className={border}
            />
          </Column>
        )}
        {variantsDefined && multipleVariants && (
          <Column sm={2} md={4}>
            <Dropdown
              id="variant-selector"
              titleText="Variant selector"
              label="variant"
              items={variants}
              initialSelectedItem={variants[0]?.label}
              onChange={onVariantChange}
            />
          </Column>
        )}
      </Grid>
      <Grid condensed>
        <Column sm={4} md={8} lg={columnWidth} className={demoClassNames}>
          <iframe
            title="Component demo"
            className={styles.iframe}
            src={iframeUrl}
            frameBorder="no"
            sandbox="allow-forms allow-scripts allow-same-origin"
          />
        </Column>
      </Grid>
      <Grid>
        <Column sm={4} md={7}>
          <Caption>
            This live demo contains only a preview of functionality and styles available for this
            component. View the{' '}
            <Link href={`${url}/?path=/story/${variant}&globals=theme:${theme}`}>full demo</Link> on
            Storybook for additional information such as its version, controls, and API
            documentation.
          </Caption>
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
  url: PropTypes.string.isRequired,
  /**
   * Storybook demo variants for the specified component
   */
  variants: PropTypes.object.isRequired,
  /**
   * Storybook demo width
   */
  wide: PropTypes.bool
}

export default StorybookDemo
