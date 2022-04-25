/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

export const LibraryContext = React.createContext()

const LibraryProvider = ({ children, type, site = 'carbon' }) => (
  <LibraryContext.Provider value={{ site, type }}>{children}</LibraryContext.Provider>
)

export default LibraryProvider
