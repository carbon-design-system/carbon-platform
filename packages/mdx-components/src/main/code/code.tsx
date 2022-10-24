/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSnippet, Column, Grid, Theme } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactElement, ReactPortal } from 'react'

import { MdxComponent, NonScalarNode } from '../interfaces.js'
import { withPrefix } from '../utils.js'
import Path from './path.js'

interface CodeProps {
  children: Exclude<NonScalarNode, Array<ReactElement | ReactPortal>>
}
/**
 *
 * For MDX files, steer away from using JSX components
 * for code in favor of standard markdown syntax.
 *
 *````
 * ```
 * const a = 16;
 * ```
 *````
 */
const Code: MdxComponent<CodeProps> = ({ children }) => {
  const code = children.props.children
  const path = children.props.path
  const src = children.props.src
  const language = children.props.className || 'language-plain'

  console.log(children, code, typeof code, path, src, language)

  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={8}>
        <Theme theme={'g100'}>
          {path && (
            <Path src={src} path={path}>
              {children}
            </Path>
          )}

          <CodeSnippet
            type="multi"
            feedback="Copied!"
            className={clsx(withPrefix('code'), language)}
          >
            {code}
          </CodeSnippet>
        </Theme>
      </Column>
    </Grid>
  )
}

Code.propTypes = {
  /** Provide the contents of Code */
  children: PropTypes.element.isRequired
}

export { CodeProps }
export default Code
