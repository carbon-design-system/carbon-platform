/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import LibraryProvider from '../library-provider'
import Library from './icon-library'

const IconLibrary = ({ site }) => (
  <LibraryProvider site={site} type="icon">
    <Library />
  </LibraryProvider>
)

export default IconLibrary