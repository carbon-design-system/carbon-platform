/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LibraryProvider from '../library-provider'
import Library from './pictogram-library'

const PictogramLibrary = ({ site }) => (
  <LibraryProvider site={site} type="pictogram">
    <Library />
  </LibraryProvider>
)

export default PictogramLibrary
