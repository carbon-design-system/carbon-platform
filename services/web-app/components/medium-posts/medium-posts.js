/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import moment from 'moment'
import PropTypes from 'prop-types'

import ArticleCard from '@/components/article-card'
import Image from '@/components/markdown/image'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './medium-posts.module.scss'

const MediumPosts = ({ posts, cardProps, ...rest }) => {
  const isMd = useMatchMedia(mediaQueries.md)

  return (
    <Grid {...rest} narrow={isMd} className={styles['medium-posts-container']}>
      {posts.map((latestPost, index) => (
        <Column sm={4} md={4} lg={4} className={styles['card-container']} key={index}>
          <ArticleCard
            title={latestPost.title}
            author={latestPost.author}
            href={latestPost.link}
            date={moment(latestPost.date).format('MMMM Do, YYYY')}
            color="dark"
            {...cardProps}
          >
            {latestPost.thumbnail && (
              <Image
                alt={latestPost.title}
                src={latestPost.thumbnail}
                className={styles.image}
                unoptimized
              />
            )}
          </ArticleCard>
        </Column>
      ))}
    </Grid>
  )
}

MediumPosts.defaultProps = {
  postLimit: 3,
  posts: []
}

MediumPosts.propTypes = {
  /**
   * Additional Props to pass onto ArticleCard component
   */
  cardProps: PropTypes.object,
  /**
   * Posts data to display
   */
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      link: PropTypes.string,
      date: PropTypes.string,
      thumbnail: PropTypes.string
    })
  )
}

export default MediumPosts
