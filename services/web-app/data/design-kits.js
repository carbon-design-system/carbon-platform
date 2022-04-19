/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Design kit groups are kits of various tools that contain the same set of assets. Each kit group
 * has a canonical tool which signifies that it is the source of truth and often gets updated before
 * the others in the group
 */

export const designKitGroups = {
  components: {
    canonicalTool: 'sketch',
    kits: [
      'carbon-white-sketch',
      'carbon-g10-sketch',
      'carbon-g90-sketch',
      'carbon-g100-sketch',
      'carbon-white-figma',
      'carbon-g10-figma',
      'carbon-g90-figma',
      'carbon-g100-figma',
      'carbon-white-adobe-xd',
      'carbon-g90-adobe-xd',
      'carbon-g100-adobe-xd',
      'carbon-g10-axure'
    ]
  },
  icons: {
    canonicalTool: 'sketch',
    kits: ['ibm-icons-16-20-sketch', 'ibm-icons-24-32-sketch', 'ibm-icons-adobe-xd']
  },
  mobile: {
    canonicalTool: 'sketch',
    kits: ['carbon-mobile-light-sketch', 'carbon-mobile-dark-sketch']
  }
}
