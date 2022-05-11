/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSnippet, Column, Grid, Theme } from '@carbon/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import PropTypes from 'prop-types'

import styles from './code.module.scss'
import Path from './path'
import carbonTheme from './theme.js'

const Code = ({ children }) => {
  const code = children.props.children
  const path = children.props.path
  const src = children.props.src

  const language = children.props.className?.replace('language-', '').trim()
  return (
    <Theme theme={'g100'}>
      <Grid condensed>
        <Column sm={4} md={6} lg={8}>
          {path && (
            <Path src={src} path={path}>
              {children}
            </Path>
          )}
          <CodeSnippet type="multi" wrapText feedback="Copied!" className={styles.code}>
            <Highlight {...defaultProps} code={code} language={language} theme={carbonTheme}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style }}>
                  {tokens.slice(0, -1).map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </CodeSnippet>
        </Column>
      </Grid>
    </Theme>
  )
}

Code.propTypes = {
  /** Provide the contents of Code */
  children: PropTypes.node.isRequired,
  /** Provide path */
  path: PropTypes.string,
  /** Provide src link */
  src: PropTypes.string
}

export default Code
