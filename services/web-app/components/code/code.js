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

const Code = ({ children, path, src }) => {
  console.log(' 🐬 👀 src', src)
  console.log(' 🐬 👀 path', path)
  const code = children.props.children
  const language = children.props.className?.replace('language-', '').trim()
  return (
    <Theme theme={'g100'}>
      <Grid condensed>
        <Column sm={4} md={6} lg={8}>
          {src && (
            <Path src={src} path={path}>
              {children}
            </Path>
          )}
          <CodeSnippet type="multi" wrapText feedback="Copied!" className={styles.code}>
            <Highlight {...defaultProps} code={code} language={language} theme={carbonTheme}>
              {/* {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style }}>
                  {tokens.slice(0, -1).map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                // </pre>
              )} */}
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
  path: PropTypes.string,
  src: PropTypes.string
}

export default Code
