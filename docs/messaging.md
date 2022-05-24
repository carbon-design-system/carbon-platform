# Messaging

The Carbon Platform is broken up into microservices that each specialize in one type of workflow.
These microservices can communicate with each other by using a message broker, specifically RabbitMQ
using the AMQP 0.9.1 communication protocol.

This takes the place of what would historically be REST API endpoints defined and running on each
microservice. By using a message broker instead, the burden of maintaining a server, managing HTTP
requests, defining REST API documentation, rate limiting requests, etc. is removed from each service
and instead placed on the RabbitMQ server.

One of the main differences between broker-based messaging and REST APIs is that all messaging
performed through a message broker is asynchronous. Messages can be sent _**and processed**_ at any
point by any of the services that are connected to the message broker. This means that there is
never a guarantee of an immediate reply, or a reply at all (in the case where a service is down or
overwhelmed). Services should be written in such a way that they can tolerate messages that may not
arrive for long periods of time, or never at all.

The advantage of using a fully asynchronous model is that two services need to know very little
about each other in order to effectively exchange data and communicate back and forth. A service
does not need to know the address of any other service; it only needs to know what type of message
to send to the broker to elicit the desired response. Services are also written (out of necessity)
in a way in which they can tolerate long outages of services on which they "depend".

## The Basics

Conceptually, you can think of the services as being able to talk directly to each other in one of
two ways: one-to-many and one-to-one. The lower-level code needed to accomplish these two types of
communication are abstracted away into a class called the `MessagingClient`. The `MessagingClient`
provides an `emit` method as a one-to-many communication mechanism and a `query` method as a
one-to-one communication mechanism.

## `emit<EventType extends keyof EventMessage>(eventType: EventType, payload: EventMessage[EventType]['payload']): Promise<void>`

