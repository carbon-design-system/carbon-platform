/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import AutolinkHeader from '@/components/autolink-header'
import useIntersectionObserver from '@/utils/use-intersection-observer'

import SvgCard from '../svg-card'
import styles from '../svg-library.module.scss'

const IconCategory = ({ category, icons, columnCount }) => {
  const [subCategoryRef, containerIsVisible] = useIntersectionObserver()
  return (
    <section className={styles['svg-category']}>
      <Grid className={clsx(styles.header, styles['h2-container'])}>
        <Column sm={4} md={8} lg={8}>
          <AutolinkHeader is="h2" className={clsx(styles.h2)}>
            {category}
          </AutolinkHeader>
        </Column>
      </Grid>
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
