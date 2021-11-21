/*
 * Copyright IBM Corp. 2021, 2021
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
import clsx from 'clsx'

import styles from './framework-icon.module.scss'

const frameworkMap = {
  angular: Svg16Angular,
  react: Svg16React,
  'react-native': Svg16React,
  svelte: Svg16Svelte,
  vanilla: Svg16Javascript,
  vue: Svg16Vue,
  'web-component': Svg16WebComponent
}

const FrameworkIcon = ({ className, framework }) => {
  const Icon = frameworkMap[framework]

  if (!Icon) return null

  return (
    <div className={clsx(styles.container, className)}>
      <Icon className={styles.icon} />
    </div>
  )
}

export default FrameworkIcon
