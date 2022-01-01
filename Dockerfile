#
# Copyright IBM Corp. 2021, 2021
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#
FROM node:16-alpine AS builder

WORKDIR /ibm

COPY . .

# TODO: test if same behavior without ignore scripts
RUN npm install --ignore-scripts
RUN npm run packages:build

###

FROM node:16-alpine

WORKDIR /ibm

COPY package.json .
COPY package-lock.json .
COPY LICENSE .
# TODO: include base tsconfig file

# This is done at the end so that the install steps above can run in parallel
COPY --from=builder /ibm/packages packages

RUN npm install --production --ignore-scripts
RUN npm install --production @types/node

# Cleanup source files
RUN for file in packages/* ; do \
  rm -rf "$file/src" ; \
done
