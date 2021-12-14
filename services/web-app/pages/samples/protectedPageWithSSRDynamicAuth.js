/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { requireAuthentication } from '@/utils/requireAuthentication'

const ProtectedPageWithSSR = (props) => {
  return <div>User: {JSON.stringify(props?.user)}</div>
}

export const getServerSideProps = requireAuthentication(
  () => {
    // Your normal `getServerSideProps` code here
    return {
      props: {}
    }
  },
  (url, query) => {
    return query.host !== 'github.com'
  }
)

export default ProtectedPageWithSSR
