/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import Markdown from 'markdown-it'
import PropTypes from 'prop-types'

import H2 from '@/components/markdown/h2'

import styles from './glossary-list.module.scss'

const md = new Markdown({
  html: true
})

const renderGlossaryEntry = (glossary, glossaryEntry) => {
  const entry = glossary[glossaryEntry]
  let counter = 0
  return (
    <div
      id={glossaryEntry}
      key={glossaryEntry}
      className={clsx(styles['glossary-entry'], 'glossary-entry')}
    >
      <H2
        headingClassName={styles['glossary-entry__main-heading']}
        className={styles['h2-container']}
      >
        {glossaryEntry}
        <span>{glossaryEntry}</span>
      </H2>
      {Object.keys(entry).map((list, i) => {
        const listItems = Object.keys(entry[list]).map((word) => {
          counter += 1
          const currentWord = entry[list][word]
          let wordId = word.toLowerCase().replace(' ', '-')
          const desc = currentWord.desc ? md.renderInline(currentWord.desc) : ''
          const subtext = currentWord.subtext ? md.renderInline(currentWord.subtext) : ''
          if (wordId === 'docs') {
            wordId = `${wordId}${counter}`
          }
          return (
            <div id={wordId} key={word} className={styles['glossary-entry__word']}>
              <h4 className={clsx(styles['page-h4'], styles['glossary-entry__word-heading'])}>
                {word}
              </h4>
              <p
                className={clsx(styles['glossary-entry__desc'], 'page-p')}
                dangerouslySetInnerHTML={{ __html: desc }}
              />
              <p
                className={clsx(styles['glossary-entry__subtext'], 'page-p')}
                dangerouslySetInnerHTML={{ __html: subtext }}
              />
            </div>
          )
        })
        return (
          <div key={i} className={styles['glossary-entry__list']}>
            {listItems}
          </div>
        )
      })}
    </div>
  )
}

const GlossaryList = ({ glossary }) => {
  const navItems = Object.keys(glossary).map((glossaryEntry) => {
    if (glossaryEntry !== '__content') {
      return renderGlossaryEntry(glossary, glossaryEntry)
    }
    return ''
  })

  return <div className={styles.glossary}>{navItems}</div>
}

GlossaryList.propTypes = {
  glossary: PropTypes.object
}

export default GlossaryList
