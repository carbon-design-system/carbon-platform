/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Image from 'next/image'

import { DoDont, DoDontRow } from '@/components/do-dont'

const stories = {
  title: 'MDX/DoDont',
  component: DoDontRow,
  subcomponents: { DoDont }
}

export default stories

const Template = (args) => (
  <DoDontRow>
    <DoDont
      aspectRatio="1:1"
      text="DoDont example"
      captionTitle="Caption title"
      caption="This is a caption."
      {...args}
    ></DoDont>
    <DoDont aspectRatio="1:1" type="dont" {...args}>
      <Image
        alt="Use markdown in mdx files. ![](/mdx/dodont.png)"
        src="mdx/light-theme.jpg"
        layout="fill"
      />
    </DoDont>
  </DoDontRow>
)

export const Default = Template.bind({})
Default.args = {}
