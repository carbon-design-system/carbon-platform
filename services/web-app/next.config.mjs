/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'

import nextMdx from '@next/mdx'
import withYaml from 'next-plugin-yaml'
import path from 'path'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { fileURLToPath } from 'url'

import { libraryAllowList as libraries } from './data/libraries.mjs'
import { mdxWrapperPlugin } from './utils/mdx-wrapper-plugin.js'
import rehypeMetaAsAttributes from './utils/rehype-meta-as-attributes.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [mdxWrapperPlugin, remarkGfm, remarkUnwrapImages],
    rehypePlugins: [rehypeMetaAsAttributes],
    providerImportSource: '@mdx-js/react'
  }
})

const nextConfig = withMDX(
  withYaml({
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    experimental: {
      outputStandalone: true,
      // this includes files from the monorepo base two directories up
      outputFileTracingRoot: path.join(__dirname, '..', '..')
    },
    i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US'
    },
    images: {
      domains: ['raw.githubusercontent.com', 'github.com']
    },
    swcMinify: true,
    webpack(config) {
      // silence cache warning notifications due to next.config.mjs imports for now, open issues:
      // https://github.com/vercel/next.js/issues/33693
      // https://github.com/webpack/webpack/issues/15574
      config.infrastructureLogging = { level: 'error' }

      const rules = config.module.rules
        .find((rule) => typeof rule.oneOf === 'object')
        .oneOf.filter((rule) => Array.isArray(rule.use))

      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader &&
            moduleLoader.loader.includes('css-loader') &&
            typeof moduleLoader.options.modules === 'object'
          ) {
            moduleLoader.options = {
              ...moduleLoader.options,
              modules: {
                ...moduleLoader.options.modules,
                mode: 'local' // https://github.com/webpack-contrib/css-loader#mode
              }
            }
          }
        })
      })

      config.module.rules.push({
        test: /\.mp4$/,
        use: 'file-loader?name=static/media/[name].[ext]'
      })

      return config
    },
    async redirects() {
      return [
        // temporarily redirect home page for the first release
        {
          source: '/',
          destination: '/assets',
          permanent: false
        },
        {
          source: '/assets/:host/:org/:repo/:library',
          destination: '/assets/:host/:org/:repo/:library/latest',
          permanent: false
        }
      ]
    },
    async rewrites() {
      const rewrites = []

      for (const [slug, library] of Object.entries(libraries)) {
        rewrites.push({
          source: `/assets/${slug}`,
          destination: `/assets/${library.host}/${library.org}/${library.repo}/${slug}/latest`
        })

        rewrites.push({
          source: `/assets/${slug}/library-assets`,
          destination: `/assets/${library.host}/${library.org}/${library.repo}/${slug}/latest/library-assets`
        })

        rewrites.push({
          source: `/assets/${slug}/data/:page*`,
          destination: `/assets/${library.host}/${library.org}/${library.repo}/${slug}/latest/data/:page*`
        })

        rewrites.push({
          source: `/assets/${slug}/:ref*/library-assets`,
          destination: `/assets/${library.host}/${library.org}/${library.repo}/${slug}/:ref*/library-assets`
        })

        rewrites.push({
          source: `/assets/${slug}/:ref*/data/:page*`,
          destination: `/assets/${library.host}/${library.org}/${library.repo}/${slug}/:ref*/data/:page*`
        })

        rewrites.push({
          source: `/assets/${slug}/:ref*`,
          destination: `/assets/${library.host}/${library.org}/${library.repo}/${slug}/:ref*`
        })
      }

      return rewrites
    }
  })
)

export default nextConfig
