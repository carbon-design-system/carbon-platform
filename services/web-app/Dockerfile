FROM local/carbon-platform/base:latest AS builder

WORKDIR /ibm

ARG CARBON_GITHUB_TOKEN
ARG GITHUB_TOKEN=${CARBON_GITHUB_TOKEN}

RUN npm -w services/web-app run build

###

FROM node:16-alpine

WORKDIR /ibm/services/web-app

ENV NODE_ENV=production
ENV CARBON_RUN_MODE=STANDARD

# Dependencies required for node-gyp to run on Alpine Linux. This is needed for "sharp"
RUN apk add --no-cache python3 make g++
RUN ln -s /usr/bin/python3 /usr/bin/python

RUN CI=true npm install sharp

COPY --from=builder /ibm/services/web-app/proxy-server.js .
COPY --from=builder /ibm/services/web-app/.next/standalone .next/standalone
COPY --from=builder /ibm/services/web-app/public .next/standalone/services/web-app/public
COPY --from=builder /ibm/services/web-app/.next/static .next/standalone/services/web-app/.next/static
COPY --from=builder /ibm/services/web-app/.carbon .next/standalone/services/web-app/.carbon

# concurrently is not installing
CMD ["npx", "concurrently", "node .next/standalone/services/web-app/server.js", "node proxy-server.js"]
