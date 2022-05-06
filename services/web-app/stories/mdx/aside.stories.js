/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import Aside from '@/components/aside'

const stories = {
  title: 'MDX/Aside',
  component: Aside,
     argTypes: {
    children: {
      control: false
    },
    className: {
    control: false
    
    }
    }
}

export default stories

const Template = (args) => (
  <Grid>
    <Column lg={4}>
      <Aside aria-label="Example aside" {...args}>
        Lorem ipsum: dolor sit amet, elit. Curabitur ac odio arcu. Vestibulum egestas eleifend
        porttitor. Quisque malesuada pulvinar pellentesque. Nunc dictum odio eu enim venenatis
        fringilla. Nunc finibus enim dui, a tempus quam commodo vitae. Donec non eros gravida dolor
        porta suscipit non vel quam.
      </Aside>
    </Column>
  </Grid>
)

export const Default = Template.bind({})
Default.args = {}
