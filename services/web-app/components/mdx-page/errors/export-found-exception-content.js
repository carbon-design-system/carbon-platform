/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import FullPageError from './full-page-error/index'

const ExportFoundExceptionContent = ({ mdxError }) => {
  return (
    <FullPageError
      title="Something's gone wrong"
      subtitle="Export statement found"
      link="See common errors for more information"
      href="/common-mdx-errors#export-statement-found"
    >
      <p style={{ marginBottom: '20px' }}>
        For security reasons, export statements are not allowed and should be removed.
      </p>
      {mdxError?.position?.start?.line && <span>Line {mdxError.position.start.line}: </span>}
      <code>{mdxError.message}</code>
    </FullPageError>
  )
}

export default ExportFoundExceptionContent
