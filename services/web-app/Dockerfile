FROM local/carbon-platform/base:latest AS builder

# TODO: add args needed during build (e.g. github api key)

WORKDIR /ibm

COPY . services/web-app

RUN npm -w services/web-app install --ignore-scripts
# Next is installed again since the swc native deps are not properly installed above
# RUN npm -w services/web-app install next
RUN npm -w services/web-app run build

###

FROM local/carbon-platform/base:latest

WORKDIR /ibm

COPY package.json services/web-app/package.json
RUN npm -w services/web-app install --production --ignore-scripts

# This is done at the end so the install above can happen in parallel
COPY --from=builder /ibm/services/web-app/.next services/web-app/.next

CMD ["npm", "--workspace=services/web-app", "run", "start"]
