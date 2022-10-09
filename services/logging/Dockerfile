#
# Copyright IBM Corp. 2022, 2022
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#
FROM us.icr.io/carbon-platform/base:latest AS builder

WORKDIR /ibm

COPY services/logging services/logging

RUN npm -w services/logging install
RUN npm -w services/logging run build
RUN npm -w services/logging run bundle

###

FROM node:16-alpine

WORKDIR /ibm/services/logging

ENV NODE_ENV=production
ENV CARBON_RUN_MODE=STANDARD

# Make a non-root user that can work within the /ibm directory
RUN adduser -D -u 10000 ibm-user
RUN chown -R 10000 /ibm

COPY --from=builder /ibm/services/logging/dist/out.js dist/out.js

CMD ["node", "dist/out.js"]
