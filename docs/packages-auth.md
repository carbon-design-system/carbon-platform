# Packages - Auth

The auth package provides common authentication assets and centralized user session management for
necessary services to consume.

## Set up

### Installation

From the monorepo, install the auth package into a service by running the following command from the
root project directory:

`npm --workspace services/[service-name] install @carbon-platform/auth`

### Setting up local environment variables

Set the following variables in your environment file inside the project where the auth package is
being used.

### Node Environment (SOON TO BE DEPRECATED)

For development purposes set `NODE_ENV=development` in .env.local file, for production set to
`NODE_ENV=production`

### IBMid Authentication Variables

- IBM_VERIFY_CLIENT_ID=[client id tied to App registration on SSO provisioner (get this from dev
  team)]
- IBM_VERIFY_CLIENT_SECRET=[client secret tied to App registration on SSO provisioner (get this from
  dev team)]

### Database Config Variables

#### Local Development

- LOCAL_DB_DIRECTORY=[*absolute* path to directory in which local sqlite database should be stored
  for dev purposes (this stores the users' session)]

#### Production

- MONGO_DB_URL=[url to remote mongo db instance including basic authentication]
- MONGO_DB_NAME=[name of database in remote mongo db instance]

## Usage

### Getting and Updating User Sessions

The auth package exports two functions that allow to interact with the users' session data:

- `getUserBySessionCookie` : receives the user's session cookie value as a parameter and returns a
  promise that resolves to the user's session stored value:

  ```
    const sessionCookie = req.cookies?.['connect.sid']
     if (sessionCookie) {
      const user = await getUserBySessionCookie(sessionCookie)
    }
  ```

  expect the user response to look like this:

  ```
  {
  "name":"Jane Doe",
  // Other User Properties
  ...
  }
  ```

- `updateUserBySessionCookie`: receives the user's session cookie value and a partial object of
  desired update values and returns a promise that resolves to true or false indicating whether the
  session value was succesfully updated

  ```
  const sessionCookie = req.cookies?.['connect.sid']
  if(sessionCookie){
    const success = await updateUserBySessionCookie(sessionCookie, { testUserProp: 'test' })
  }
  ```

  The value of the (boolean) success variable will indicate whether the update request was
  succesful, expect the new user session value to look like this:

  ```
  {
  "name":"Jane Doe",
  "testUserprop":"test"
  // Other User Properties
  ...
  }
  ```

### Setting up User Sessions

If the service needs to handle user sessions, please use the exported variable `SESSION_SECRET` as
the session secret. Example with express-session

```
import { SESSION_SECRET } from '@carbon-platform/auth'
import expressSession from 'express-session'
...
    expressSession({
        store,
        secret: SESSION_SECRET,
        cookie: {
          path: '/',
          secure: process.env.NODE_ENV === 'production'
        }
      })
```

### Passport Authentication

If the service needs to authenticate users against IBMId, the exported function
`getPassportInstance` returns a promise that resolves pre-configured passport instance. This
instance can be used just like the passport package and doesn't need to be further setup:

```
    import { getPassportInstance } from '@carbon-platform/auth'
    const passport = await getPassportInstance()
    passport.authenticate('prepiam.ice.ibmcloud.com')
```

_Note:_ keep in mind you will have to await for the instance to be resolved before being able to use
it
