/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable max-len */
import MdxWrapper from '@/components/mdx-wrapper'
import IconLibrary from '@/components/svg-libraries/icon-library'

const frontmatter = {
  label:
    'Icons are visual symbols used to represent ideas, objects, or actions. They communicate messages at a glance, afford interactivity, and draw attention to important information.',
  title: 'Icons',
  description:
    'Icons are visual symbols used to represent ideas, objects, or actions. They communicate messages at a glance, afford interactivity, and draw attention to important information.',
  tabs: ['Library', 'Usage', 'Code', 'Contribute']
}

const PictogramPage = () => (
  <MdxWrapper frontmatter={JSON.stringify(frontmatter)}>
    <IconLibrary />
  </MdxWrapper>
)

export default PictogramPage
