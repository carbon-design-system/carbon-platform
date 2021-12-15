FROM us.icr.io/carbon-platform-test/base:latest AS builder

WORKDIR /ibm

COPY . services/logging

RUN npm -w services/logging install --ignore-scripts
RUN npm -w services/logging run build

###

FROM us.icr.io/carbon-platform-test/base:latest

WORKDIR /ibm

COPY package.json services/logging/package.json
RUN npm -w services/logging install --production --ignore-scripts

# This is done at the end so the install above can happen in parallel
COPY --from=builder /ibm/services/logging/dist services/logging/dist

CMD ["npm", "--workspace=services/logging", "run", "start"]
