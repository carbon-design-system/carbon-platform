/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default {
  // Avoid putting files in workspace-level node_modules directories
  cache: false,

  extensions: {
    ts: 'module'
  },

  files: ['src/test/**/*'],

  nodeArguments: ['--loader=ts-node/esm'],

  timeout: '20s',

  // https://github.com/avajs/ava/issues/2902
  workerThreads: false
}
