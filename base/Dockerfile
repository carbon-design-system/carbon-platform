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
ENV CARBON_RUN_MODE=STANDARD
ENV CARBON_ENVIRONMENT=BUILD
ENV CI=true

# Dependencies required for node-gyp to run on Alpine Linux
RUN apk add --no-cache python3 make g++
RUN ln -s /usr/bin/python3 /usr/bin/python

# Copy files needed to install deps
COPY package.json .
COPY package-lock.json .
COPY base base
COPY scripts scripts

# Install base deps for all workspaces
RUN npm -w base install

# Copy build files needed by all workspaces
COPY .npmrc .
COPY esbuild.base.mjs .
COPY tsconfig.base.json .

# Install node modules for each "package"
COPY packages packages
RUN for file in packages/* ; do \
  npm --workspace "$file" install ; \
done

RUN npm run packages:build
