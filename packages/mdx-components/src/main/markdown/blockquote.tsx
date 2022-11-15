/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface BlockquoteProps {
  children: ReactNode
  cite?: string | null
}

/**
 * For MDX files, steer away from using JSX components
 * for blockquote in favor of standard markdown syntax.
 *
 *```
 * > Without aesthetic, design is either the humdrum repetition of familiar clichés
 * > or a wild scramble for novelty. Without aesthetic, the computer is but a
 * > mindless speed machine, producing effects without substance, form without
 * > relevant content, or content without meaningful form.
 * >
 * > <cite>– Paul Rand</cite>
 * ```
 */
const Blockquote: MdxComponent<BlockquoteProps> = ({ cite, children }) => (
  <blockquote cite={cite === null ? undefined : cite} className={clsx(withPrefix('blockquote'))}>
    {children}
  </blockquote>
)

Blockquote.propTypes = {
  /**
   * Provide the contents of the Blockquote
   */
  children: PropTypes.node,
  /**
   * Specify optional blockquote cite
   */
  cite: PropTypes.string
}

export { BlockquoteProps }
export default Blockquote
