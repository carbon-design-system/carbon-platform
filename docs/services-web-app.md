# Services - web-app

The Web App service is a Next.js application that serves as the origin server for the
carbon-platform project.

## Setting up local environment variables

To run the app locally certain environment variales are necessary. follow the steps below for
correct setup:

1. Copy the `/services/web-app/.env.example` file and rename to `/services/web-app/.env.local`

### Node Environment (SOON TO BE DEPRECATED)

For development purposes set `NODE_ENV=development` in .env.local file, for production set to
`NODE_ENV=production`

### Adding GitHub personal access token for prototype

**_Prerequisite:_** `.env.local` file for local development (see
[Setting up local environment variables](#setting-up-local-environment-variables))

The web app prototype uses a GitHub personal access token to fetch data from GitHub. This allows
access to private repos and increases API quotas. To set up a personal access token:

1. Generate a new token [https://github.com/settings/tokens](https://github.com/settings/tokens)
1. Select all repo scopes
1. Copy the `/services/web-app/.env.example` file and rename to `/services/web-app/.env.local`
1. Add your token to that new `.env.local` file

### IBMid Authentication Variables

**_Prerequisite:_** `.env.local` file for local development (see
[Setting up local environment variables](#setting-up-local-environment-variables))

Set the following variable values in `.env.local` for correct IBMid authentication flow:

- IBM_VERIFY_CLIENT_ID=[client id tied to App registration on SSO provisioner (get this from dev
  team)]
- IBM_VERIFY_CLIENT_SECRET=[client secret tied to App registration on SSO provisioner (get this from
  dev team)]

### Database Config Variables

#### Local Development

**_Prerequisite:_** `.env.local` file (see
[Setting up local environment variables](#setting-up-local-environment-variables))

- LOCAL_DB_DIRECTORY=[*absolute* path to directory in which local sqlite database should be stored
  for dev purposes (this stores the users' session)]

#### Production

- MONGO_DB_URL=[url to remote mongo db instance including basic authentication]
- MONGO_DB_NAME=[name of database in remote mongo db instance]

## Adding Local Certificates

The application must run on https for IBMid authentication to work properly. For such purposes,
local certificates must be generated to run on development environment. You may use
[mkcert](https://github.com/FiloSottile/mkcert#installation) tool for this, run the following
command from the [web app's directory](../services/web-app):

```bash
mkcert \
  -cert-file=./certificates/localhost.crt \
  -key-file=./certificates/localhost.key \
  localhost "*.localhost"
```

## Running App Securely

**_Prerequisite:_** local certificates have been configured (see
[Adding Local Certificates](#adding-local-certificates))

To run the app on https, it must be served from [server.js](../services/web-app/server.js). To do
this, run the following command from the [web-app's directory](../services/web-app):

`npm run start-secure`

## Protecting a Route

### Protecting Static Pages

In order to require authentication before an user can access a static page, use the `withAuth` HOC
to export the pages' component:

```
import withAuth from 'HOCs/withAuth'
...
export default withAuth(PageComponent)
```

### Protecting Server-Side Rendered Pages

In order to require authentication before an user can access a server-side rendered page, use the
`requireAuthentication` utlity function to export the pages' _getServerSideProps_ function:

```
import { requireAuthentication } from '@/utils/requireAuthentication'
...
export const getServerSideProps = requireAuthentication((context) => {
  // Your normal `getServerSideProps` code here
  return {
    props: {}
  }
})
```

### Protect Route Dynamically

If a Page handles both public and private data and a user needs to be authenticated depending on
dynamic parameters on the page, you may make use of the `shouldAuthenticate` optional function that
can be passed to the both the `withAuth` HOC and the `requireAuthentication` utility function. Both
will call the supplied callback function with the requested route and queryParams object as params:

```
import withAuth from 'HOCs/withAuth'
...
export default withAuth(DynamicPageComponent, (route, query) => {
  // User will be required to authenticate if the requested host is equal to 'github.ibm.com'
  return query.host === 'github.ibm.com'
})
```

#### OR

```
import { requireAuthentication } from '@/utils/requireAuthentication'
...
export const getServerSideProps = requireAuthentication(
  (context) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {}
    }
  },
  (url, query) => {
    // User will be required to authenticate unless a query param 'override' is passed in the url with a value of 'true'
    return !(query.override === 'true')
  }
)
```

## Retrieving User's Data

### Server Side Rendered Pages that use Authentication

For server-side rendered pages that export their _getserversideprops_ function through the
requireAuthentication HOF (see
[Protecting Server-Side Rendered Pages](#protecting-server-side-rendered-pages)), an 'user' variable
will automatically be injected into the components' props:

```
import { requireAuthentication } from '@/utils/requireAuthentication'

const ProtectedPageWithSSR = (props) => {
  return <div>User: {JSON.stringify(props?.user)}</div>
}

export const getServerSideProps = requireAuthentication(
  (context) => {
    return {
      props: {}
    }
  }
)

export default ProtectedPageWithSSR
```

Note: be aware that if your component uses the `shouldAuthenticate()` param function to authenticate
dynamically, a user variable will not be injected when authentication is not necessary (i.e., when
the function returns false) and will thus be undefined

### UseAuth() Hook

From a React Component, you can access the user's information via the `user` property in the
`useAuth` hook. This hook also exposes other info such as:

- user: object containing user's data
- isLoading: boolean indicating whether user is still being retrieved or not
- isAuthenticated: booleand indicating whether the user has correctly authenticated or not
- login: function to login user
- logout: function to logout user

```
 import { useAuth } from 'contexts/auth'
 ...
 const { isAuthenticated, isLoading, user, login, logout } = useAuth()
```

Note: Keep in mind in some instances the user might still be loading (being retrieved) or might not
exist yet (user hasn't authenticated) when your component is trying to access it. Leverage the
`isLoading` and `isAuthenticated` properties for correct assertions

### API Call

If necessary, you can make a fetch request to '/api/user' which will return the user details or a
404 status code if no user has been found:

```
 const userResponse = await fetch('/api/user')
      if (userResponse.ok) {
        const user = await userResponse.json()
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
