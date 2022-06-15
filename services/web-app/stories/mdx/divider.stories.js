/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Image from 'next/image'

import Divider from '@/components/divider'

const stories = {
  title: 'MDX/Divider',
  component: Divider
}

export default stories

const Template = (args) => (
  <>
    <Divider {...args}>
      <div>Left Side Column</div>
      <div>
        Right Side Column:
        <p>
          ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat ex massa, in tincidunt
          ipsum tempor in. Maecenas ultrices sem nec blandit dictum. Fermentum ullamcorper pretium.
          Duis turpis elit.
        </p>
      </div>
    </Divider>
    <Divider {...args}>
      <div>Left Side Column</div>
      <div>
        Right Side Column:
        <p>
          ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat ex massa, in tincidunt
          ipsum tempor in. Maecenas ultrices sem nec blandit dictum. Fermentum ullamcorper pretium.
          Duis turpis elit.
        </p>
        <Image src="mdx/Article_06.png" alt="" />
      </div>
    </Divider>
  </>
)

export const Default = Template.bind({})
Default.args = {}
