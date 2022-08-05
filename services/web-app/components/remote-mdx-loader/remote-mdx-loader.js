/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'

import FullPageError from '../full-page-error/full-page-error'
import InlineError from '../inline-error/inline-error'
import MdxWrapper from '../mdx-wrapper'

const getMdxErrorDisplay = (mdxError) => {
  if (mdxError.type === 'ImportFoundException' || mdxError.type === 'ExportFoundException') {
    return (
      <FullPageError
        title="Something's gone wrong"
        subtitle={`${
          mdxError.type === 'ExportFoundException' ? 'Export' : 'Import'
        } statement identified`}
        content={
          <>
            <div style={{ marginBottom: '20px' }}>
              For security concerns, import and export statements are not allowed and should be
              removed
            </div>
            <code>{mdxError.value}</code>
          </>
        }
        link="See common errors for more information"
        href="/common-errors"
      />
    )
  } else if (mdxError.type === 'ContentNotFoundException') {
    return (
      <FullPageError
        title="The page you are looking for cannot be found."
        subtitle="Supplied Github route does not exist. Update to a valid route."
        link="See common errors for further information on valid urls"
        href="/common-errors"
      />
    )
  } else if (mdxError.type === 'MdxParseException') {
    return (
      <InlineError title="[next-mdx-remote] error compiling MDX:" description={mdxError.message} />
    )
  } else {
    return (
      <InlineError
        title="Component not rendering"
        description="Verify component usage documentation to make sure you're supplying all necessary information in the correct format"
        link="Get support"
        href="/TODO"
      />
    )
  }
}

const RemoteMdxLoader = ({ source, ignoreTabs, mdxError }) => {
  return (
    <MdxWrapper frontmatter={JSON.stringify(source?.frontmatter ?? {})} ignoreTabs={ignoreTabs}>
      {source?.compiledSource && (
        <div dangerouslySetInnerHTML={{ __html: source?.compiledSource }} />
      )}
      {mdxError && getMdxErrorDisplay(mdxError)}
    </MdxWrapper>
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
