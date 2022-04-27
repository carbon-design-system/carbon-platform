/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import PictogramLibrary from '@/components/svg-libraries/pictogram-library'

const stories = {
  title: 'Platform/Components/PictogramLibrary',
  component: PictogramLibrary
}

export default stories

const Template = (args) => <PictogramLibrary {...args} />

export const Default = Template.bind({})
