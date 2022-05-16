/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { blue40, gray30, magenta40, purple40, teal20, white0 } from '@carbon/elements'

const theme = {
  property: teal20,
  tag: blue40,
  important: blue40,
  string: magenta40,
  boolean: purple40,
  text02: gray30
}

const carbonTheme = {
  plain: {
    color: white0
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: theme.text02
      }
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ['tag', 'operator'],
      style: {
        color: theme.tag
      }
    },
    {
      types: ['property', 'function', 'attr-name'],
      style: {
        color: theme.property
      }
    },
    {
      types: ['variable'],
      style: {
        color: theme.inverse01 // white
      }
    },
    {
      types: ['string'],
      style: {
        color: theme.string
      }
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help'
      }
    },
    {
      types: [
        'boolean',
        'entity',
        'url',
        'attr-value',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'selector',
        'keyword',
        'placeholder'
      ],
      style: {
        color: theme.boolean
      }
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through'
      }
    },
    {
      types: ['inserted'],
      style: {
        borderBottom: '1px dotted #c22dd5',
        textDecorationLine: 'underline'
      }
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic'
      }
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold'
      }
    },
    {
      types: ['important'],
      style: {
        color: theme.important
      }
    }
  ]
}

export default carbonTheme
