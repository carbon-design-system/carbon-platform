FROM local/carbon-platform/base:latest AS builder

WORKDIR /ibm

RUN npm -w services/data-graph run build
RUN npm -w services/data-graph run bundle

###

FROM node:16-alpine

WORKDIR /ibm/services/data-graph

ENV NODE_ENV=production
ENV CARBON_RUN_MODE=STANDARD

COPY --from=builder /ibm/services/data-graph/dist/out.js dist/out.js

CMD ["node", "dist/out.js"]
