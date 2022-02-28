/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logger } from '@nestjs/common'

import { PlatformController } from '../../main/microservice/platform.controller'

test('PlatformController constructor creates a nest logger', () => {
  const platformController = new PlatformController()

  expect(platformController.nestLogger).toBeInstanceOf(Logger)
})
