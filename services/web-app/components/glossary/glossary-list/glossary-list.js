/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import Markdown from 'markdown-it'
import PropTypes from 'prop-types'

import AutolinkHeader from '@/components/autolink-header'

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
      <Grid className={clsx(styles['h2-container'])}>
        <Column sm={4} md={8} lg={8}>
          <AutolinkHeader
            is="h2"
            className={clsx(styles.h2, styles['glossary-entry__main-heading'])}
          >
            {glossaryEntry}
            <span>{glossaryEntry}</span>
          </AutolinkHeader>
        </Column>
      </Grid>
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
              <Grid className={clsx(styles.header, styles['h4-container'])}>
                <Column sm={4} md={8} lg={8}>
                  <h4 className={clsx(styles.h4)}>{word}</h4>
                </Column>
              </Grid>
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
