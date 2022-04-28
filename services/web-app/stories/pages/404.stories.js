/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FourOhFour from '@/pages/404.js'

import { pageConfig, PageLayout } from '../../.storybook/layout'

const stories = {
  title: 'Platform/Pages/404',
  component: FourOhFour,
  ...pageConfig
}

export default stories

const Template = (args) => (
  <PageLayout args={args}>
    <FourOhFour />
  </PageLayout>
)

export const Default = Template.bind({})
Default.args = {}
