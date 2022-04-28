/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Layout, { LayoutProvider } from '@/layouts/layout'

export const pageConfig = {
  decorators: [
    (Story, context) => {
      const { layout } = context.globals

      // offset the global decorator to effectively ignore the custom layout (never have a padded
      // storybook preview for full Next.js pages)
      const style = {
        margin: layout === 'padded' ? '-1rem' : 0
      }

      return (
        <div style={style}>
          <Story {...context} />
        </div>
      )
    }
  ],
  parameters: {
    options: { showPanel: false },
    previewTabs: {
      'storybook/docs/panel': { hidden: true }
    },
    viewMode: 'canvas'
  }
}

export const PageLayout = ({ args, children }) => (
  <LayoutProvider {...args}>
    <Layout>{children}</Layout>
  </LayoutProvider>
)
