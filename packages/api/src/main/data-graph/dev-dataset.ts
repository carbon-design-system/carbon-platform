/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs'
import { OperationDefinitionNode, parse } from 'graphql'
import path from 'path'

import { DuplicateQueryException } from './exceptions/duplicate-query-exception.js'
import { DataGraphMessage, DevDatasetEntry, DevDatasetJson } from './interfaces.js'

const DATASET_SRC_DIR = path.join(process.cwd(), 'src', 'dev', 'data-graph')

class DevDataset {
  private readonly db: Array<DevDatasetEntry>
  private readonly dynamicDb: Array<DevDatasetEntry>

  constructor() {
    this.db = []
    this.dynamicDb = []
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

  private add(...queryEntries: Array<DevDatasetEntry>) {
    queryEntries.forEach(this.singleAdd.bind(this))
  }

  public addDynamic(...queryEntries: Array<DevDatasetEntry>) {
    this.add(...queryEntries)
    this.dynamicDb.push(...queryEntries)
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

  public reload() {
    const entries = fs.readdirSync(DATASET_SRC_DIR)

    // Clear existing db
    this.db.splice(0, this.db.length)

    // Add file-based datasets
    for (const entry of entries) {
      // Ignore schema files
      if (entry.endsWith('.schema.json')) {
        continue
      }

      const fileContents = fs.readFileSync(path.join(DATASET_SRC_DIR, entry))
      const json = JSON.parse(fileContents.toString()) as DevDatasetJson

      this.add(...json.queries)
    }

    // Add dynamic datasets
    this.add(...this.dynamicDb)
  }
}

export { DevDataset }
