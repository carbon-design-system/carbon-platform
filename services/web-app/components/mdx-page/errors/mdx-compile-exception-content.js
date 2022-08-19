/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import InlineError from '@/components/inline-error'

const MdxCompileExceptionContent = ({ mdxError }) => {
  return (
    <InlineError title="[next-mdx-remote] error compiling MDX:" description={mdxError.message} />
  )
}

export default MdxCompileExceptionContent
