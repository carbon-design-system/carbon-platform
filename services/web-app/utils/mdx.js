/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import { MdxProcessor } from '@carbon-platform/mdx-processor'
import { mdxSanitizerPlugin } from '@carbon-platform/mdx-sanitizer'
import { VFile } from 'vfile'

import components from '@/components/mdx/components'
import { HTMLTags } from '@/data/html-tags'
import { getRemoteMdxSource } from '@/lib/github'
import { mdxUrlResolver } from '@/utils/mdx-url-resolver'

// TODO: link out to components storybook
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
    allowedTags: HTMLTags,
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

/**
 * Retrieves the remote mdx source content, processes it
 * and converts it into an object containing HTML value
 * @param {import('../typedefs').Params} params
 * @param {string} url
 * @returns {Promise<import('../typedefs').RemoteMdxSource>}
 * mdxSource or empty object
 */
export async function getProcessedMdxSource(params, url) {
  let processedMdx = {}
  let mdxSource
  let pageUrl
  try {
    const response = await getRemoteMdxSource(params, url)
    mdxSource = response.mdxSource
    pageUrl = response.url

    processedMdx = await processMdxSource(mdxSource, pageUrl)
  } catch (err) {
    processedMdx.mdxError = {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  }

  return processedMdx
}
