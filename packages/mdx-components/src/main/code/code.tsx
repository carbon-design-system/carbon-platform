/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSnippet, Column, Grid, Theme } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactElement } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'
import Path from './path.js'

interface CodeProps {
  src?: string | null
  path?: string | null
  lang?: string | null
  children: ReactElement
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
const Code: MdxComponent<CodeProps> = ({ children, src, path, lang }) => {
  lang = lang ? `language-${lang}` : 'language-plain'

  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={8}>
        <Theme theme={'g100'}>
          <Path src={src} path={path} />
          <CodeSnippet type="multi" feedback="Copied!" className={clsx(withPrefix('code'), lang)}>
            {children}
          </CodeSnippet>
        </Theme>
      </Column>
    </Grid>
  )
}

Code.propTypes = {
  /** Provide the contents of Code */
  children: PropTypes.element.isRequired,
  /** Language of the code */
  lang: PropTypes.string,
  /** Path of the code */
  path: PropTypes.string,
  /** Source of the code */
  src: PropTypes.string
}

export { CodeProps }
export default Code
