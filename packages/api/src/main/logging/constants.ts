/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getEnvVar, Runtime } from '../runtime/index.js'

const runtime = new Runtime()

/**
 * The name of the service used during logging.
 */
const CARBON_SERVICE_NAME = getEnvVar(runtime, 'CARBON_SERVICE_NAME', 'local-dev')

export { CARBON_SERVICE_NAME }
