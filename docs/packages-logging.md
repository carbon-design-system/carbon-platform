# Packages - logging

## Purpose

The logging package is responsible for facilitating data transfer between services and the
`logging-service`.

In production mode, it broadcasts messages to the messaging service with type `LOG`.

In development mode, logs are written to stdout or stderr, depending on the log type.

## API

### `info(message: string)`

Logs an informational message. This is useful for point-in-time events, such as a service becoming
ready, a user account being created, a configuration setting being updated, a new data ingestion
endpoint becoming available, etc.

**Examples**

```ts
info(`Web server now listening on port ${port}`)
```

### `warn(message: string)`

Logs a warning message. Warnings are typically unexpected situations, but do not represent a
breakdown of the core application logic. Examples include a user account becoming locked due to
failed login attempts, encountering an expected file that cannot be found or is blank, usages of
deprecated APIs, an operation taking longer than expected, etc.

**Examples**

```ts
warn(`Database collection ${collection.name} was empty. Recreating`)
```

### `error(message: string, exception?: object)`

Logs an error message. Errors are unexpected situations and often represent a breakdown in core
logic. This often means entering the `catch` block of a `try/catch` statement. It can also mean
encountering `undefined` or `null` where values are expected to be present.

**Examples**

```ts
try {
  const dbConnection = db.connect()
  dbConnection.query('stuff')
} catch (err) {
  error(`Could not connect to database`, err)
}
```

```ts
error(`processImage encountered a checksum mismatch. Expected: ${expected}, Was: ${actual}`)
```

### `debug(message: string)`

Logs a debugging message. This includes things like important function entry/exit, the size of a
list obtained from a remote source, the results after filtering an input set, etc.

> NOTE: Debug messaging is enabled in local and test environments, but not in the production
> environment. It is safe an acceptable to leave debug statements in code, where appropriate, unlike
> `console.log` statements, which would typically be removed from production code.

**Examples**

```ts
debug(`Pre-filter list size: ${orig.length}, Post-filter list size: ${filtered.length}`)
```
