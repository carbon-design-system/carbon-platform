/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Logging } from '../../../main/logging/index.js'
import { UncaughtExceptionFilter } from '../../../main/microservice/filters/uncaught-exception-filter.js'

test('catch', async (t) => {
  const logging = new Logging({ component: 'test-component' })
  const filter = new UncaughtExceptionFilter({ logging })

  const result = filter.catch(new Error('a test!'))

  try {
    await result.forEach(() => {})
  } catch (e) {
    t.true(e instanceof Error)
    t.is((e as Error).message, 'a test!')
  }
})
