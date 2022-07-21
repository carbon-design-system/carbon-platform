/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import { mdxSanitizerPlugin, sanitizeStringMdxSource } from '@carbon-platform/api/mdx-sanitizer'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeUrls from 'rehype-urls'
import remarkGfm from 'remark-gfm'
import unwrapImages from 'remark-unwrap-images'

import components from '@/components/mdx/components'
import { mdxImgResolver } from '@/utils/mdx-image-resolver'

const logging = new Logging({ component: 'mdx.js' })

export const parseMdxResponseContent = async (response) => {
  if (!response.content) {
    return {
      // TODO: replace with full page error
      compiledSource: (await serialize('<p>Component not found.</p>')).compiledSource,
      frontmatter: {
        title: 'Not found'
      }
    }
  }

  const usageFileSource = Buffer.from(response.content, response.encoding).toString()

  // the path to where the mdx file is located on github
  const dirPath = response._links.html.split('/').slice(0, -1).join('/')

  return serialize(sanitizeStringMdxSource(usageFileSource), {
    mdxOptions: {
      remarkPlugins: [
        mdxSanitizerPlugin.bind(null, Object.keys(components)),
        remarkGfm,
        unwrapImages
      ],
      rehypePlugins: [[rehypeUrls, mdxImgResolver.bind(null, dirPath)]]
    },
    parseFrontmatter: true
  }).catch(async (err) => {
    logging.error(err)
    // returning this for now so our app doesn't blow up in case mdx is not valid
    return {
      // TODO: replace with full page error
      compiledSource: (await serialize('<p>Could not serialize MDX at this time.</p>'))
        .compiledSource,
      frontmatter: {
        title: 'Parsing Error'
      }
    }
  })
}
