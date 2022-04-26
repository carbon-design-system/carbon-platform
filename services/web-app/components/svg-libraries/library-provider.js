/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React from 'react'

export const LibraryContext = React.createContext()

const LibraryProvider = ({ children, type, site = 'carbon' }) => (
  <LibraryContext.Provider value={{ site, type }}>{children}</LibraryContext.Provider>
)

LibraryProvider.defaultProps = {
  site: 'carbon'
}

LibraryProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  site: PropTypes.string,
  type: PropTypes.string
}

export default LibraryProvider
