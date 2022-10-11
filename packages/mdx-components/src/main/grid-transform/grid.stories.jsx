/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '../../../dist/main/index'

export default {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    children: {
      control: false
    },
    className: {
      control: false
    }
  }
}

const Template = () => (
  <Grid>
    <Column lg={4}>Span 4 of 16</Column>
    <Column lg={4}>Span 4 of 16</Column>
    <Column lg={4}>Span 4 of 16</Column>
    <Column lg={4}>Span 4 of 16</Column>
  </Grid>
)

export const Default = Template.bind({})
Default.args = {}
