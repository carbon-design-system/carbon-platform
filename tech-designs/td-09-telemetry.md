# td-09 - Telemetry

**Status:** Draft 📝

<!--
Draft 📝
Approved ✅
Canceled 🚫
-->

## Summary

This feature describes a telemetry package and microservice capable of ingesting data from Carbon
library users and transmitting that data to a remote server for anonymous storage.

Having telemetry data for Carbon libaries helps guide decision making for maintainers, contributors
and users by giving them granular data about usage and usage patterns off of which to base decisions
for future endeavors.

This feature will supersede the existing `@carbon/telemetry` package and server. The package will be
replaced with a new one called `@carbon/transistor` (name TBD). The existing server's GraphQL
endpoint will be integrated into the Carbon Platform's `data-graph` service. Exact query and
database structures are TBD.

**Assumptions**

The `@carbon/transistor` package bears the responsibility of collecting "novel metrics". These are
defined as metrics whose data cannot be queried from any external service. In order to deliver on
"novel metrics" some amount of data must be captured and stored over time.

**Out of scope**

This feature does not define the ways in which telemetry data is analyzed or manifested on any UI.

## Research

- [ ] Approved?

**Unanswered questions**

> List any unknowns and unanswered questions that need answers prior to beginning development. Note
> that **all** of these questions should be answered prior to approving the Research section.

**New technologies**

- [OpenTelemetry](https://opentelemetry.io/)
- [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [TimescaleDB](https://www.timescale.com/)
- [Segment](https://segment.com/)
- [react-scanner](https://github.com/moroshko/react-scanner)
- [TypeScript compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)

See
[the mural](https://app.mural.co/t/ibm14/m/ibm14/1681935201488/aa3bc85b42a7a96f6722aca7fa7b24fd7e0a0078)
for a detailed list of research investigations

**Proofs of concept**

> List proofs of concept that need to be completed before beginning development.

## UI/UX design

- [ ] Approved?

> Does this feature have any associated UI/UX? If so, describe any design that needs to be
> completed/red-lined prior to development.

## APIs

- [ ] Approved?

**Programmatic APIs**

> List any APIs that will be developed and made available in the `@carbon-platform/api` package,
> including function/class/method names, parameters, and return values. If this tech design
> describes a new monorepo package, detail the APIs and exports of that package.

**Data graph**

> List any new query resolvers and/or data models being included in the data-graph and/or data-graph
> API package.

**Messages**

> List any new/changed RabbitMQ messages introduced by this feature, the message payload structure
> associated with them, whether they are queries or emits, and their expected return values (for
> queries).

## Security

- [ ] Approved?

> What new data is created/stored/collected/transmitted by this feature? How is that data secured?
> Who is allowed to access it? How is that access controlled? Think like a hacker. How might someone
> attempt to break or abuse this feature?

## Error handling

- [ ] Approved?

> Ignore the happy path. What can go wrong with this feature? How will the error conditions manifest
> through the APIs? How will users be informed about these errors?

## Test strategy

- [ ] Approved?

> How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
> etc.) What interesting edge cases should be considered and tested?

## Logging

- [ ] Approved?

> Detail any FFDC data (info, warning, error, debug logs) to be captured by this feature. Pretend
> you're on-call for supporting the Platform. In the event something breaks and all you have to go
> by is a list of log entries (i.e. you can't reproduce the failure yourself, but users are
> reporting problems), what information would you need to be able to pinpoint the source of a
> production-site failure? Additional info: [Logging service](/docs/services-logging.md)

## File and code layout

- [ ] Approved?

> Describe how the files and code for this feature will fit into the rest of the mono repo. Will
> there be a new package/service? Are there existing files/directories in which the new logic should
> live?

## Issue and work breakdown

- [ ] Approved?

> List any issues that should be created prior to starting work on this feature.

**Epics**

- [ ]

**Issues**

- [ ]
