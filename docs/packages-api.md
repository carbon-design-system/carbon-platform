# Packages - api

A package that exports common API utilities used across various other packages and services. These
utilities are the interfaces by which services communicate amongst each other.

The API package intentionally has no entrypoint or lib defined in its `package.json` file. It
instead has a set of top-level `js` and corresponding `d.ts` files to allow importing such as:

```ts
import { Logging } from '@carbon-platform/api/logging'
import { getRunMode } from '@carbon-platform/api/run-mode'
import { getPassportInstance, SESSION_SECRET, store } from '@carbon-platform/api/auth'
```

## logging

APIs used by services to interact with the logging service allowing error, warning, info, and debug
messages to be logged.

## run-mode

A package that exports a function called `getRunMode()`, which returns one of two constants,
depending on the value of the `CARBON_RUN_MODE` environment variable.

The possible values are:

- `DEV`
- `PRODUCTION`

Exporting the `CARBON_RUN_MODE` environment variable as either of these values will cause
`getRunMode` to recognize it as the current run mode. Any other value will result in the mode being
set to `DEV`.

## auth

The auth package provides common authentication assets and centralized user session management for
necessary services to consume.

### Set up

#### Setting up local environment variables

Set the following variables in your environment file inside the project where the auth package is
being used.

##### IBMid Authentication Variables

- CARBON_IBM_VERIFY_CLIENT_ID=[client id tied to App registration on SSO provisioner (get this from
  dev team)]
- CARBON_IBM_VERIFY_CLIENT_SECRET=[client secret tied to App registration on SSO provisioner (get
  this from dev team)]

#### Database Config Variables

##### Production/Test

The following env variables are necessary for correct functionality of the package in production
mode:

- CARBON_MONGO_DB_URL=[url to remote mongo db instance including basic authentication]
- CARBON_MONGO_DB_NAME=[name of database in remote mongo db instance]

#### Additional Configurations

##### Run Mode Config

This package uses run-mode to determine what database to connect to (local or production) depending
on the current environment.

Make sure required environment variables are configured in the service you're using this package.
(See [run-mode package](#run-mode) for details on how to set up the run-mode package)

### Usage

#### Getting and Updating User Sessions

The auth package exports an object `store` that contains two functions that allow interaction with
the users' session data:

- `getUserBySessionCookie` : receives the user's session cookie value as a parameter and returns a
  promise that resolves to the user's session stored value:

  ```
  import { store } from '@carbon-platform/api/auth'
  ...
    const sessionCookie = req.cookies?.['connect.sid']
     if (sessionCookie) {
      const user = await store.getUserBySessionCookie(sessionCookie)
    }
  ```

  expect the user response to look like this:

  ```
  {
  "name":"Jane Doe",
  "email": "jane.doe@emaildomain.com"
  // Other User Properties
  ...
  }
  ```

- `updateUserBySessionCookie`: receives the user's session cookie value and a partial object of
  desired update values and returns a promise that resolves to true or false indicating whether the
  session value was succesfully updated

  ```
  import { store } from '@carbon-platform/api/auth'
  const sessionCookie = req.cookies?.['connect.sid']
  if(sessionCookie){
    const success = await store.updateUserBySessionCookie(sessionCookie, { testUserProp: 'test' })
  }
  ```

  The value of the (boolean) success variable will indicate whether the update request was
  succesful, expect the new user session value to look like this:

  ```
  {
  "name":"Jane Doe",
  "email": "jane.doe@emaildomain.com"
  "testUserprop":"test"
  // Other User Properties
  ...
  }
  ```

#### Setting up User Sessions

If the service needs to handle user sessions, please use the exported variable `SESSION_SECRET` as
the session secret and the `getStore` function available through the exported `store` object as the
store. Example with express-session:

```
import {getRunMode, PRODUCTION} from '@carbon-platform/api/run-mode'
import { SESSION_SECRET, store } from '@carbon-platform/api/auth'
import expressSession from 'express-session'
...
const storeInstance = await store.getStore()
...
    expressSession({
        store: storeInstance,
        secret: SESSION_SECRET,
        cookie: {
          path: '/',
          secure: getRunMode() === PRODUCTION,
          maxAge: 60 * 60 * 2 * 1000 // 2 hours
        }
      })
```

_Note:_ keep in mind you will have to await for the store instance to be resolved before being able
to use it

#### Passport Authentication

If the service needs to authenticate users against IBMId, the exported function
`getPassportInstance` returns a promise that resolves to a pre-configured passport instance. This
instance can be used just like the passport package and doesn't need to be further setup:

```
    import { getPassportInstance } from '@carbon-platform/api/auth'
    const passport = await getPassportInstance()
    passport.authenticate('prepiam.ice.ibmcloud.com')
```

_Note:_ keep in mind you will have to await for the passport instance to be resolved before being
able to use it
