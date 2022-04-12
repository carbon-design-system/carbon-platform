/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'

const path = require('path')
const libraries = require('./data/libraries')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react'
  }
})

module.exports = withMDX({
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
              exportLocalsConvention: 'camelCase', // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
              mode: 'local' // https://github.com/webpack-contrib/css-loader#mode
            }
          }
        }
      })
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

    for (const [slug, library] of Object.entries(libraries.libraryAllowList)) {
      rewrites.push({
        source: `/assets/${slug}`,
        destination: `/assets/${library.host}/${library.org}/${library.repo}/${slug}/latest`
      })

      rewrites.push({
        source: `/assets/${slug}/:ref*`,
        destination: `/assets/${library.host}/${library.org}/${library.repo}/${slug}/:ref*`
      })
    }

    return rewrites
  }
})
