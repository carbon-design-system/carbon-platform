/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSnippet, Column, Grid, Theme } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import styles from './code.module.scss'
import Path from './path'

const Code = ({ children }) => {
  const code = children.props.children
  const path = children.props.path
  const src = children.props.src
  const language = children.props.className || 'language-plain'

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // This could be improved by assigning a ref to the component and using
        // Prism.highlightElement() instead.
        window.Prism && window.Prism.highlightAll()
      }
    } catch (err) {
      console.error(err)
    }
  }, [code])

  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={8}>
        <Theme theme={'g100'}>
          {path && (
            <Path src={src} path={path}>
              {children}
            </Path>
          )}
          <CodeSnippet type="multi" feedback="Copied!" className={clsx(styles.code, language)}>
            {code}
          </CodeSnippet>
        </Theme>
      </Column>
    </Grid>
  )
}

Code.propTypes = {
  /** Provide the contents of Code */
  children: PropTypes.node.isRequired
}

export default Code
