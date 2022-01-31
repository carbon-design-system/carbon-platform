FROM local/carbon-platform/base:latest AS builder

WORKDIR /ibm

COPY . services/web-app

RUN CI=true npm -w services/web-app install
RUN npm -w services/web-app run build

###

FROM local/carbon-platform/base:latest

WORKDIR /ibm

COPY package.json services/web-app/package.json

RUN CI=true npm -w services/web-app install --production

# This is done at the end so the install above can happen in parallel
COPY --from=builder /ibm/services/web-app/next.config.js services/web-app/
COPY --from=builder /ibm/services/web-app/.next services/web-app/.next
COPY --from=builder /ibm/services/web-app/data services/web-app/data
COPY --from=builder /ibm/services/web-app/public services/web-app/public

CMD ["npm", "--workspace=services/web-app", "run", "start"]
