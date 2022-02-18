FROM local/carbon-platform/base:latest AS builder

WORKDIR /ibm

ARG CARBON_GITHUB_TOKEN
ARG CARBON_GITHUB_IBM_TOKEN

ARG GITHUB_TOKEN=${CARBON_GITHUB_TOKEN}
ARG GITHUB_IBM_TOKEN=${CARBON_GITHUB_IBM_TOKEN}

COPY package.json services/web-app/package.json
RUN CI=true npm -w services/web-app install

COPY . services/web-app/
RUN npm -w services/web-app run build

###

FROM node:16-alpine

WORKDIR /ibm

ENV NODE_ENV=production

COPY package.json services/web-app/package.json

# This is done at the end so the install above can happen in parallel
COPY --from=builder /ibm/services/web-app/.next/standalone .
COPY --from=builder /ibm/services/web-app/.next/static services/web-app/.next/static/
COPY --from=builder /ibm/services/web-app/next.config.js services/web-app/
COPY --from=builder /ibm/services/web-app/.carbon services/web-app/.carbon
COPY --from=builder /ibm/services/web-app/data services/web-app/data
COPY --from=builder /ibm/services/web-app/public services/web-app/public

CMD ["node", "services/web-app/server.js"]
