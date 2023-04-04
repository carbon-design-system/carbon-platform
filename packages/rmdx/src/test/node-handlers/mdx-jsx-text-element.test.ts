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
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            { children: [], props: { parentType: 'paragraph' }, type: 'World' }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it replaces an unknown component with error node', (t) => {
  const result = process('Hello <World />', [])

  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            { type: '__error__', data: { errorIndex: 0 } }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    },
    errors: [
      {
        type: 'UnknownComponentException',
        position: {
          start: { line: 1, column: 7, offset: 6 },
          end: { line: 1, column: 16, offset: 15 }
        },
        src: 'World'
      }
    ]
  })
})

test('it ignores attrs with no name', (t) => {
  const result = process('Hello <Wow {...cantDoThis} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            { children: [], props: { parentType: 'paragraph' }, type: 'Wow' }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it ignores undefined attr values', (t) => {
  const result = process('Hello <Wow asdf={undefined} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            { children: [], props: { parentType: 'paragraph' }, type: 'Wow' }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it ignores complex attr values', (t) => {
  // eslint-disable-next-line no-template-curly-in-string --  Testing a specifc edge case
  const result = process('Hello <Wow foo={() => 7} bar={`hello ${world}`} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            { children: [], props: { parentType: 'paragraph' }, type: 'Wow' }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it converts null attr values to true', (t) => {
  const result = process('Hello <Wow asdf />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            { children: [], props: { parentType: 'paragraph', asdf: true }, type: 'Wow' }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it allows string attr values', (t) => {
  let result = process("Hello <Wow asdf='someString' />", ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            {
              children: [],
              props: { parentType: 'paragraph', asdf: 'someString' },
              type: 'Wow'
            }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })

  result = process('Hello <Wow asdf="someString" />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            {
              children: [],
              props: { parentType: 'paragraph', asdf: 'someString' },
              type: 'Wow'
            }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it allows boolean attr values', (t) => {
  const result = process('Hello <Wow yes={true} no={false} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            {
              children: [],
              props: { parentType: 'paragraph', yes: true, no: false },
              type: 'Wow'
            }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it allows numeric attr values', (t) => {
  const result = process('Hello <Wow foo={123} bar={0.123} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'Hello ', props: { parentType: 'paragraph' }, type: 'text' },
            {
              children: [],
              props: { parentType: 'paragraph', foo: 123, bar: 0.123 },
              type: 'Wow'
            }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})
