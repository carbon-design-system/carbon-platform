/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Carbon, IbmCloud, IbmSecurity, Watson } from '@carbon/react/icons'
import {
  Svg24CarbonForIbmDotcom,
  Svg24CarbonForIbmProducts,
  Svg64Carbon,
  Svg64CarbonForIbmDotcom,
  Svg64CarbonForIbmProducts,
  Svg64Cloud,
  Svg64Security,
  Svg64Watson
} from '@carbon-platform/icons'

/**
 * Teams are defined here for now, but in the future we will probably want these stored in our data-
 * base. Team keys are used in the libraries allowlist to specify sponsorship. Team slugs are
 * specified as object keys to ensure uniqueness.
 */
export const teams = {
  carbon: {
    icon: Carbon,
    name: 'Carbon',
    pictogram: Svg64Carbon
  },
  'ibm-dotcom': {
    icon: Svg24CarbonForIbmDotcom,
    name: 'IBM.com',
    pictogram: Svg64CarbonForIbmDotcom
  },
  'ibm-cloud': {
    icon: IbmCloud,
    name: 'IBM Cloud',
    pictogram: Svg64Cloud
  },
  'ibm-security': {
    icon: IbmSecurity,
    name: 'IBM Security',
    pictogram: Svg64Security
  },
  'ai-apps': {
    icon: Watson,
    name: 'IBM AI Apps',
    pictogram: Svg64Watson
  },
  watson: {
    icon: Watson,
    name: 'IBM Watson',
    pictogram: Svg64Watson
  },
  'ibm-products': {
    icon: Svg24CarbonForIbmProducts,
    name: 'IBM Products',
    pictogram: Svg64CarbonForIbmProducts
  }
}
