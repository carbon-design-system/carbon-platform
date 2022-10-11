/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import MdxNotification from '@/components/mdx-notification/index'

const MdxCompileExceptionContent = ({ mdxError }) => {
  return (
    <MdxNotification
      title="[next-mdx-remote] error compiling MDX:"
      description={mdxError.message}
    />
  )
}

export default MdxCompileExceptionContent
