/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../styles/styles.scss'

import { breakpoints } from '@carbon/layout'
import { Theme } from '@carbon/react'
import clsx from 'clsx'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'

import styles from './styles.module.scss'

const OriginalNextImage = NextImage.default

// eslint-disable-next-line no-import-assign -- Forcefully disable Next image optimization
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => {
    const modifiedProps = { ...props, layout: 'fill' }

    delete modifiedProps.className
    delete modifiedProps.placeholder

    return (
      <div className={clsx(styles['image-container'], props.className)}>
        <OriginalNextImage {...modifiedProps} className={styles.image} unoptimized />
      </div>
    )
  }
})

export const decorators = [
  (Story, context) => {
    const { layout, theme } = context.globals

    // padded layout, set background and internal padding because storybook is configured fullscreen
    const style = {
      background: 'var(--cds-background)',
      padding: '1rem'
    }

    // fullscreen layout, margin collapse for compoents with top margins
    if (layout === 'fullscreen') {
      style.margin = '-1px'
      style.padding = '1px'
    }

    return (
      <Theme theme={theme}>
        <div style={style}>
          <Story {...context} />
        </div>
      </Theme>
    )
  }
]

export const globalTypes = {
  layout: {
    name: 'Layout',
    description: 'Set global layout.',
    defaultValue: 'padded',
    toolbar: {
      icon: 'grid',
      items: ['fullscreen', 'padded']
    }
  },
  theme: {
    name: 'Theme',
    description: 'Set the global theme for displaying components.',
    defaultValue: 'white',
    toolbar: {
      icon: 'paintbrush',
      items: ['white', 'g10', 'g90', 'g100']
    }
  }
}

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
  docs: {
    source: {
      state: 'open'
    }
  },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider
  },
  viewMode: 'docs',
  viewport: {
    viewports: {
      sm: {
        name: 'Small',
        styles: {
          width: breakpoints.sm.width,
          height: '100%'
        }
      },
      md: {
        name: 'Medium',
        styles: {
          width: breakpoints.md.width,
          height: '100%'
        }
      },
      lg: {
        name: 'Large',
        styles: {
          width: breakpoints.lg.width,
          height: '100%'
        }
      },
      xlg: {
        name: 'X-Large',
        styles: {
          width: breakpoints.xlg.width,
          height: '100%'
        }
      },
      max: {
        name: 'Max',
        styles: {
          width: breakpoints.max.width,
          height: '100%'
        }
      }
    }
  }
}
