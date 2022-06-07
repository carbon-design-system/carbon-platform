/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PictogramLibrary from '@/components/svg-libraries/pictogram-library'

const stories = {
  title: 'Platform/Components/PictogramLibrary',
  component: PictogramLibrary,
  parameters: {
    viewMode: 'canvas'
  }
}

export default stories

const Template = (args) => <PictogramLibrary {...args} />

export const Default = Template.bind({})
