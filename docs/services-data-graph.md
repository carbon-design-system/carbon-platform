# Data-Graph service

## Service

The data-graph service provides a GraphQL endpoint accessible via both REST HTTP calls and RabbitMQ
messaging. It provides access to all of the disparate data sources across the platform.

The REST API provides an endpoint at `/graphql` which services queries.

The service also listens for messages from the message broker of type `QueryMessage.data_graph` and
responds with a query result in the same way as the REST API.

The combination of these two mechanisms allows for both internal and external queries to the
service.

### Querying via messaging

```ts
const dataGraph = new DataGraph()

const response = await dataGraph.queryData({
  query: gql`
    ...
  `
  variables: {
    ...
  }
})

if (response.errors) {
  // Perform error handling
}

const data = response.data
```

### Querying via REST API

> **Note:** The URL in the example below is an example of what might be used in a production
> environment.

```ts
const response = await fetch('https://next.carbondesignsystem.com/graphql', {
  method: 'post',
  body: JSON.stringify({
    query: gql`
      ...
    `,
    variables: {
      ...
    }
  }),
  headers: {'Content-Type': 'application/json'}
})

const responseJson = await response.json()

if (responseJson.errors) {
  // Perform error handling
}

const data = responseJson.data
```

### Viewing the GraphQL playground in a local dev environment

To view and query the data graph via its REST endpoint in a local environment, do the following:

1. Start up [rabbitmq](./docker.md#docker-run-command-for-rabbitmq-messaging) locally
2. Start up the data-graph service `npm -w services/data-graph run start:dev`
3. Navigate to http://localhost:3000/graphql
4. Enter queries on the left hand side.

### Example GraphQL query

```gql
query {
  users {
    id
  }
}
```

## Package APIs

### `` gql`...` ``

A tagged template literal that can be used when building up GraphQL queries. It will provide full
auto-complete of the data-graph schema. It returns a minified version of the input string.

### `DataGraph`

An instantiable class that provides a utility method for querying the data-graph called `queryData`.
This mehtod is generic and accepts a type argument corresponding to the return type of the query.

**Note:** It is left up to the caller to ensure that the type/contents of the return data matches
the specified type argument and to convert any returned data to model objects for use elsewhere in
the rest of the code.

The DataGraph class also provides a method for adding a dev dataset
(`addDevDataset(dataset: Array<DevDatasetEntry>)`) which can then be used in Dev RunMode to obtain
static data for the provided query

### `DataGraphMessage`

A type representing a query being sent to the data-graph service.

### `DataGraphResponse`

A type representing a response from the data-graph service.

### Models and Inputs

The data-graph service exports a comprehensive set of models representing the various objects that
exist on the graph. It also exports a set of "Input" classes which act as the input types to
mutations.

## Testing

In Standard RunMode, The DataGraph `queryData` method will send a `QueryMessage.data_graph` message
to the message broker in order to retrieve "real" data from the graph.

In Dev RunMode, all querying happens locally via the "Dev Dataset". This is a
[collection of JSON files](/packages/api/src/dev/data-graph/) containing mappings of query names
(and associated variables) to response objects.

This is useful because in Dev mode, each "real" query can map to a statically-defined result object
in the Dev Dataset. This makes it possible to build a static export of any service that uses the
data-graph (like the `web-app`) because in Dev mode, the data for a particular query never changes
across queries.

An example Dev Dataset file is available [here](/packages/api/src/dev/data-graph/example.json).

The JSON schema that governs the Dev Dataset files is available here
[here](/packages/api/src/dev/data-graph/dev-dataset.schema.json).
