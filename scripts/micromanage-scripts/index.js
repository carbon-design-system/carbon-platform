const { Command } = require('commander')

const { buildAddCommand } = require('./add')
const { buildLinkCommand } = require('./link')
const { buildPublishCommand } = require('./publish')
const { buildVersionCommand } = require('./version')

function main() {
  const program = new Command()
    .addCommand(buildAddCommand())
    .addCommand(buildLinkCommand())
    .addCommand(buildPublishCommand())
    .addCommand(buildVersionCommand())

  try {
    program.parse();
  } catch (err) {
    console.error(err);
  }
}

main()
