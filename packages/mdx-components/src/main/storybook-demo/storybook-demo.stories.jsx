/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StorybookDemo, Variant } from '../../../dist/main/index'

export default {
  title: 'Components/StorybookDemo',
  component: StorybookDemo
}

const Template = (args) => (
  <StorybookDemo
    {...args}
    themeSelector={true}
    wide
    tall
    url="https://react.carbondesignsystem.com"
  >
    <Variant label="Button" variant="components-button--default" />
    <Variant label="Secondary" variant="components-button--secondary" />
    <Variant label="Tertiary" variant="components-button--tertiary" />
    <Variant label="Ghost" variant="components-button--ghost" />
    <Variant label="Danger" variant="components-button--danger" />
    <Variant label="Icon button" variant="components-button--icon-button" />
    <Variant label="Set of buttons" variant="components-button--set-of-buttons" />
    <Variant label="Skeleton" variant="components-button--skeleton" />
  </StorybookDemo>
)

export const Default = Template.bind({})
Default.args = {}
