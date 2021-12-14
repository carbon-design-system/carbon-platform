FROM us.icr.io/carbon-platform-test/base:latest

# TODO: add args needed during build (e.g. github api key)

WORKDIR /service-root/web-app

COPY package-lock.json .
COPY services/web-app .

RUN npm install

RUN npm run build

# Install only prod deps
RUN rm -rf ./node_modules
RUN npm install --production

# Cleanup
# none currently

CMD ["npm", "run", "start"]
