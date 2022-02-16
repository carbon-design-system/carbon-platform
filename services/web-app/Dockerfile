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

FROM local/carbon-platform/base:latest

WORKDIR /ibm

COPY package.json services/web-app/package.json

RUN CI=true npm -w services/web-app install --production

# This is done at the end so the install above can happen in parallel
COPY --from=builder /ibm/services/web-app/next.config.js services/web-app/
COPY --from=builder /ibm/services/web-app/.carbon services/web-app/.carbon
COPY --from=builder /ibm/services/web-app/.next services/web-app/.next
COPY --from=builder /ibm/services/web-app/data services/web-app/data
COPY --from=builder /ibm/services/web-app/public services/web-app/public

CMD ["npm", "--workspace=services/web-app", "run", "start"]
