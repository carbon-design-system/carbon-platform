/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import IconLibrary from '@/components/svg-libraries/icon-library'

const stories = {
  title: 'Platform/Components/IconLibrary',
  component: IconLibrary,
  parameters: {
    viewMode: 'canvas'
  }
}

export default stories

const Template = (args) => <IconLibrary args={args} />

export const Default = Template.bind({})
