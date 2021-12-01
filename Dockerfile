FROM node:16-alpine AS builder

WORKDIR /service-root

RUN mkdir ./packed_node_modules
RUN mkdir ./local_node_modules

COPY . .

# This will implicitly build all packages
RUN npm install

# Pack all workspace packages
RUN for file in packages/* ; do \
  npm --workspace="$file" pack --pack-destination=./packed_node_modules ; \
done

###

FROM node:16-alpine

WORKDIR /service-root

# Init a node project so modules can be installed
RUN npm init -y

# Install all packed workspace packages
COPY --from=builder /service-root/packed_node_modules ./packed_node_modules
RUN for file in packed_node_modules/*.tgz ; do \
  npm install ./"$file" ; \
done

# Install the node types package
RUN npm install @types/node

# Cleanup
RUN rm -rf ./packed_node_modules
RUN rm -rf package.json package-lock.json
