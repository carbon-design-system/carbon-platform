/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Bee, Carbon, IbmCloud, Watson } from '@carbon/react/icons'

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
    icon: Bee,
    name: 'IBM.com'
  },
  'ibm-cloud': {
    icon: IbmCloud,
    name: 'IBM Cloud'
  },
  sterling: {
    icon: Bee,
    name: 'IBM Sterling'
  },
  watson: {
    icon: Watson,
    name: 'IBM Watson'
  }
}
