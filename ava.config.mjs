/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default {
  // Avoid putting files in workspace-level node_modules directories
  cache: false,

  extensions: {
    ts: 'module',
    tsx: 'module'
  },

  files: ['src/test/**/*'],

  // Run TypeScript tests by using the ts-node esm loader
  nodeArguments: [
    // TODO: remove if/when https://github.com/carbon-design-system/carbon/pull/12331 is available
    '--experimental-specifier-resolution=node',
    '--loader=ts-node/esm'
  ],

  // Used for RTL testing
  require: ['jsdom-global/register'],

  timeout: '60s',

  // https://github.com/avajs/ava/issues/2902
  workerThreads: false
}
