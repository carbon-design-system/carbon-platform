/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Advocate, Bee as BeePictogram } from '@carbon/pictograms-react'
import {
  AccessibilityAlt,
  Bee as BeeIcon,
  Carbon,
  CarbonForIbmDotcom,
  CarbonForIbmProduct,
  Events,
  IbmCloud,
  IbmSecurity,
  Watson
} from '@carbon/react/icons'
import {
  Svg64Carbon,
  Svg64CarbonForIbmDotcom,
  Svg64CarbonForIbmProducts,
  Svg64Cloud,
  Svg64Community,
  Svg64Security,
  Svg64Watson
} from '@carbon-platform/icons'

/**
 * Teams are defined here for now, but in the future we will probably want these stored in our data-
 * base. Team keys are used in the libraries allowlist to specify maintainership. Team slugs are
 * specified as object keys to ensure uniqueness.
 */
export const teams = {
  carbon: {
    icon: Carbon,
    name: 'Carbon',
    pictogram: Svg64Carbon
  },
  community: {
    icon: Events,
    name: 'Community',
    pictogram: Svg64Community
  },
  'ibm-dotcom': {
    icon: CarbonForIbmDotcom,
    name: 'IBM.com',
    pictogram: Svg64CarbonForIbmDotcom
  },
  'ibm-accessibility': {
    icon: AccessibilityAlt,
    name: 'IBM Accessibility',
    pictogram: Advocate // This is just a placeholder pictogram for now
  },
  'ai-apps': {
    icon: Watson,
    name: 'IBM AI Apps',
    pictogram: Svg64Watson
  },
  'ibm-brand': {
    icon: BeeIcon,
    name: 'IBM Brand',
    pictogram: BeePictogram
  },
  'ibm-cloud': {
    icon: IbmCloud,
    name: 'IBM Cloud',
    pictogram: Svg64Cloud
  },
  'ibm-products': {
    icon: CarbonForIbmProduct,
    name: 'IBM Products',
    pictogram: Svg64CarbonForIbmProducts
  },
  'ibm-security': {
    icon: IbmSecurity,
    name: 'IBM Security',
    pictogram: Svg64Security
  },
  watson: {
    icon: Watson,
    name: 'IBM Watson',
    pictogram: Svg64Watson
  }
}
