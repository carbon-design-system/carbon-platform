/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Trace } from '@carbon-platform/api/logging'
import { Injectable } from '@nestjs/common'
import { parse } from 'node-html-parser'
import Parser from 'rss-parser'

/**
 * An injectable service that retrieves mediumPosts, parses them and returns them
 */
@Injectable()
class MediumService {
  private readonly parser: Parser

  constructor() {
    this.parser = new Parser()
  }

  /**
   * Logs the provided log entry on the LogDNA server.
   *
   * **NOTE:** In "Dev" run-mode, this is effectively a no-op.
   *
   */
  @Trace()
  public async getMediumPosts() {
    const mediumArticles = await this.parser.parseURL('https://medium.com/feed/carbondesign')
    mediumArticles.items.forEach(async (item) => {
      item.thumbnail = parse(item?.['content:encoded'])?.querySelector('img')?.getAttribute('src')
      item.date = new Date(item.pubDate || 0).getTime()
    })
    return mediumArticles
  }
}

export { MediumService }
