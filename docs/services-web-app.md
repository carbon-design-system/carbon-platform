# Services - Web App

The Web App service is a Next.js application that serves as the origin server for the
carbon-platform project.

## Adding GitHub personal access token for prototype

The web app prototype uses a GitHub personal access token to fetch data from GitHub. This allows
access to private repos and increases API quotas. To set up a personal access token:

1. Generate a new token [https://github.com/settings/tokens](https://github.com/settings/tokens)
1. Select all repo scopes
1. Copy the `/services/web-app/.env.example` file and rename to `/services/web-app/.env.local`
1. Add your token to that new `.env.local` file

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

To run the app on https, it must be served from [server.js](../services/web-app/server.js). To do
this, run the following command from the [web-app's directory](../services/web-app):

`npm run start-secure`

## Protecting a Route

In order to require authentication before an user can access a route, use the `withAuth` HOC to
export the pages' component:

```
import withAuth from 'HOCs/withAuth'
...
export default withAuth(PageComponent)
```

### Protect Route Dynamically

If a Page handles both public and private data and a user needs to be authenticated depending on
dynamic parameters on the page, you may make use of the `shouldAuthenticate` optional function that
can be passed to the `withAuth` HOC:

```
import withAuth from 'HOCs/withAuth'
...
export default withAuth(DynamicPageComponent, (route, query) => {
  // User will be required to authenticate if the requested host is equal to 'github.ibm.com'
  return query.host === 'github.ibm.com'
})
```

## Retrieving User's Data

From a React Component, you can access the user's information via the `user` propery in the
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
