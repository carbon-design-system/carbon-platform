/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Svg16AdobeAse,
  Svg16AdobeXd,
  Svg16Axure,
  Svg16Figma,
  Svg16InvisionFreehand,
  Svg16Sketch
} from '@carbon-platform/icons'

export const designTools = {
  figma: {
    name: 'Figma',
    icon: Svg16Figma,
    mdxIcon: 'figma'
  },
  sketch: {
    name: 'Sketch',
    icon: Svg16Sketch,
    mdxIcon: 'sketch'
  },
  'adobe-xd': {
    name: 'Adobe XD',
    icon: Svg16AdobeXd,
    mdxIcon: 'xd32'
  },
  axure: {
    name: 'Axure',
    icon: Svg16Axure,
    mdxIcon: 'axure'
  },
  'adobe-ase': {
    name: 'Adobe Ase',
    icon: Svg16AdobeAse,
    mdxIcon: 'zip'
  },
  'invision-freehand': {
    name: 'Invision Freehand',
    icon: Svg16InvisionFreehand,
    mdxIcon: 'invision'
  }
}
