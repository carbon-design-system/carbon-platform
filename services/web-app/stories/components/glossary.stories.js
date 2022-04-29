/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Glossary from '@/components/glossary'
import { Column, Grid } from '@/components/grid-transform'

const stories = {
  title: 'Platform/Components/Glossary',
  component: Glossary
}

export default stories

const Template = (args) => (
  <Grid>
    <Column lg={7}>
      <Glossary {...args} />
    </Column>
  </Grid>
)

export const Default = Template.bind({})
