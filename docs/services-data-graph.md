# Data-Graph service

### Service

The data-graph service provides a GraphQL endpoint accessible via both REST HTTP calls and RabbitMQ
messaging. It provides access to all of the disparate data sources across the platform.

The REST API provides an endpoint at `/graphql` which services queries.

The service also listens for messages from the message broker of type `QueryMessage.data_graph` and
responds with a query result in the same way as the REST API.

The combination of these two mechanisms allows for both internal and external queries to the
service.

### Querying via messaging

```ts
const messaging = MessagingClient.getInstance()

const response = await messaging.query('data_graph', {
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

> **Note:** This is for a direct query to the data graph service, which differs from what a UI
> client might do via the web-app.

```ts
const response = await fetch('https://localhost:3000/graphql', {
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

## Package APIs

TODO: Dev mode testing considerations once implemented

### `` gql`...` ``

A tagged template literal that can be used when building up GraphQL queries. It will provide full
auto-complete of the data-graph schema. It returns a minified version of the input string.

### `DataGraphMessage`

A type representing a query being sent to the data-graph service.

### `DataGraphResponse`

A type representing a response from the data-graph service.

### Models and Inputs

The data-graph service exports a comprehensive set of models representing the various objects that
exist on the graph. It also exports a set of "Input" classes which act as the input types to
mutations.
