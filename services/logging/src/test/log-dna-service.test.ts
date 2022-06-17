/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { LogDnaService } from '../main/log-dna-service.js'

test('it uses the injected logger', (t) => {
  t.plan(1)

  const logDnaLogger = {
    log: () => {
      t.pass()
    }
  } as any

  const logDnaService = new LogDnaService({ logDnaLogger })

  logDnaService.log({} as any)
})
