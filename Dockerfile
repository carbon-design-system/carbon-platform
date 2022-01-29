#
# Copyright IBM Corp. 2021, 2022
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#
FROM node:16-alpine AS builder

WORKDIR /ibm

# Dependencies required for node-gyp to run on Alpine Linux
RUN apk add --no-cache python3 make g++
RUN ln -s /usr/bin/python3 /usr/bin/python

COPY . .

# Install node modules for each "package"
RUN for file in packages/* ; do \
  CI=true npm --workspace "$file" install ; \
done

RUN npm run packages:build

###

FROM node:16-alpine

WORKDIR /ibm

# Dependencies required for node-gyp to run on Alpine Linux
RUN apk add --no-cache python3 make g++
RUN ln -s /usr/bin/python3 /usr/bin/python

COPY package.json .
COPY package-lock.json .
COPY LICENSE .
COPY tsconfig.base.json .

# This is done at the end so that the install steps above can run in parallel
COPY --from=builder /ibm/packages packages

RUN CI=true npm install --production

# Cleanup source files
RUN for file in packages/* ; do \
  rm -rf "$file/src" ; \
done
