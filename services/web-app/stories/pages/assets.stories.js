/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Layout, { LayoutProvider } from '@/layouts/layout'
import Assets from '@/pages/assets/index.js'

const stories = {
  title: 'Pages/Assets',
  component: Assets,
  parameters: {
    layout: 'fullscreen'
  }
}

export default stories

const Template = (args) => (
  <LayoutProvider {...args}>
    <Layout>
      <Assets />
    </Layout>
  </LayoutProvider>
)

export const Default = Template.bind({})
Default.args = {}
