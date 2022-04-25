/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Layout, { LayoutProvider } from '@/layouts/layout'
import FourOhFour from '@/pages/404.js'

const stories = {
  title: 'Pages/404',
  component: FourOhFour,
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': { hidden: true }
    },
    viewMode: 'canvas'
  }
}

export default stories

const Template = (args) => (
  <LayoutProvider {...args}>
    <Layout>
      <FourOhFour />
    </Layout>
  </LayoutProvider>
)

export const Default = Template.bind({})
Default.args = {}
