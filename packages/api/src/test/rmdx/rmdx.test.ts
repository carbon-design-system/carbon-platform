/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Rmdx } from '../../main/rmdx/rmdx.js'
import { RunMode } from '../../main/runtime/interfaces.js'
import { Runtime } from '../../main/runtime/runtime.js'

test('it correctly returns dev data', async (t) => {
  const runtime = new Runtime()

  const rmdx = new Rmdx({ runtime })

  const response = await rmdx.queryRmdx("doesn't matter")

  t.is(response.ast.nodeType, 'document')
})

test('it uses messaging in standard run mode', async (t) => {
  t.plan(1)

  const runtime = new Runtime({ runMode: RunMode.Standard })
  const messagingClient: any = {
    query: (): Promise<void> => {
      t.pass()
      return Promise.resolve()
    }
  }

  const rmdx = new Rmdx({ runtime, messagingClient })

  await rmdx.queryRmdx("doesn't matter")
})
