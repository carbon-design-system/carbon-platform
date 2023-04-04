/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process a table', (t) => {
  const result = process(
    `
| first col | second col |
| --------: | ---------- |
| cell 1    | cell 2     |
`,
    []
  )
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          value: 'first col',
                          props: { parentType: 'table-header-cell' },
                          type: 'text'
                        }
                      ],
                      props: { parentType: 'table-header-row', textAlign: 'right' },
                      type: 'table-header-cell'
                    },
                    {
                      children: [
                        {
                          value: 'second col',
                          props: { parentType: 'table-header-cell' },
                          type: 'text'
                        }
                      ],
                      props: { parentType: 'table-header-row' },
                      type: 'table-header-cell'
                    }
                  ],
                  props: { parentType: 'table-head' },
                  type: 'table-header-row'
                }
              ],
              props: { parentType: 'table' },
              type: 'table-head'
            },
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          value: 'cell 1',
                          props: { parentType: 'table-cell' },
                          type: 'text'
                        }
                      ],
                      props: { parentType: 'table-row', textAlign: 'right' },
                      type: 'table-cell'
                    },
                    {
                      children: [
                        {
                          value: 'cell 2',
                          props: { parentType: 'table-cell' },
                          type: 'text'
                        }
                      ],
                      props: { parentType: 'table-row' },
                      type: 'table-cell'
                    }
                  ],
                  props: { parentType: 'table-body' },
                  type: 'table-row'
                }
              ],
              props: { parentType: 'table' },
              type: 'table-body'
            }
          ],
          props: { parentType: 'document', columns: 2 },
          type: 'table'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})

test('it can process a table with no body rows', (t) => {
  const result = process(
    `
| first col | second col |
| --------: | ---------- |
`,
    []
  )
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          value: 'first col',
                          props: { parentType: 'table-header-cell' },
                          type: 'text'
                        }
                      ],
                      props: { parentType: 'table-header-row', textAlign: 'right' },
                      type: 'table-header-cell'
                    },
                    {
                      children: [
                        {
                          value: 'second col',
                          props: { parentType: 'table-header-cell' },
                          type: 'text'
                        }
                      ],
                      props: { parentType: 'table-header-row' },
                      type: 'table-header-cell'
                    }
                  ],
                  props: { parentType: 'table-head' },
                  type: 'table-header-row'
                }
              ],
              props: { parentType: 'table' },
              type: 'table-head'
            },
            { children: [], props: { parentType: 'table' }, type: 'table-body' }
          ],
          props: { parentType: 'document', columns: 2 },
          type: 'table'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})
