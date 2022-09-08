/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import PropTypes from 'prop-types'

import H2 from '@/components/markdown/h2'
import useIntersectionObserver from '@/utils/use-intersection-observer'

import SvgCard from '../svg-card'
import styles from '../svg-library.module.scss'

const PictogramCategory = ({ category, pictograms, columnCount }) => {
  const [sectionRef, containerIsVisible] = useIntersectionObserver()

  return (
    <section ref={sectionRef} className={styles['svg-category']}>
      <H2>{category}</H2>
      <ul className={clsx(styles['svg-grid'], styles.pictograms)}>
        {pictograms
          .filter((pictogram) => {
            return !(pictogram.name === 'ibm--z' || pictogram.name === 'ibm--z--partition')
          })
          .map((pictogram, i) => (
            <SvgCard
              isLastCard={(i + 1) % columnCount === 0}
              isPictogram={true}
              containerIsVisible={containerIsVisible}
              key={pictogram.name}
              icon={pictogram}
              height="23.5%"
              width="23.5%"
            />
          ))}
      </ul>
    </section>
  )
}

PictogramCategory.propTypes = {
  category: PropTypes.string,
  columnCount: PropTypes.number,
  pictograms: PropTypes.arrayOf(
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

export default PictogramCategory
