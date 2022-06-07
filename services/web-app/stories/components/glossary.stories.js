/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Glossary from '@/components/glossary'

const stories = {
  title: 'Platform/Components/Glossary',
  component: Glossary,
  parameters: {
    viewMode: 'canvas'
  }
}

export default stories

const Template = () => <Glossary />

export const Default = Template.bind({})
