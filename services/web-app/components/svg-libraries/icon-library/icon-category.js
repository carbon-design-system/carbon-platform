/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'

import H2 from '@/components/markdown/h2'
import useIntersectionObserver from '@/utils/use-intersection-observer'

import SvgCard from '../svg-card'
import styles from '../svg-library.module.scss'

const IconCategory = ({ category, icons, columnCount }) => {
  const [subCategoryRef, containerIsVisible] = useIntersectionObserver()
  return (
    <section className={styles['svg-category']}>
      <H2 className={styles['h2-container']}>{category}</H2>
      <ul ref={subCategoryRef}>
        <ul className={styles['svg-grid']}>
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
      Component: PropTypes.object,
      friendlyName: PropTypes.string,
      assets: PropTypes.arrayOf(
        PropTypes.shape({
          size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          source: PropTypes.string
        })
      )
    })
  )
}

export default IconCategory
