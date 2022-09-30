#
# Copyright IBM Corp. 2022, 2022
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#
FROM us.icr.io/carbon-platform/base:latest AS builder

WORKDIR /ibm

ARG CARBON_GITHUB_TOKEN
ARG GITHUB_TOKEN=${CARBON_GITHUB_TOKEN}

COPY services/web-app services/web-app

RUN npm -w services/web-app install
RUN npm -w services/web-app run build
RUN npm -w services/web-app run bundle

###

FROM node:16-alpine

WORKDIR /ibm/services/web-app

ENV NODE_ENV=production
ENV CARBON_RUN_MODE=STANDARD

# Dependencies required for node-gyp to run on Alpine Linux. This is needed for "sharp"
RUN apk add --no-cache python3 make g++
RUN ln -s /usr/bin/python3 /usr/bin/python

RUN CI=true npm install concurrently sharp

COPY --from=builder /ibm/services/web-app/dist/out.js dist/out.js
COPY --from=builder /ibm/services/web-app/.next/standalone .next/standalone
COPY --from=builder /ibm/services/web-app/public .next/standalone/services/web-app/public
COPY --from=builder /ibm/services/web-app/.next/static .next/standalone/services/web-app/.next/static
COPY --from=builder /ibm/services/web-app/.carbon .next/standalone/services/web-app/.carbon

# Allow a non-root user to work within the /ibm directory
RUN chown -R 1000 /ibm

# Run NextJS app concurrently with the express proxy server
CMD ["npx", "concurrently", "--kill-others", "PORT=3000 node .next/standalone/services/web-app/server.js", "node dist/out.js"]
