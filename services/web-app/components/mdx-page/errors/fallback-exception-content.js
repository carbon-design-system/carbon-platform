/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import InlineError from '@/components/inline-error/inline-error'

const FallbackExceptionContent = ({ mdxError }) => {
  const description =
    "Verify component usage documentation to make sure you're supplying all " +
    'necessary information in the correct format.'
  const Content = <div>{mdxError.message || 'No details available'}</div>

  return (
    <InlineError
      title="Component not rendering"
      description={description}
      content={Content}
      link="Get support"
      // TODO: what goes here?
      href="/TODO"
    />
  )
}

export default FallbackExceptionContent
