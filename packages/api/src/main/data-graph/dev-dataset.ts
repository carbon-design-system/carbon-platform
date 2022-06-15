/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs'
import { OperationDefinitionNode, parse } from 'graphql'
import path from 'path'
import { fileURLToPath } from 'url'

import { DuplicateQueryException } from './exceptions/duplicate-query-exception.js'
import { DataGraphMessage, DevDatasetEntry, DevDatasetJson } from './interfaces.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class DevDataset {
  private readonly db: Array<DevDatasetEntry>

  constructor() {
    this.db = []
  }

  private singleAdd(queryEntry: DevDatasetEntry) {
    this.validateNewQueryName(queryEntry.name)
    this.db.push(queryEntry)
  }

  private validateNewQueryName(queryName: string) {
    const existingEntry = this.db.find((queryEntry) => queryEntry.name === queryName)

    if (existingEntry) {
      throw new DuplicateQueryException(existingEntry.name)
    }
  }

  public add(...queryEntries: Array<DevDatasetEntry>) {
    queryEntries.forEach(this.singleAdd.bind(this))
  }

  public get(queryInput: DataGraphMessage): DevDatasetEntry['response'] | undefined {
    const parsedQuery = parse(queryInput.query, { noLocation: true })

    const queryName = (parsedQuery.definitions[0] as OperationDefinitionNode).name?.value

    return this.db.find((entry) => {
      return (
        entry.name === queryName &&
        JSON.stringify(queryInput.variables) === JSON.stringify(entry.variables)
      )
    })?.response
  }

  public initialize() {
    const dir = path.join(__dirname, '..', '..', 'dev', 'data-graph')
    const entries = fs.readdirSync(dir)

    for (const entry of entries) {
      // Ignore schema files
      if (entry.endsWith('.schema.json')) {
        continue
      }

      const fileContents = fs.readFileSync(path.join(dir, entry))
      const json = JSON.parse(fileContents.toString()) as DevDatasetJson

      this.add(...json.queries)
    }
  }
}

export { DevDataset }
