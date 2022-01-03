FROM local/carbon-platform/base:latest AS builder

# TODO: add args needed during build (e.g. github api key)
ARG CARBON_GITHUB_TOKEN

WORKDIR /ibm

COPY . services/web-app

RUN export GITHUB_TOKEN=${CARBON_GITHUB_TOKEN}

RUN CI=true npm -w services/web-app install
RUN npm -w services/web-app run build

###

FROM local/carbon-platform/base:latest

WORKDIR /ibm

COPY package.json services/web-app/package.json

RUN CI=true npm -w services/web-app install --production

# This is done at the end so the install above can happen in parallel
COPY --from=builder /ibm/services/web-app/.next services/web-app/.next

CMD ["npm", "--workspace=services/web-app", "run", "start"]
