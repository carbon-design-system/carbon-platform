/*
 * Copyright IBM Corp. 2023, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'

import { getMetaTitle } from '@/data/nav-data'

/**
 * Returns the page's meta title if the page's path matches known nav data. This hook exists to
 * reduce the number of imports on pages that don't use `next/router`.
 * @returns {string}
 */
const useMetaTitle = () => {
  const router = useRouter()

  return getMetaTitle(router.asPath)
}

export default useMetaTitle
