/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import H4 from '../markdown/h4.js'
import Markdown from 'markdown-it'
import PropTypes from 'prop-types'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

const md = new Markdown({
  html: true
})

interface ActionLabels {
  'Action labels': {
    [word: string]: {
      desc: string | null
      subtext: string | null
    }
  }
}

interface Glossary {
  [letter: string]: ActionLabels
}

const doStuff = (entry: ActionLabels) => {
  const listItems = Object.entries(entry['Action labels']).map(([word, wordObj]) => {
    let wordId = word.toLowerCase().replace(' ', '-')
    const desc = wordObj.desc ? md.renderInline(wordObj.desc) : ''
    const subtext = wordObj.subtext ? md.renderInline(wordObj.subtext) : ''
    if (wordId === 'docs') {
      wordId = `${wordId}${entry}`
    }
    return (
      <div id={wordId} key={word} className={withPrefix('glossary-entry__word')}>
        <H4 className={withPrefix('h4-container')}>{word}</H4>
        <p
          className={withPrefix('glossary-entry__desc')}
          dangerouslySetInnerHTML={{ __html: desc }}
        />
        <p
          className={withPrefix('glossary-entry__subtext')}
          dangerouslySetInnerHTML={{ __html: subtext }}
        />
      </div>
    )
  })
  return <div className={withPrefix('glossary-entry__list')}>{listItems}</div>
}

function renderGlossaryEntry(glossary: Glossary, glossaryEntry: Exclude<keyof Glossary, number>) {
  const entry = glossary[glossaryEntry]

  if (!entry) {
    return undefined
  }

  let counter = 0
  return (
    <div id={glossaryEntry} key={glossaryEntry} className={withPrefix('glossary-entry')}>
      <h2 className={withPrefix('glossary-entry__main-heading')}>
        {glossaryEntry}
        <span>{glossaryEntry}</span>
      </h2>
      {doStuff(entry)}
    </div>
  )
}

interface GlossaryListProps {
  glossary: Glossary
}

const GlossaryList: MdxComponent<GlossaryListProps> = ({ glossary }) => {
  const navItems = Object.keys(glossary).map((glossaryEntry) => {
    return renderGlossaryEntry(glossary, glossaryEntry)
  })

  return <div className={withPrefix('glossary')}>{navItems}</div>
}

GlossaryList.propTypes = {
  glossary: PropTypes.any
}

export { GlossaryListProps }
export default GlossaryList
