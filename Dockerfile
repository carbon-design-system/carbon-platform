#
# Copyright IBM Corp. 2021, 2022
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#
FROM node:16-alpine AS builder

WORKDIR /ibm

# Force only production node modules to be installed
ENV NODE_ENV=production
ENV CARBON_RUN_MODE=PROD

ARG CI=true

# Dependencies required for node-gyp to run on Alpine Linux
RUN apk add --no-cache python3 make g++
RUN ln -s /usr/bin/python3 /usr/bin/python

COPY . .

RUN npm install
RUN npm run packages:build
