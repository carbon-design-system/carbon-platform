/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { h2 } from '@/components/markdown/markdown.module.scss'
import useIntersectionObserver from '@/utils/use-intersection-observer'

import SvgCard from '../svg-card'
import styles from '../svg-library.module.scss'

const IconCategory = ({ category, icons, columnCount }) => {
  const [subCategoryRef, containerIsVisible] = useIntersectionObserver()
  return (
    <section className={styles.svgCategory}>
      <h2 className={clsx(h2, styles.categoryTitle)}>{category}</h2>
      <ul ref={subCategoryRef}>
        <ul className={styles.svgGrid}>
          {icons.map((icon, i) => (
            <SvgCard
              isLastCard={(i + 1) % columnCount === 0}
              containerIsVisible={containerIsVisible}
              key={icon.name}
              icon={icon}
            />
          ))}
        </ul>
      </ul>
    </section>
  )
}

IconCategory.propTypes = {
  category: PropTypes.string,
  columnCount: PropTypes.number,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      Component: PropTypes.func,
      friendlyName: PropTypes.string,
      assets: PropTypes.arrayOf(
        PropTypes.shape({
          size: PropTypes.number,
          source: PropTypes.string
        })
      )
    })
  )
}

export default IconCategory
