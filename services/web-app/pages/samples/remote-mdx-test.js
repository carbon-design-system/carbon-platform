/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from '@carbon/react'
import {
  ExportFoundException,
  ImportFoundException
} from '@carbon-platform/mdx-sanitizer/dist/main/index'
import { NextSeo } from 'next-seo'

import H1 from '@/components/markdown/h1'
import H2 from '@/components/markdown/h2'
import RemoteMdxLoader from '@/components/remote-mdx-loader'
import { getRemoteMdxSource } from '@/lib/github'
import { parseMdxResponseContent } from '@/utils/mdx'

const getMdxErrorDisplay = (mdxError) => {
  switch (true) {
    case mdxError.type === 'ImportFoundException' || mdxError.type === 'ExportFoundException':
      // TODO: sub for full page error
      return (
        <>
          <H1>{"Something's gone wrong"}</H1>
          <H2>{`${
            mdxError.type === 'ExportFoundException' ? 'Export' : 'Import'
          } statement identified`}</H2>
          <div>
            For security concerns, import and export statements are not allowed and should be
            removed
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {/* TODO: There is still a space off here */}
            {mdxError.value}
          </div>
        </>
      )
    case mdxError.type === 'ContentNotFoundException':
      // TODO: sub for full page error
      return (
        <>
          <H1>The page you are looking for cannot be found.</H1>
          <div>Supplied Github route does not exist. Update to a valid route.</div>
          <Link>See common errors for further information on valid urls</Link>
        </>
      )
    default:
      return (
        // TODO: sub for inline error
        <div>{mdxError.message}</div>
      )
  }
}

const RemoteMdxTest = ({ source, mdxError }) => {
  const seo = {
    title: 'Remote Mdx'
  }

  return (
    <>
      <NextSeo {...seo} />

      {mdxError && getMdxErrorDisplay(mdxError)}
      {source && <RemoteMdxLoader source={source} />}
    </>
  )
}

export const getStaticProps = async () => {
  let mdxError
  const mdxStringSrc = await getRemoteMdxSource(
    {
      host: 'github.com',
      org: 'francinelucca',
      repo: 'mdx-testing',
      library: 'carbon-website',
      ref: 'main'
    },
    '/with-exports2.mdx'
  )

  if (!mdxStringSrc) {
    return {
      props: {
        mdxError: {
          type: 'ContentNotFoundException'
        }
      }
    }
  }

  const mdxSource = await parseMdxResponseContent(mdxStringSrc).catch((err) => {
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

export default RemoteMdxTest
