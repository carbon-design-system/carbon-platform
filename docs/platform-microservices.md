# Platform microservices

## API Package

The `microservice` API package provides the following set of tools and utilities.

### `PlatformMicroservice` class

A class that provides APIs for establishing a microservice on the Carbon Platform and its messaging
infrastructure.

It has the following APIs:

#### `constructor(config: MicroserviceConfig)`

Instantiates a new microservice with the
[provided configuration](/packages/api/src/main/microservice/platform-microservice.ts).

#### `PlatformMicroservice#bind<T extends BindableMessage>(...messageTypes: [BindableMessageKey<T>, ...Array<BindableMessageKey<T>>])`

Binds a microservice's queue to one or more message types, allowing it to listen for and receive
messages of those types.

#### `PlatformMicroservice#start(): Promise<any>`

Starts the service listening for incoming messages and REST API requests. The promise returned by
this method does not resolve so long as the service continues running.

### Exceptions

#### `InvalidInputException`

Exception indicating that the input provided to a messaging handler did not pass input validation.
Typically the first step in a message handler is something like this:

```ts
@Trace()
@EventPattern('log_logged')
public logLogged(@Payload() data: UnvalidatedMessage) {
  // Throws InvalidInputException if data is not a valid `LogLoggedMessage`
  const logMessage: LogLoggedMessage = validateLogMessage(data)

  // ...
}
```

### REST endpoints

#### `StatusController`

A NestJS module that defines the `/liveness` and `/readiness` APIs used to query the current status
of the service.

## Creating a microservice

Here's the steps you need to do to create a new microservice on the Carbon Platform.

1. Define the service package/workspace. The logging service is often a good one to copy as a
   baseline.
2. Define the programmatic APIs the service will provide and include them as a sub-folder in the API
   package.
   - Add an `exports` directive to the API package's `package.json`, if needed.
3. Define a queue name in the [interfaces.ts](/packages/api/src/main/messaging/interfaces.ts) file.
4. If the service handles new message or query types, define them in the
   [interfaces.ts](/packages/api/src/main/messaging/interfaces.ts) file.
   - The input/output message formats should be defined in the corresponding sub-folder in the API
     package.
5. Create a `Dockerfile` and `esbuild.js` file specific to the new service.
6. Add an entry to the services matrix in the [nightly workflow](/.github/workflows/nightly.yml) for
   the new service.
7. Add docs!
8. Add tests!
9. Add an entry to [.commitlintrc.js](/.commitlintrc.js) for the new service's name.
10. TODO: docs for how to deploy the app
