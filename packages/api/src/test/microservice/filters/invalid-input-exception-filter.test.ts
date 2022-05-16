/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '../../../main/logging'
import { InvalidInputException } from '../../../main/microservice/exceptions/invalid-input-exception'
import { InvalidInputExceptionFilter } from '../../../main/microservice/filters/invalid-input-exception-filter'

const warnSpy = jest.spyOn(Logging.prototype, 'warn').mockImplementation(jest.fn())

const rpcArgHost = {
  switchToRpc: jest.fn().mockReturnValue({
    getContext: jest.fn().mockReturnValue({
      getPattern: jest.fn()
    })
  })
}

test('catch', () => {
  const filter = new InvalidInputExceptionFilter()

  filter.catch(new InvalidInputException('a test!'), rpcArgHost as any)

  expect(warnSpy).toHaveBeenCalled()
})
