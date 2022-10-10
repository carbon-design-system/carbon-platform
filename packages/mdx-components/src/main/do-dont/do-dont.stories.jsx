/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import Image from 'next/image'

import { DoDont, DoDontRow } from '../../../dist/main/index'
// import dodontimage from '../../res/light-theme.jpg'

export default {
  title: 'Components/DoDont',
  component: DoDontRow,
  subcomponents: { DoDont },
  argTypes: {
    children: {
      control: false
    },
    className: {
      control: false
    }
  }
}

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
      {/* <Image
        alt="Use markdown in mdx files. ![](dodont.png)"
        src="../../res/light-theme.jpg"
        layout="fill"
      /> */}
    </DoDont>
  </DoDontRow>
)

export const Default = Template.bind({})
Default.args = {}
