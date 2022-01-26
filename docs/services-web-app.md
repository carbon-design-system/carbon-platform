# Services - web-app

The Web App service is a Next.js application that serves as the origin server for the
carbon-platform project.

## Running on Production

When running application on production, additional environment variables configurations are
necessary:

- CARBON_BASE_URL: base url of deployed application

## Setting up local environment variables

To run the app locally certain environment variales are necessary. follow the steps below for
correct setup:

1. Copy the `/services/web-app/.env.example` file and rename to `/services/web-app/.env.local`

### Adding GitHub personal access token for prototype

**_Prerequisite:_** `.env.local` file for local development (see
[Setting up local environment variables](#setting-up-local-environment-variables))

The web app prototype uses a GitHub personal access token to fetch data from GitHub. This allows
access to private repos and increases API quotas. To set up a personal access token:

1. Generate a new token [https://github.com/settings/tokens](https://github.com/settings/tokens)
1. Select all repo scopes
1. Copy the `/services/web-app/.env.example` file and rename to `/services/web-app/.env.local`
1. Add your token to that new `.env.local` file

## Dependencies Set up

### Run Mode

The app uses run-mode to make decisions that are environment-dependant (cookies, next-server...).
This package configuration is also needed for proper functionality of the Auth Package.

Make sure required environment variables are configured for proper functionality of this package.
(See [run-mode package](./packages-api.md#run-mode) for details on how to set up the run-mode
package)

### Auth

This service depends on the auth package; Make sure required environment variables are configured
for proper functionality of this package. (See [auth package](./packages-api.md#auth) for details on
how to set up the auth package)

## Adding Local Certificates

The application must run on https for IBMid authentication to work properly. For such purposes,
local certificates must be generated to run on development environment. You may use
[mkcert](https://github.com/FiloSottile/mkcert#installation) tool for this. With the tool
downloaded, the certificates will be automatically generated next time you
[run the app securely](#running-app-securely)

## Running App Securely

To run the app on https, it must be served from [server.js](../services/web-app/server.js). To do
this, run the following command from the [web-app's directory](../services/web-app):

`npm run start-secure`

## Protecting a Route

### Protecting Server-Side Rendered Pages

In order to require authentication before a user can access a server-side rendered page use the
`getPropsWithAuth` utlity function to wrap the pages' `getServerSideProps` function and wrap the
pages' content inside the `RequireAuth` component.

#### getPropsWithAuth

`getPropsWithAuth` expects an `authorizationChecker` function that receives the server side context
as a param and must return a boolean value indicating whether the user is authorized to view the
content or not:

```js
import { getPropsWithAuth } from '@/utils/getPropsWithAuth'
import { retrieveUser } from '@/utils/retrieveUser'
// ...
// Your custom authorization logic here, this one considers the user as authorized if it's email address ends in "ibm.com"
const isValidIbmUser = async (context) => {
  const user = await retrieveUser(context)
  if (user) {
    return user.email?.endsWith('ibm.com')
  }
  return false
}
...
export const getServerSideProps = getPropsWithAuth(isValidIbmUser, async (/* context */) => {
  // Your normal `getServerSideProps` code here
  return {
    props: {
      // Your custom props here
    }
  }
})
```

Some `authorizationChecker` functions that serve common purposes are exported from
[utils/auth-checkers](..services/web-app/utils/auth-checkers):

```
import { getPropsWithAuth } from '@/utils/getPropsWithAuth'
import isValidIbmUser from '@/utils/auth-checkers/isValidIbmUser'
...
export const getServerSideProps = getPropsWithAuth(isValidIbmUser, async (/* context */) => {
  // Your normal `getServerSideProps` code here
  return {
    props: {
      // Your custom props here
    }
  }
})
```

_Note_: if your `authorizationChecker` function calls `retrieveUser()`, the obtained user (if any)
will be injected into the pages's props; you can access it on `props.user`

#### RequireAuth

`RequireAuth` is a parent component that receives a `fallback` component which will be rendered
instead of the supplied content in the case that the `isAuthorized` prop is set to false

```
import RequireAuth from '@/components/auth/require-auth'
import FourOhFour from '@/pages/404'
...
const ProtectedPage = (props) => {
  return (
    // will return 404 page if isAuthorized is set to false
    <RequireAuth fallback={FourOhFour} isAuthorized={props.isAuthorized}>
      <div>User: {JSON.stringify(props?.user ?? {})}</div>
    </RequireAuth>
  )
}
```

For a working example of a protected server side rendered pages,
[run the app securely](#running-app-securely) and visit:

- [https://localhost/samples/protectedPageWithSSR](https://localhost/samples/protectedPageWithSSR)
- [https://localhost/samples/protectedPageWithSSRDynamicAuth](https://localhost/samples/protectedPageWithSSRDynamicAuth)
- [https://localhost/samples/protectedPageWithSSRDynamicAuth?host=github.com](https://localhost/samples/protectedPageWithSSRDynamicAuth?host=github.com)
- [https://localhost/samples/protectedPageWithSSRDynamicAuth?host=github.ibm.com](https://localhost/samples/protectedPageWithSSRDynamicAuth?host=github.ibm.com)
- [https://localhost/samples/protectedPageWithSSRDynamicAuth?host=github.ibm.com&repo=internal-stuff](https://localhost/samples/protectedPageWithSSRDynamicAuth?host=github.ibm.com&repo=internal-stuff)
- [https://localhost/samples/protectedPageWithSSRDynamicAuth?host=github.ibm.com&repo=private-stuff](https://localhost/samples/protectedPageWithSSRDynamicAuth?host=github.ibm.com&repo=private-stuff)

### Protecting Static Pages

There is no reusable strategy to guarantee authentication before accessing Statically Generated
Pages; Each page is responisble for handling authentication and authorization at a component-level
(e.g., fetching user , waiting for user to load and then displaying content). See "Authenticating
Statically Generated Pages" section in
[NextJs Authentication Docs](https://nextjs.org/docs/authentication) You may make use of the
`useAuth()` hook and `RequireAuth` component in your implementations:

```
  import { useAuth } from 'contexts/auth'
  import { useEffect } from 'react'

  import RequireAuth from '@/components/auth/require-auth'

  import FourOhFour from '../404'

  const ProtectedStaticPage = () => {
    const { isAuthenticated, loading, user } = useAuth()

    useEffect(() => {
      if (!loading && isAuthenticated) {
        // fetch protected data here
      }
    }, [loading, isAuthenticated])

    return loading ? null : (
      // show page if user is authenticated and email ends with ibm.com, else show 404 page
      <RequireAuth
        fallback={FourOhFour}
        isAuthorized={isAuthenticated && user?.email?.endsWith('ibm.com')}
      >
        <>
          // Your Page Content Here
        </>
      </RequireAuth>
    )
  }

  // do NOT fetch protected data here
  export async function getStaticProps(/* context */) {
    return {
      props: {} // will be passed to the page component as props
    }
  }

  export default ProtectedStaticPage
```

Note: DO NOT SERVE/FETCH PROTECTED INFO THROUGH `getStaticProps`, as these will be served
automatically when the route is accessed regardless of authentication.

For a working example of a protected static page, (run the app securely)[#running-app-securely] and
visit [https://localhost/samples/protectedStaticPage](https://localhost/samples/protectedStaticPage)

## Retrieving User's Data

### Server Side Rendered Pages

#### retrieveUser

The `retrieveUser` function will return the current user instance or null if user is not logged in;
note this function is asynchronous. This function can only be called server-side (i.e., in the
context of getServerSideProps):

```
import { retrieveUser } from '@/utils/retrieveUser'
...
export const getServerSideProps = async (/* context */) => {
  const user = await retrieveUser(context)
  // Your normal `getServerSideProps` code here
  return {
    props: {
      user
      // Your custom props here
    }
  }
}
```

_Note_: if you are wrapping your `getServerSideProps` with `getPropsWithAuth` and your
`authorizationChecker` function calls `retrieveUser()`, the obtained user (if any) will be injected
into the pages's props; you can access it on `props.user`

### UseAuth() Hook

From a React Component, you can access the user's information via the `user` property in the
`useAuth` hook. This hook also exposes other info such as:

- user: object containing user's data
- loading: boolean indicating whether user is still being retrieved or not
- isAuthenticated: booleand indicating whether the user has correctly authenticated or not
- login: function to login user
- logout: function to logout user

```
 import { useAuth } from 'contexts/auth'
 ...
 const { isAuthenticated, isLoading, user, login, logout } = useAuth()
```

_Note:_ Keep in mind in some instances the user might still be loading (being retrieved) or might
not exist yet (user hasn't authenticated) when your component is trying to access it. Leverage the
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
  "email": "jane.doe@emaildomain.com"
  // Other User Properties
  ...
  }
```
