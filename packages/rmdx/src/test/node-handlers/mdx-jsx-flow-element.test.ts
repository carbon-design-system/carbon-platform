/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it allows flow elements from the allowed components list', (t) => {
  const result = process('<Wowow />', ['Wowow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [{ children: [], props: { parentType: 'document' }, type: 'Wowow' }],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it replaces an unknown component with an error node', (t) => {
  const result = process('<NotHere />', [])

  t.deepEqual(result, {
    ast: {
      children: [
        {
          type: '__error__',
          data: {
            errorIndex: 0
          }
        }
      ],
      type: 'document',
      props: {
        parentType: ''
      }
    },
    errors: [
      {
        type: 'UnknownComponentException',
        position: {
          start: { column: 1, line: 1, offset: 0 },
          end: { column: 12, line: 1, offset: 11 }
        },
        src: 'NotHere'
      }
    ],
    frontmatter: {}
  })
})

test('it ignores attrs with no name', (t) => {
  const result = process('<Wow {...cantDoThis} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [{ children: [], props: { parentType: 'document' }, type: 'Wow' }],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it ignores undefined attr values', (t) => {
  const result = process('<Wow asdf={undefined} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [{ children: [], props: { parentType: 'document' }, type: 'Wow' }],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it ignores complex attr values', (t) => {
  // eslint-disable-next-line no-template-curly-in-string -- Testing a specifc edge case
  const result = process('<Wow foo={() => 7} bar={`hello ${world}`} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [{ children: [], props: { parentType: 'document' }, type: 'Wow' }],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it converts null attr values to true', (t) => {
  const result = process('<Wow asdf />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [{ children: [], props: { parentType: 'document', asdf: true }, type: 'Wow' }],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it allows string attr values', (t) => {
  let result = process("<Wow asdf='someString' />", ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        { children: [], props: { parentType: 'document', asdf: 'someString' }, type: 'Wow' }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })

  result = process('<Wow asdf="someString" />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        { children: [], props: { parentType: 'document', asdf: 'someString' }, type: 'Wow' }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it allows boolean attr values', (t) => {
  const result = process('<Wow yes={true} no={false} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [],
          props: { parentType: 'document', yes: true, no: false },
          type: 'Wow'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it allows numeric attr values', (t) => {
  const result = process('<Wow foo={123} bar={0.123} />', ['Wow'])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [],
          props: { parentType: 'document', foo: 123, bar: 0.123 },
          type: 'Wow'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})
