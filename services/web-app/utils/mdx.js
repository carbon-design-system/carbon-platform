/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import { MdxProcessor } from '@carbon-platform/mdx-processor'
import {
  ExportFoundException,
  ImportFoundException,
  mdxSanitizerPlugin
} from '@carbon-platform/mdx-sanitizer'
import { evaluate } from '@mdx-js/mdx'
import * as matter from 'gray-matter'
import * as runtime from 'react/jsx-runtime.js'
import * as ReactDOMServer from 'react-dom/server'
import rehypeUrls from 'rehype-urls'
import remarkGfm from 'remark-gfm'
import unwrapImages from 'remark-unwrap-images'
import { VFile } from 'vfile'

// this is bombing out
// import { matter } from 'vfile-matter'
import components from '@/components/mdx/components'
import { getRemoteMdxSource } from '@/lib/github'
import { mdxUrlResolver } from '@/utils/mdx-url-resolver'

const logging = new Logging({ component: 'mdx.js' })

class ContentRenderException extends Error {}

const fallbackComponent = (node) => `<InlineError
title="\`${node.name}\` not recognized"
description="This component is not supported or there is a typo. Please update to a supported component or review any mistakes.
It is referenced in your code at \`13:1-13:23\`"
link="Supported components" href="/TODO" />`

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
  return `
  <InlineError title="Script tag identified"
  description="For security concerns, script tags are not allowed and should be removed. Remove script referenced below"/>
  ${scriptString}
  `
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
  const pageWarnings = []
  const fileSource = Buffer.from(response.content, response.encoding).toString()

  // the path to where the mdx file is located on github
  const dirPath = response._links.html.split('/').slice(0, -1).join('/')

  const fileContent = matter(fileSource)

  const replacementMapper = {
    script: (node) => {
      pageWarnings.push('Script tag identified')
      return getScriptReplacementSrc(node)
    }
  }

  const MdxContentComponent = (
    await evaluate(fileContent.content, {
      ...runtime,
      remarkPlugins: [
        [
          mdxSanitizerPlugin,
          {
            customComponentKeys: Object.keys(components),
            fallbackComponent: (node) => {
              pageWarnings.push(`Unknown Component identified: ${node.name}`)
              return fallbackComponent(node)
            },
            allowImports: false,
            allowExports: false,
            stripHTMLComments: true,
            tagReplacements: replacementMapper
          }
        ],
        remarkGfm,
        unwrapImages
      ],
      rehypePlugins: [[rehypeUrls, mdxUrlResolver.bind(null, dirPath)]]
    })
  ).default

  let htmlContent
  try {
    htmlContent = ReactDOMServer.renderToString(new MdxContentComponent({ components }))
  } catch (err) {
    logging.error(err)
    throw new ContentRenderException(err.message)
  }

  return {
    source: { compiledSource: htmlContent, frontmatter: fileContent.data },
    warnings: pageWarnings
  }
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

  const { source, warnings } = await parseMdxResponseContent(mdxSrc).catch((err) => {
    mdxError = { ...err }
    switch (true) {
      case err instanceof ImportFoundException:
        mdxError.type = 'ImportFoundException'
        break
      case err instanceof ExportFoundException:
        mdxError.type = 'ExportFoundException'
        break
      case err instanceof ContentRenderException:
        mdxError.type = 'ContentRenderException'
        break
      default:
        mdxError.type = 'MdxParseException'
    }
  })

  return {
    props: {
      source: source ?? null,
      mdxError: mdxError ?? null,
      warnings
    }
  }
}

export async function processMdxSource(mdxSource, url) {
  const warnings = []

  const replacementMapper = {
    script: (node) => {
      return getScriptReplacementSrc(node)
    }
  }

  let compiledSource = null
  let mdxError = null

  const f = new VFile({ value: mdxSource, path: url })
  const processor = new MdxProcessor({
    sanitizerPlugin: mdxSanitizerPlugin,
    imageResolverPlugin: mdxUrlResolver.bind(null, url),
    components,
    fallbackComponent,
    tagReplacements: replacementMapper,
    logger: new Logging({ component: 'mdx-processor' }),
    onError: (err) => {
      warnings.push({
        name: err.name || null,
        message: err.message || null,
        stack: err.stack || null,
        position: err.position || null
      })
    }
  })

  try {
    compiledSource = await processor.process(f)
  } catch (err) {
    // Use null so these can be serialized to JSON
    mdxError = {
      name: err.name || null,
      message: err.message || null,
      stack: err.stack || null,
      position: err.position || null
    }
  }

  return {
    compiledSource,
    mdxError,
    warnings
  }
}
