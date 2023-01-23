/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
//
// This file is needed because React 17 is not ES-Module aware in the sense of TypeScript needing to
// have the .js suffix on the end of the import. This module delcaration simply re-exports the
// package with the .js file extension.
//
declare module 'react/jsx-runtime.js' {
  export * from 'react/jsx-runtime'
}
