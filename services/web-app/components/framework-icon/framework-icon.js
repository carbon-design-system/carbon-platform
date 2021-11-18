/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Svg24Angular, Svg24React, Svg24Vanilla, Svg24Vue } from '@carbon-platform/icons'

// TODO we need all frameworks as defined in the schema, and a fallback for when no framework is
// specified
const frameworkMap = {
  angular: Svg24Angular,
  react: Svg24React,
  vanilla: Svg24Vanilla,
  vue: Svg24Vue
}

const FrameworkIcon = ({ framework }) => {
  const Icon = frameworkMap[framework]

  if (!Icon) return null

  return <Icon />
}

export default FrameworkIcon
