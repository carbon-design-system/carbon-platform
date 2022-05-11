/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import ArticleCard from '@/components/article-card'
import Image from '@/components/markdown/image'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './medium-posts.module.scss'

const dummyArticles = [
  {
    title: 'Dummy Title',
    author: 'Jane Doe',
    link: '',
    date: moment(new Date()).format('MMMM Do, YYYY'),
    thumbnail: '/carbon.png'
  },
  {
    title: 'Dummy Title',
    author: 'Jane Doe',
    link: '',
    date: moment(new Date()).format('MMMM Do, YYYY'),
    thumbnail: '/carbon.png'
  },
  {
    title: 'Dummy Title',
    author: 'Jane Doe',
    link: '',
    date: moment(new Date()).format('MMMM Do, YYYY'),
    thumbnail: '/carbon.png'
  }
]

const imgSrcMatchString = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g

const MediumPosts = ({ postLimit = 3, cardProps, dummy, ...rest }) => {
  const [allPosts, setAllPosts] = useState(dummy ? dummyArticles : [])
  const isMd = useMatchMedia(mediaQueries.md)

  useEffect(() => {
    async function getMediumArticles() {
      const articlesRes = await fetch('http://localhost:3000/api/get-medium-feed') // TODO: this won't work on prod?
      if (articlesRes.ok) {
        const articles = await articlesRes.json()
        setAllPosts(
          articles.items.map((article) => {
            const imgSrc = imgSrcMatchString.exec(article['content:encoded'])
            return {
              title: article.title,
              author: article.creator,
              link: article.link,
              date: moment(new Date(article.isoDate)).format('MMMM Do, YYYY'),
              thumbnail: imgSrc ? imgSrc[1] : null
            }
          })
        )
      }
    }
    if (!dummy) {
      getMediumArticles()
    }
  }, [dummy])

  return (
    <Grid {...rest} narrow className={styles['medium-posts-container']}>
      {allPosts.slice(0, postLimit).map((latestPost, index) => (
        <Column sm={4} md={4} lg={4} narrow={isMd} className={styles['card-container']} key={index}>
          <ArticleCard
            title={latestPost.title}
            author={latestPost.author}
            href={latestPost.link}
            date={latestPost.date}
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
  dummy: false
}

MediumPosts.propTypes = {
  /**
   * Additional Props to pass onto ArticleCard component
   */
  cardProps: PropTypes.object,
  /**
   * Render dummy data (storybook purposes)
   */
  dummy: PropTypes.bool,
  /**
   * Max number of posts to show.
   */
  postLimit: PropTypes.number
}

export default MediumPosts
