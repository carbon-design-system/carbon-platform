/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

test('Add some tests!', (t) => {
  t.pass()
})

// TODO: Convert store to a class with dependency injection. add relevant tests here after

//
// TODO: This is mostly re-testing the logic from getEnvVar(). A more interesting test would be that
// given a specific input, you receive the correct type of store as output.
//
//   it('on production mode without env variables throws error', async () => {
//     const oldCarbonRunMode = getRunMode()
//     process.env.CARBON_RUN_MODE = RunMode.Standard
//     await expect(() => store.getStore()).rejects.toThrow()
//     process.env.CARBON_RUN_MODE = oldCarbonRunMode
//   })

//
// TODO: This would be implicitly covered by testing the one above.
//
//   it('can be retrieved without crashing in Dev mode', async () => {
//     await expect(store.getStore()).resolves.toBeDefined()
//   })
