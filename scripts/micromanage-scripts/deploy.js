/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { Command } = require('commander')
// const path = require('path')
const { utils } = require('stylelint')

// const { getPackages, exec } = require('./utils')

// details on only running the action when a specific file changes:
// https://github.community/t/is-it-possible-to-run-the-job-only-when-a-specific-file-changes/115484

function buildDeployCommand() {
  return new Command('deploy')
    .description('Deploy all services to CloudFoundry')
    .action(handleDeployCommand)
}

function handleDeployCommand() {
  console.log('===== micromanage deploy =====')

  const deployedServices = require('./deployed-services.json')

  const changedServices = getChangedServices(deployedServices)

  // for each service to be deployed
  changedServices.forEach((changedService) => {
    deployService(changedService)
  })
}

function getChangedServices(deployedServices) {
  console.log(deployedServices)
  // do a cf lookup for each service and compare
  // go through each key in (for now) the prod block's services
  //    get current deployed version of service (manifest label) ,
  //    `cf labels RESOURCE RESOURCE-NAME` (and then some parsing of that or something)
  //    compare against tag in current deployed-services.json
  // come up with the list of things that actually need to be redeployed
}

function deployService(changedService) {
  console.log(changedService)
  const theTag = '???'
  //    checkout the git tag that we are deploying (switch branch to the target)
  utils.exec(`git switch ${theTag}`)

  //    ?? figure out if we need to copy over the package-lock to the service we're trying to deploy
  //       if we let cloudfoundry do the build, then we do need to copy this over.
  // utils.exec('cp') OR node to copy the file

  /*
  - copy package lock to workspace
  - install node modules (npm install)
  - run build
  - deploy to cloud foundry (only the build output and package.json and package-lock.json)
  - cloud foundry receives that
  - it runs npm install
  - it does docker stuff
  - it deploys it and runs `npm run start`
  */

  //     run appropriate workspace "install" and/or "build" commands for each
  //     cd to the right place
  //     if everything looks good, deploy it using ibmcloud cli
  //     Set up a new version, which is the current tag we're working on. We can get this from the
  //     package.json file of the app or from git, whichever is easier, or deployed-services.json
  //     `cf set-label RESOURCE RESOURCE-NAME KEY=VALUE`
}

module.exports = {
  buildDeployCommand
}
