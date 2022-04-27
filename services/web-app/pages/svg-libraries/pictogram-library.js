/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable max-len */
import MdxWrapper from '@/components/mdx-wrapper'
import PictogramLibraryComponent from '@/components/svg-libraries/pictogram-library'

const frontmatter = {
  label:
    'Pictograms are visual symbols used to represent ideas, objects, or actions. They communicate messages at a glance, afford interactivity, and draw attention to important information.',
  title: 'Pictograms',
  description:
    'Pictograms are visual symbols used to represent ideas, objects, or actions. They communicate messages at a glance, afford interactivity, and draw attention to important information.',
  tabs: ['Library', 'Usage', 'Code', 'Contribute']
}

const PictogramLibrary = () => (
  <MdxWrapper frontmatter={JSON.stringify(frontmatter)}>
    <PictogramLibraryComponent />
  </MdxWrapper>
)

export default PictogramLibrary
