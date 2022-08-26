/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Auth } from '../../main/auth/index.js'
import { RunMode, Runtime } from '../../main/runtime/index.js'

test('getPassport crashes in "Standard" mode when no env vars have been set', async (t) => {
  t.plan(1)

  const runtime = new Runtime({ runMode: RunMode.Standard })

  const auth = new Auth({ runtime })

  try {
    await auth.getPassport()
  } catch (err) {
    t.true(err instanceof TypeError)
  }
})

test('getPassport works in "Dev" mode without env vars', async (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev })

  const auth = new Auth({ runtime })
  const p = await auth.getPassport()

  t.not(p, undefined)
})

test('authenticate correctly uses a provided auth strategy', async (t) => {
  t.plan(1)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const auth = new Auth({ runtime })

  const authHandler = await auth.authenticate('not real' as any)

  try {
    await new Promise((resolve, reject) => {
      authHandler('', '', (err: any, user: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(user)
        }
      })
    })
  } catch (err: any) {
    t.is((err as Error).message, 'Unknown authentication strategy "not real"')
  }
})
