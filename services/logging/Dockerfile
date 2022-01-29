FROM local/carbon-platform/base:latest AS builder

WORKDIR /ibm

COPY . services/logging

RUN CI=true npm -w services/logging install
RUN npm -w services/logging run build

###

FROM local/carbon-platform/base:latest

WORKDIR /ibm

# Run service in PROD mode by default
ENV CARBON_RUN_MODE PROD

COPY package.json services/logging/package.json

RUN CI=true npm -w services/logging install --production

# This is done at the end so the install above can happen in parallel
COPY --from=builder /ibm/services/logging/dist services/logging/dist

CMD ["npm", "--workspace=services/logging", "run", "start"]
