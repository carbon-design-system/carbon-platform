/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Logging } from '../../../main/logging/logging.js'
import { InvalidInputException } from '../../../main/microservice/exceptions/invalid-input-exception.js'
import { InvalidInputExceptionFilter } from '../../../main/microservice/filters/invalid-input-exception-filter.js'

test.before(() => {
  Logging.isRemoteLoggingAllowed = false
})

const rpcArgHost = {
  switchToRpc: () => ({
    getContext: () => ({
      getPattern: () => 'the pattern'
    })
  })
}

test('catch', async (t) => {
  const filter = new InvalidInputExceptionFilter()

  const result = filter.catch(new InvalidInputException('a test!'), rpcArgHost as any)

  try {
    await result.forEach(() => {})
  } catch (e) {
    t.true(e instanceof InvalidInputException)
    t.is((e as InvalidInputException).message, 'a test!')
  }
})

test('catch with no pattern does not crash', (t) => {
  const customRpcArgHost = {
    switchToRpc: () => ({
      getContext: () => ({
        getPattern: () => undefined
      })
    })
  }

  const filter = new InvalidInputExceptionFilter()

  filter.catch(new InvalidInputException('a test!'), customRpcArgHost as any)

  t.pass()
})
