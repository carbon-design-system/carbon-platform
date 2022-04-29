/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Code, Download } from '@carbon/icons-react'
import { IconButton } from '@carbon/react'
import { pascalCase } from 'change-case'
import clsx from 'clsx'
import copy from 'copy-to-clipboard'
import PropTypes from 'prop-types'
import { useContext, useRef, useState } from 'react'

import { LibraryContext } from '../library-provider'
import styles from './action-bar.module.scss'

const ActionBar = ({
  name,
  friendlyName,
  source,
  setIsActionBarVisible,
  isActionBarVisible,
  isLastCard,
  glyphOnly
}) => {
  const { site, type } = useContext(LibraryContext)
  let suffix
  if (type === 'pictogram') {
    suffix = ''
  } else if (glyphOnly) {
    suffix = 'Glyph'
  } else {
    suffix = '32'
  }
  const component = `<${pascalCase(friendlyName) + suffix} />`
  const [copyText, setCopyText] = useState(`Copy ${component}`)
  const actionBarRef = useRef()

  // Don't show copy button on IDL deployment
  const shouldShowCopyButton = site === 'carbon'

  const handleBlurEvent = (e) => {
    const isStillFocusedWithin = actionBarRef.current.contains(e.relatedTarget)
    setIsActionBarVisible(isStillFocusedWithin)
  }

  const tooltipAlignment = isLastCard ? 'top-right' : 'top'

  const handleDownload = () => {
    const a = document.body.appendChild(document.createElement('a'))
    const blob = new Blob([source], { type: 'image/svg+xml' })
    const url = window.URL.createObjectURL(blob)
    a.download = `${name}.svg`
    a.href = url
    a.click()
    document.body.removeChild(a)
  }

  const handleCopy = () => {
    setCopyText('Copied!')
    setTimeout(() => {
      setCopyText(`Copy ${component}`)
    }, 2000)
    copy(component, { format: 'text/plain' })
  }

  return (
    <div
      ref={actionBarRef}
      onBlur={handleBlurEvent}
      aria-hidden={!isActionBarVisible}
      className={clsx(styles.container, {
        [styles.hidden]: !isActionBarVisible
      })}
    >
      <IconButton
        kind="ghost"
        align={tooltipAlignment}
        label="Download SVG"
        size="sm"
        onFocus={() => setIsActionBarVisible(true)}
        onClick={handleDownload}
        className={styles.tooltip}
      >
        <Download size={16} />
      </IconButton>
      {shouldShowCopyButton && (
        <IconButton
          kind="ghost"
          align={tooltipAlignment}
          label={copyText}
          size="sm"
          onClick={handleCopy}
          onFocus={() => setIsActionBarVisible(true)}
          className={styles.tooltip}
        >
          <Code size={16} />
        </IconButton>
      )}
    </div>
  )
}

ActionBar.propTypes = {
  friendlyName: PropTypes.string,
  glyphOnly: PropTypes.bool,
  isActionBarVisible: PropTypes.bool,
  isLastCard: PropTypes.bool,
  name: PropTypes.string,
  setIsActionBarVisible: PropTypes.func,
  source: PropTypes.any
}

export default ActionBar
