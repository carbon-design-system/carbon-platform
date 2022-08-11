/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Environment, Runtime } from '../../../main/runtime/index.js'

test('correctly returns a prefixed string', (t) => {
  const runtime = new Runtime({ environment: Environment.Test })

  const input = 'hello world'
  const expected = `TEST_${input}`

  t.is(runtime.withEnvironment(input), expected)
})
