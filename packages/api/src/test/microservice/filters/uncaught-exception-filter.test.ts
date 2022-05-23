/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '../../../main/logging'
import { UncaughtExceptionFilter } from '../../../main/microservice/filters/uncaught-exception-filter'

const errorSpy = jest.spyOn(Logging.prototype, 'error').mockImplementation(jest.fn())

test('catch', () => {
  const filter = new UncaughtExceptionFilter()

  filter.catch(new Error('a test!'))

  expect(errorSpy).toHaveBeenCalled()
})
