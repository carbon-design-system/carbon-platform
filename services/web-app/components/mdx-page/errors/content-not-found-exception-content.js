/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FullPageError from './full-page-error/index'

const ContentNotFoundExceptionContent = ({ mdxError }) => {
  return (
    <FullPageError
      title="The page you are looking for cannot be found."
      subtitle="Supplied Github route does not exist. Update to a valid route."
      link="See common errors for further information on valid urls"
      href="/common-errors"
    >
      <p>{mdxError.message}</p>
    </FullPageError>
  )
}

export default ContentNotFoundExceptionContent
