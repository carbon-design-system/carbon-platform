/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Carbon, IbmCloud, IbmSecurity, Watson } from '@carbon/react/icons'
import { Svg32CarbonForIbmDotcom, Svg32CarbonForIbmProducts } from '@carbon-platform/icons'

/**
 * Teams are defined here for now, but in the future we will probably want these stored in our data-
 * base. Team keys are used in the libraries allowlist to specify sponsorship. Team slugs are
 * specified as object keys to ensure uniqueness.
 */
export const teams = {
  carbon: {
    icon: Carbon,
    name: 'Carbon'
  },
  'ibm-dotcom': {
    icon: Svg32CarbonForIbmDotcom,
    name: 'IBM.com'
  },
  'ibm-cloud': {
    icon: IbmCloud,
    name: 'IBM Cloud'
  },
  'ibm-security': {
    icon: IbmSecurity,
    name: 'IBM Security'
  },
  'ai-apps': {
    icon: Watson,
    name: 'IBM AI Apps'
  },
  watson: {
    icon: Watson,
    name: 'IBM Watson'
  },
  'ibm-products': {
    icon: Svg32CarbonForIbmProducts,
    name: 'IBM Products'
  }
}
