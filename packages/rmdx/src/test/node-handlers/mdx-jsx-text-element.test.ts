/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it allows text elements from the allowed components list', (t) => {
  const result = process('Hello <World />', ['World'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            { children: [], props: { parentNodeType: 'paragraph' }, nodeType: 'World' }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it throws when unknown components are provided', (t) => {
  t.throws(() => process('Hello <World />', []))
})

test('it ignores attrs with no name', (t) => {
  const result = process('Hello <Wow {...cantDoThis} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            { children: [], props: { parentNodeType: 'paragraph' }, nodeType: 'Wow' }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it ignores undefined attr values', (t) => {
  const result = process('Hello <Wow asdf={undefined} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            { children: [], props: { parentNodeType: 'paragraph' }, nodeType: 'Wow' }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it ignores complex attr values', (t) => {
  // eslint-disable-next-line no-template-curly-in-string --  Testing a specifc edge case
  const result = process('Hello <Wow foo={() => 7} bar={`hello ${world}`} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            { children: [], props: { parentNodeType: 'paragraph' }, nodeType: 'Wow' }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it converts null attr values to true', (t) => {
  const result = process('Hello <Wow asdf />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            { children: [], props: { parentNodeType: 'paragraph', asdf: true }, nodeType: 'Wow' }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it allows string attr values', (t) => {
  let result = process("Hello <Wow asdf='someString' />", ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            {
              children: [],
              props: { parentNodeType: 'paragraph', asdf: 'someString' },
              nodeType: 'Wow'
            }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })

  result = process('Hello <Wow asdf="someString" />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            {
              children: [],
              props: { parentNodeType: 'paragraph', asdf: 'someString' },
              nodeType: 'Wow'
            }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it allows boolean attr values', (t) => {
  const result = process('Hello <Wow yes={true} no={false} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            {
              children: [],
              props: { parentNodeType: 'paragraph', yes: true, no: false },
              nodeType: 'Wow'
            }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it allows numeric attr values', (t) => {
  const result = process('Hello <Wow foo={123} bar={0.123} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' },
            {
              children: [],
              props: { parentNodeType: 'paragraph', foo: 123, bar: 0.123 },
              nodeType: 'Wow'
            }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
