/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'
import { VFile } from 'vfile'
import { VFileMessage } from 'vfile-message'

import { MdxCompileException } from '../main/exceptions/mdx-compile-exception.js'
import { MdxProcessor } from '../main/mdx-processor.js'

test('it runs without crashing', async (t) => {
  const processor = new MdxProcessor({
    allowedTags: [],
    components: {},
    fallbackComponent: () => '',
    imageResolverPlugin: () => () => undefined,
    logger: {
      debug: () => undefined,
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined
    },
    onError: () => undefined,
    sanitizerPlugin: () => () => undefined,
    tagReplacements: {}
  })

  const result = await processor.process(new VFile('hello world'))

  t.truthy(result)
})

test('it can propagate a compile exception', async (t) => {
  const processor = new MdxProcessor({
    allowedTags: [],
    components: {},
    fallbackComponent: () => '',
    imageResolverPlugin: () => () => undefined,
    logger: {
      debug: () => undefined,
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined
    },
    onError: () => undefined,
    sanitizerPlugin: () => () => {
      throw new VFileMessage('wow its a message!')
    },
    tagReplacements: {}
  })

  await t.throwsAsync(() => processor.process(new VFile('hello world')), {
    instanceOf: MdxCompileException
  })
})

test('it can propagate an unexpected exception', async (t) => {
  class MyCustomError extends Error {}

  const processor = new MdxProcessor({
    allowedTags: [],
    components: {},
    fallbackComponent: () => '',
    imageResolverPlugin: () => () => undefined,
    logger: {
      debug: () => undefined,
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined
    },
    onError: () => undefined,
    sanitizerPlugin: () => () => {
      throw new MyCustomError('something broke!')
    },
    tagReplacements: {}
  })

  await t.throwsAsync(() => processor.process(new VFile('hello world')), {
    instanceOf: MyCustomError
  })
})

test('it can propagate a runtime error', async (t) => {
  const processor = new MdxProcessor({
    allowedTags: [],
    components: {},
    fallbackComponent: () => '',
    imageResolverPlugin: () => () => undefined,
    logger: {
      debug: () => undefined,
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined
    },
    onError: () => undefined,
    sanitizerPlugin: () => () => undefined,
    tagReplacements: {}
  })

  await t.throwsAsync(() => processor.process(new VFile('<Wrong />')), {
    instanceOf: Error
  })
})