The `emit` method is basically a "broadcast" of the message to all other services connected to the
message broker. Though emitted messages are available to all other services, only ones that have
expressed interest in getting a given type of message will actually receive it. The act of
"expressing interest" in a message type is called "binding". More details about binding can be found
in [Listening for Messages](#listening-for-messages).

`emit` takes as arguments a type of message to send and the actual message itself.

> **Note:** Emitted messages are "events" that have happened; things like "user logged in" or "log
> message was logged".

Most of the time, there is no need to wait for `emit` calls to resolve, since there won't be any
response coming back, but if you want to guarantee that the message was accepted by the message
broker, you can `await` the `emit` call and get confirmation.

## `query<Type extends keyof QueryMessage>(queryType: Type, payload: QueryMessage[Type]['payload']): Promise<QueryMessage[Type]['response']>`

The `query` method is similar to a traditional REST API request such as a `GET` or `POST`, except
that it is fully asynchronous. Just like `emit`, all services get a copy of the message, but the
`MessagingClient` makes the assumption that one and only one service will be "bound" to a particular
query type. This ensures that at most, a client will get back one response from a service after
sending a query.

The `query` method returns a promise of a response, but there is no _guarantee_ that this promise
will ever be fulfilled by another service. The message broker will hold onto the message until a
service _does_ respond, but services issuing a `query` should write their code under the assumption
that someone might respond immediately **or** never at all. In practice, this means implementing
things like skeletons, loading spinners, and React "effects" as opposed to relying on data being
available at first render.

## Listening for Messages

Microservices in the Carbon Platform project that listen for incoming messages of particular types
from the message broker use the server-side framework [NestJS](https://nestjs.com/). The base
functionality needed to listen for messages is wrapped up in a class called
[PlatformMicroservice](/packages/api/src/main/microservice/platform-microservice.ts). This is a
wrapper around some boilerplate NestJS calls that have the net result of set up a microservice
server to listen for RabbitMQ messages. A basic setup looks like this:

```ts
// index.ts

import { EventMessage, Queue } from '@carbon-platform/api/messaging'
import { PlatformMicroservice } from '@carbon-platform/api/microservice'

import { MyServiceModule } from './my-service-module'

async function start() {
  const pm = new PlatformMicroservice({
    queue: Queue.MyService,
    module: MyServiceModule
  })

  pm.bind<EventMessage>('log_logged', 'some_other_event', ...)

  await pm.start()
}

start()
```

Here's a brief breakdown of the pieces:

### `MyServiceModule`

A [NestJS module](https://docs.nestjs.com/modules). The module also internally defines the set of
[controllers](https://docs.nestjs.com/controllers) and
[services/providers](https://docs.nestjs.com/providers).

### `new PlatformMicroservice({...`

A platform microservice takes a queue name and a NestJS module as required arguments, along with
some optional configuration settings. The queue name comes from the global registry defined in the
API package's `messaging` export.

### `pm.bind(...)`

This tells the message broker that you'd like your service to receive messages of the given type.
Once bound and the service started, the app's "controllers" will begin getting messages of these
types from the broker.

### `pm.start()`

This is a wrapper around some NestJS calls that start up the microservice and begin listening for
incoming messages. This will also handle reconnecting to the message broker in the event of an
outage.

### Example Controller

```ts
import { EventMessage } from '@carbon-platform/api/messaging'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { PlatformController } from './common/platform.controller'

@Controller()
class MyCoolController extends PlatformController {
  @EventPattern(EventMessage.UserLoggedIn)
  public async userLoggedIn(@Payload() data: UserLoggedInMessage) {
    console.log(`Wow! user ${data.userName} logged in!`)
  }
}

export { MyCoolController }
```

## The Details

Communication to the message broker is accomplished through the use of three main concepts: Queues,
Exchanges, and Binding.

### Queues

A queue is an ordered FIFO list of messages awaiting processing by a consumer or service. In the
Carbon Platform project, each microservice gets its own named queue from which to consume messages.
Since there is one queue per service, this means that, for example, a cluster of "search" service
nodes can all connect to the same queue and load balance incoming messages amongst them.

### Exchanges

An exchange is a conduit between message senders and queues. Each message that enters an exchange
will be sent to one or more queues. In the Carbon Platform project, every type of message
(`EventMessage`s and `QueryMessage`s) gets its own named exchange and all messages are sent to
exchanges rather than directly to queues. In addition, all messages in the Carbon Platform project
are "fanned out" from their exchange to all queues to which they are bound.

### Binding

Binding is the act of associating an exchange with a queue. This is useful as a way to specify which
queues (and therefore which services) are interested in certain types of messages. When a Carbon
Platform microservice starts up, it binds its queue to one or more exchanges, effectively opening
the door that allows those types of messages to start piling up in its queue.

### Message Format

All RabbitMQ messages sent through the Carbon Platform are in JSON format. By default, there are no
restrictions or requirements on the contents of messages. NestJS adds a small amount of "required
stuff" in each message so that it can properly route incoming messages to the handler methods
defined in various controllers.

A typical `emit` message will look like this:

```json
{
  "pattern": "my_cool_event_message_type",
  "data": "my really awesome message"
}
```

Where `pattern` is what is defined in the `@EventPattern(...)` decorator above a NestJS message
handler method.

A typical `query` message will look like this:

```json
{
  "pattern": "my_cool_query_type",
  "id": "843c4a16-6034-40d5-bfea-b4d1c24fd860",
  "data": "my really awesome message"
}
```

Where `pattern` is what is defined in the `@MessagePattern(...)` decorator above a NestJS message
handler method and `id` is a correlation ID unique to this particular query which indicates to whom
the response should be returned.

> Note: messages "returned" from queries are not sent back to the service's main queue. They are
> instead sent to a transient "reply queue" unique to each running instance of an application. More
> details about reply queues can be found
> [here](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html).

## Testing Locally

To test messaging locally, two things are needed:

1. A running microservice that uses messaging
2. A running RabbitMQ Docker container

### Running RabbitMQ Locally

To run RabbitMQ locally via Docker, use the following command:

```
docker run --rm --hostname rabbitmq -p 5672:5672 rabbitmq:3.8
```

This will allow it to become accessible at: `amqp://localhost:5672`
