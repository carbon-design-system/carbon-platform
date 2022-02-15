/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Svg16Angular,
  Svg16Javascript,
  Svg16React,
  Svg16Svelte,
  Svg16Vue,
  Svg16WebComponent
} from '@carbon-platform/icons'

export const framework = {
  angular: {
    icon: Svg16Angular,
    name: 'Angular'
  },
  'design-only': {
    name: 'Design only'
  },
  react: {
    icon: Svg16React,
    name: 'React'
  },
  'react-native': {
    icon: Svg16React,
    name: 'React Native'
  },
  svelte: {
    icon: Svg16Svelte,
    name: 'Svelte'
  },
  vanilla: {
    icon: Svg16Javascript,
    name: 'Vanilla JavaScript'
  },
  vue: {
    icon: Svg16Vue,
    name: 'Vue'
  },
  'web-component': {
    icon: Svg16WebComponent,
    name: 'Web Component'
  }
}
