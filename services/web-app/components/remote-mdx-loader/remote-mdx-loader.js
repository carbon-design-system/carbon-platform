/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Link } from '@carbon/react'
import PropTypes from 'prop-types'

import H1 from '../markdown/h1'
import H2 from '../markdown/h2'
import MdxWrapper from '../mdx-wrapper'

const getMdxErrorDisplay = (mdxError) => {
  switch (true) {
    case mdxError.type === 'ImportFoundException' || mdxError.type === 'ExportFoundException':
      // TODO: sub for full page error
      return (
        <>
          <H1>{"Something's gone wrong"}</H1>
          <H2>{`${
            mdxError.type === 'ExportFoundException' ? 'Export' : 'Import'
          } statement identified`}</H2>
          <div>
            For security concerns, import and export statements are not allowed and should be
            removed
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {/* TODO: There is still a space off here */}
            {mdxError.value}
          </div>
        </>
      )
    case mdxError.type === 'ContentNotFoundException':
      // TODO: sub for full page error
      return (
        <>
          <H1>The page you are looking for cannot be found.</H1>
          <div>Supplied Github route does not exist. Update to a valid route.</div>
          <Link>See common errors for further information on valid urls</Link>
        </>
      )
    default:
      return (
        // TODO: sub for inline error
        <div>{mdxError.message}</div>
      )
  }
}

const RemoteMdxLoader = ({ source, ignoreTabs, mdxError }) => {
  return (
    <>
      {source && (
        <MdxWrapper frontmatter={JSON.stringify(source?.frontmatter ?? {})} ignoreTabs={ignoreTabs}>
          {source?.compiledSource && (
            <div dangerouslySetInnerHTML={{ __html: source?.compiledSource }} />
          )}
        </MdxWrapper>
      )}
      {mdxError && getMdxErrorDisplay(mdxError)}
    </>
  )
}

RemoteMdxLoader.propTypes = {
  /**
   * whether frontmatter tabs should be ignored, defaults to false
   */
  ignoreTabs: PropTypes.bool,
  mdxError: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }),
  /**
   * serialized mdxSource (AST)
   */
  source: PropTypes.shape({
    frontmatter: PropTypes.object,
    compiledSource: PropTypes.string
  })
}

export default RemoteMdxLoader
