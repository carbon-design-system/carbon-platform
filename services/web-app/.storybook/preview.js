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
import { breakpoints } from '@carbon/layout'
import { Theme } from '@carbon/react'

const OriginalNextImage = NextImage.default

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

    return (
      <Theme theme={theme}>
        <div
          style={{
            background: 'var(--cds-background)',
            padding: layout === 'fullscreen' ? '1px' : '1rem',
            margin: '-1px'
          }}
        >
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