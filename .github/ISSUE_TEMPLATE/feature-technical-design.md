---
name: Feature technical design
about: A detailed technical breakdown of a feature.
title: ''
labels: 'role: dev 🤖, type: tech design 🏗️'
assignees: ''
---

# Feature technical design

## Summary

Describe the new feature from a technical perspective.

Describe the problem solved by this feature.

Describe how it integrates/relates/communicates with existing features/packages/services.

## Research

- [ ] Approved?

- **Unanswered questions**
  - List any unknowns and unanswered questions that need answers prior to beginning development
- **New technologies**
  - List new technologies that need to be explored in detail before beginning development
- **Proofs of concept**
  - List proofs of concept that need to be completed before beginning development

## UI/UX design

- [ ] Approved?

Does this feature have any associated UI/UX? If so, describe any design that needs to be
completed/red-lined prior to development.

## APIs

- [ ] Approved?

- **Programmatic APIs**
  - List any APIs that will be developed and made available in the `@carbon-platform/api` package,
    including function/class/method names, parameters, and return values.
- **Data graph**
  - List any new query resolvers and/or data models being included in the data-graph and/or data-graph API package.
- **Messages**
  - List any new/changed RabbitMQ messages introduced by this feature, the message payload structure
    associated with them, whether they are queries or emits, and their expected return values (for
    queries).

## Test strategy

- [ ] Approved?

How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
etc.)

What interesting edge cases should be considered and tested?

## Security

- [ ] Approved?

What new data is created/stored/collected/transmitted by this feature? How is that data secured? Who
is allowed to access it? How is that access controlled?

Think like a hacker. How might someone attempt to break or abuse this feature?

## Error handling

Ignore the happy path. What can go wrong with this feature? How will the error conditions manifest
through the APIs? How will users be informed about these errors?

## Logging

- [ ] Approved?

Detail any FFDC data (info, warning, error, debug logs) to be captured by this feature.

## File and code layout

- [ ] Approved?

Describe how the files and code for this feature will fit into the rest of the mono repo. Will there
be a new package/service? Are there existing files/directories in which the new logic should live?

## Issue and work breakdown

- [ ] Approved?

List any issues that should be created prior to starting work on this feature

- **Epics**
  - ...
- **Issues**
  - ...
