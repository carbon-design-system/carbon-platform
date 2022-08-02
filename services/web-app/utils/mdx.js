/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import mdxSanitizerPlugin, {
  ExportFoundException,
  ImportFoundException
} from '@carbon-platform/mdx-sanitizer'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeUrls from 'rehype-urls'
import remarkGfm from 'remark-gfm'
import unwrapImages from 'remark-unwrap-images'

import components from '@/components/mdx/components'
import { mdxImgResolver } from '@/utils/mdx-image-resolver'

const logging = new Logging({ component: 'mdx.js' })

// TODO: sub for inline error
const fallbackComponent = (node) => `<UnknownComponent name="${node.name}"/>`

const getScriptReplacementSrc = (node) => {
  let content = ''
  const getChildrenContent = (nodeItem) => {
    nodeItem.children?.forEach((child) => {
      if (child.value) {
        content += '  ' + child.value.replaceAll('\n', '\n  ') + '\n'
      } else {
        getChildrenContent(child)
      }
    })
  }

  getChildrenContent(node)

  // remove last newline
  content = content.slice(0, -1)
  const scriptString =
    '```\n' + '<script>\n  ' + content.replaceAll('\n', '\n  ') + '\n</script>' + '\n```'
  // TODO: sub for inline error
  return `
  <div style={{marginTop: '60px'}}><strong>Script tag identified</strong></div>
  <div>For security concerns, script tags are not allowed and should be removed. Remove script referenced below </div>
  ${scriptString}
  `
}

const replacementMapper = {
  script: getScriptReplacementSrc
}

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

  return serialize(usageFileSource, {
    mdxOptions: {
      remarkPlugins: [
        [
          mdxSanitizerPlugin,
          {
            customComponentKeys: Object.keys(components),
            fallbackComponent,
            allowImports: false,
            allowExports: false,
            stripHTMLComments: true,
            tagReplacements: replacementMapper
          }
        ],
        remarkGfm,
        unwrapImages
      ],
      rehypePlugins: [[rehypeUrls, mdxImgResolver.bind(null, dirPath)]]
    },
    parseFrontmatter: true
  }).catch(async (err) => {
    switch (true) {
      case err.message.includes('Import statement found'): {
        // take just the source code part of the error
        const content = err.message.substring(
          err.message.indexOf('Import statement found') + 22,
          err.message.length
        )

        throw new ImportFoundException(content, null)
      }
      case err.message.includes('Export statement found'): {
        // take just the source code part of the error
        const content = err.message.substring(
          err.message.indexOf('Export statement found') + 22,
          err.message.length
        )

        throw new ExportFoundException(content, null)
      }
      default: // returning this for now so our app doesn't blow up in case mdx is not valid
        logging.error(err)
        throw err
    }
  })
}
