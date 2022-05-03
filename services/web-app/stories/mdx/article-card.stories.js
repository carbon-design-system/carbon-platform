/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import ArticleCard from '@/components/article-card'

const stories = {
  title: 'MDX/ArticleCard',
  component: ArticleCard
}

export default stories

const Template = (args) => (
  <Grid narrow>
    <Column lg={4}>
      <ArticleCard
        subTitle="Sub title"
        title="Title"
        author="Author"
        date="July 4, 1975"
        readTime="Read time: 5 min"
        href="/"
        {...args}
      >
        <img src="mdx/Article_06.png" alt="" />
      </ArticleCard>
    </Column>
  </Grid>
)

export const Default = Template.bind({})
Default.args = {}
