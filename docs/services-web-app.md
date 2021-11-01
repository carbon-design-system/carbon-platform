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
