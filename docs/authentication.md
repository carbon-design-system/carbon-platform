# Authentication

The auth package provides common authentication assets and centralized user session management for
necessary services to consume.

## Environment Variables

Set the following variables in your environment file inside the project where the auth package is
being used.

### IBMid Authentication Variables

- `CARBON_IBM_ISV_CLIENT_ID=[client id]`
  - Client ID tied to App registration on SSO provisioner (get this from dev team)]
- `CARBON_IBM_ISV_CLIENT_SECRET=[secret]`
  - Client secret tied to App registration on SSO provisioner (get this from dev team)]

### Database Config Variables

#### Production

The following env variables are necessary for correct functionality of the package in production
mode:

- `CARBON_MONGO_DB_URL=[url]`
  - URL to remote mongo db instance including basic authentication
- `CARBON_MONGO_DB_NAME=[name]`
  - Name of database in remote mongo db instance

## Additional Configurations

### Run Mode Config

This package uses `run-mode` to determine what database to connect to (local or production)
depending on the current run mode.

Make sure required environment variables are configured in the service you're using this package.
(See [run-mode package](./packages-api.md#run-mode) for details on how to set up the run-mode
package)

## Usage

### Getting and Updating User Sessions

The auth package exports an object `store` that contains two functions that allow interaction with
the users' session data:

#### `getUserBySessionCookie`

Receives the user's session cookie value as a parameter and returns a promise that resolves to the
user's session stored value:

```ts
import { store } from '@carbon-platform/api/auth'
// ...
const sessionCookie = req.cookies?.['connect.sid']
if (sessionCookie) {
  const user = await store.getUserBySessionCookie(sessionCookie)
}
```

expect the user response to look like this:

```jsonc
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
  // ...Other User Properties
}
```

### `updateUserBySessionCookie`

Receives the user's session cookie value and a partial object of desired update values and returns a
promise that resolves to true or false indicating whether the session value was succesfully updated

```js
import { store } from '@carbon-platform/api/auth'

const sessionCookie = req.cookies?.['connect.sid']
if (sessionCookie) {
  const success = await store.updateUserBySessionCookie(sessionCookie, { testUserProp: 'test' })
}
```

The value of the (boolean) success variable will indicate whether the update request was succesful,
expect the new user session value to look like this:

```jsonc
{
  "name":"Jane Doe",
  "email": "jane.doe@emaildomain.com"
  "testUserprop":"test"
  // ...Other User Properties
}
```

### Setting up User Sessions

If the service needs to handle user sessions, use the exported variable `SESSION_SECRET` as the
session secret and the `getStore` function available through the exported `store` object as the
store. Example with express-session:

```ts
import { getRunMode, RunMode } from '@carbon-platform/api/runtime'
import { SESSION_SECRET, store } from '@carbon-platform/api/auth'
import expressSession from 'express-session'
// ...
const storeInstance = await store.getStore()
// ...
expressSession({
  store: storeInstance,
  secret: SESSION_SECRET,
  cookie: {
    path: '/',
    secure: getRunMode() === RunMode.Prod,
    maxAge: 60 * 60 * 2 * 1000 // 2 hours
  }
})

_Note:_ keep in mind you will have to await for the store instance to be resolved before being able
to use it

### Passport Authentication

If the service needs to authenticate users against IBMId, the exported function
`getPassportInstance` returns a promise that resolves to a pre-configured passport instance. This
instance can be used just like the passport package and doesn't need to be further setup:

```ts
import { getPassportInstance } from '@carbon-platform/api/auth'
const passport = await getPassportInstance()
app.use(passport.session())
```

_Note:_ keep in mind you will have to await for the passport instance to be resolved before being
able to use it

To invoke the passport authentication you can make use of the exported `authenticateWithPassport`
handler:

```ts
import { authenticateWithPassport } from '@carbon-platform/api/auth'

const login = authenticateWithPassport()

export default login
```
