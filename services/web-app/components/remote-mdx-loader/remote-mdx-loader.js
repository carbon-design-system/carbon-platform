/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MDXRemote } from 'next-mdx-remote'
import PropTypes from 'prop-types'

import MdxWrapper from '../mdx-wrapper'

const RemoteMdxLoader = ({ source }) => {
  return (
    <MdxWrapper frontmatter={JSON.stringify(source?.frontmatter ?? {})}>
      <MDXRemote {...source} />
    </MdxWrapper>
  )
}

RemoteMdxLoader.propTypes = {
  /**
   * serialized mdxSource (AST)
   */
  source: PropTypes.shape({
    frontmatter: PropTypes.object,
    compiledSource: PropTypes.string
  })
}

export default RemoteMdxLoader
