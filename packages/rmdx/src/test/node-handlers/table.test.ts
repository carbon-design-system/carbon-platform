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
                          props: { parentNodeType: 'table-header-cell' },
                          nodeType: 'text'
                        }
                      ],
                      props: { parentNodeType: 'table-header-row', textAlign: 'right' },
                      nodeType: 'table-header-cell'
                    },
                    {
                      children: [
                        {
                          value: 'second col',
                          props: { parentNodeType: 'table-header-cell' },
                          nodeType: 'text'
                        }
                      ],
                      props: { parentNodeType: 'table-header-row' },
                      nodeType: 'table-header-cell'
                    }
                  ],
                  props: { parentNodeType: 'table-head' },
                  nodeType: 'table-header-row'
                }
              ],
              props: { parentNodeType: 'table' },
              nodeType: 'table-head'
            },
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          value: 'cell 1',
                          props: { parentNodeType: 'table-cell' },
                          nodeType: 'text'
                        }
                      ],
                      props: { parentNodeType: 'table-row', textAlign: 'right' },
                      nodeType: 'table-cell'
                    },
                    {
                      children: [
                        {
                          value: 'cell 2',
                          props: { parentNodeType: 'table-cell' },
                          nodeType: 'text'
                        }
                      ],
                      props: { parentNodeType: 'table-row' },
                      nodeType: 'table-cell'
                    }
                  ],
                  props: { parentNodeType: 'table-body' },
                  nodeType: 'table-row'
                }
              ],
              props: { parentNodeType: 'table' },
              nodeType: 'table-body'
            }
          ],
          props: { parentNodeType: 'document', columns: 2 },
          nodeType: 'table'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
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
                          props: { parentNodeType: 'table-header-cell' },
                          nodeType: 'text'
                        }
                      ],
                      props: { parentNodeType: 'table-header-row', textAlign: 'right' },
                      nodeType: 'table-header-cell'
                    },
                    {
                      children: [
                        {
                          value: 'second col',
                          props: { parentNodeType: 'table-header-cell' },
                          nodeType: 'text'
                        }
                      ],
                      props: { parentNodeType: 'table-header-row' },
                      nodeType: 'table-header-cell'
                    }
                  ],
                  props: { parentNodeType: 'table-head' },
                  nodeType: 'table-header-row'
                }
              ],
              props: { parentNodeType: 'table' },
              nodeType: 'table-head'
            },
            { children: [], props: { parentNodeType: 'table' }, nodeType: 'table-body' }
          ],
          props: { parentNodeType: 'document', columns: 2 },
          nodeType: 'table'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
