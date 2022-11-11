/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { P } from '../../../dist/main/index'

const stories = {
  title: 'Components/Markdown/P',
  component: P
}

export default stories

const Template = (args) => (
  <P {...args}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat ex massa, in tincidunt
    ipsum tempor in. Maecenas ultrices sem nec blandit dictum. Fermentum ullamcorper pretium. Duis
    turpis elit.
  </P>
)

export const Default = Template.bind({})
Default.args = {}
