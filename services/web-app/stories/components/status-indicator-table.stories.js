/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import StatusIndicatorTable from '@/components/status-indicator-table'

const stories = {
  title: 'Platform/Components/StatusIndicatorTable',
  component: StatusIndicatorTable,
  argTypes: {
    attention: {
      options: ['high', 'medium', 'low', 'glyph']
    }
  }
}

export default stories

const Template = (args) => <StatusIndicatorTable {...args} />

export const Default = Template.bind({})
Default.args = {
  attention: 'high'
}
