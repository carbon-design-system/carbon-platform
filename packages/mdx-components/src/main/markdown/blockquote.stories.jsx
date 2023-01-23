/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Blockquote, P } from '../../../dist/main/index'

export default {
  title: 'Components/Markdown/Blockquote',
  component: Blockquote
}

const Template = (args) => (
  <Blockquote {...args}>
    <P>
      Without aesthetic, design is either the humdrum repetition of familiar clichés or a wild
      scramble for novelty. Without aesthetic, the computer is but a mindless speed machine,
      producing effects without substance, form without relevant content, or content without
      meaningful form.
    </P>
    <cite>– Paul Rand</cite>
  </Blockquote>
)

export const Default = Template.bind({})
Default.args = {}
