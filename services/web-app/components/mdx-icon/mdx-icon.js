/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Bee, LogoGithub } from '@carbon/icons-react'
import clsx from 'clsx'
import Image from 'next/image'
import PropTypes from 'prop-types'

import angular from './icons/angular.png'
import ase from './icons/ase.png'
import codepen from './icons/codepen.svg'
import codesandbox from './icons/codesandbox.svg'
import figma from './icons/figma.svg'
import illustrator from './icons/illustrator.svg'
import medium from './icons/medium.svg'
import npm from './icons/npm.svg'
import react from './icons/react.png'
import sass from './icons/sass.png'
import sketch from './icons/sketch.svg'
import storybook from './icons/storybook.svg'
import vue from './icons/vue.png'
import webcomponents from './icons/webcomponents.png'
import styles from './mdx-icon.module.scss'

const localIcons = {
  sketch,
  ase,
  codesandbox,
  codepen,
  illustrator,
  react,
  vue,
  angular,
  webcomponents,
  npm,
  storybook,
  medium,
  sass,
  figma
}

const carbonIcons = {
  github: LogoGithub,
  bee: Bee
}

const iconColor = {
  inverse: 'icon-inverse'
}

const MdxIcon = ({ name, color }) => {
  if (localIcons[name]) {
    return <Image className={styles['mdx-icon']} alt={`${name} icon`} src={localIcons[name]} />
  }

  if (carbonIcons[name]) {
    const Icon = carbonIcons[name]
    return <Icon className={clsx(styles['mdx-icon'], styles[iconColor[color]])} size={32} />
  }

  return null
}

MdxIcon.propTypes = {
  color: PropTypes.oneOf(Object.keys(iconColor)),
  name: PropTypes.oneOf([...Object.keys(localIcons), ...Object.keys(carbonIcons)])
}

export default MdxIcon
