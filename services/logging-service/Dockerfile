FROM us.icr.io/carbon-platform-test/base:latest

WORKDIR /service-root/logging

COPY package-lock.json .
COPY services/logging-service/package.json .
# TODO: copy base tsconfig from which this inherits
COPY services/logging-service/tsconfig.json .
COPY services/logging-service/src src

RUN npm install

RUN npm run build

# Install only prod deps
RUN rm -rf ./node_modules
RUN npm install --production

# Cleanup
RUN rm -rf src tsconfig.json

CMD ["npm", "run", "start"]
