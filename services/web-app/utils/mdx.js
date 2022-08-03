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
import { evaluate } from '@mdx-js/mdx'
import * as matter from 'gray-matter'
import * as runtime from 'react/jsx-runtime.js'
import * as ReactDOMServer from 'react-dom/server'
import rehypeUrls from 'rehype-urls'
import remarkGfm from 'remark-gfm'
import unwrapImages from 'remark-unwrap-images'

import components from '@/components/mdx/components'
import { getRemoteMdxSource } from '@/lib/github'
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

/**
 * Sanitizes and serializes MDX source from a given string so that it can be rendered
 *
 * @param {Promise<import('../typedefs').GitHubContentResponse} response
 * MDX response previously retrieved from Github
 * @returns {Promise<import('../typedefs').RemoteMdxResponse>} parsed mdx
 * @throws {ImportFoundException}
 * @throws {ExportFoundException}
 * @throws {Error}
 */
const parseMdxResponseContent = async (response) => {
  const fileSource = Buffer.from(response.content, response.encoding).toString()

  // the path to where the mdx file is located on github
  const dirPath = response._links.html.split('/').slice(0, -1).join('/')

  const fileContent = matter(fileSource)

  const MdxContentComponent = (
    await evaluate(fileContent.content, {
      ...runtime,
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
    })
  ).default

  let htmlContent
  try {
    htmlContent = ReactDOMServer.renderToString(new MdxContentComponent({ components }))
  } catch (err) {
    logging.error(err)
    throw err
  }

  return { compiledSource: htmlContent, frontmatter: fileContent.data }
}
/**
 * Common util function to get the staticProps for a remote mdx page
 *
 * @param {Promise<import('../typedefs').Params} params
 * MDX response previously retrieved from Github
 * @returns {Promise<{
 * mdxError: {type: string, ...},
 * source: import('../typedefs').RemoteMdxResponse }>} static props
 */
export const getRemoteMdxPageStaticProps = async (params, src) => {
  let mdxError
  const mdxSrc = await getRemoteMdxSource(params, src)

  if (!mdxSrc?.content) {
    return {
      props: {
        mdxError: {
          type: 'ContentNotFoundException'
        }
      }
    }
  }

  const mdxSource = await parseMdxResponseContent(mdxSrc).catch((err) => {
    mdxError = { ...err }
    switch (true) {
      case err instanceof ImportFoundException:
        mdxError.type = 'ImportFoundException'
        break
      case err instanceof ExportFoundException:
        mdxError.type = 'ExportFoundException'
        break
      default:
        mdxError.type = 'Error'
    }
  })

  return {
    props: {
      source: mdxSource ?? null,
      mdxError: mdxError ?? null
    }
  }
}
