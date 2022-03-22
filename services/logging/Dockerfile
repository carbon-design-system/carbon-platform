FROM local/carbon-platform/base:latest AS builder

WORKDIR /ibm

RUN npm -w services/logging run build
RUN npm -w services/logging run bundle

###

FROM node:16-alpine

WORKDIR /ibm/services/logging

ENV NODE_ENV=production
ENV CARBON_RUN_MODE=PROD

COPY --from=builder /ibm/services/logging/dist/out.js dist/out.js

CMD ["node", "dist/out.js"]
