FROM local/carbon-platform/base:latest AS builder

WORKDIR /ibm

ARG CARBON_GITHUB_TOKEN
ARG GITHUB_TOKEN=${CARBON_GITHUB_TOKEN}

RUN npm -w services/web-app run build

###

FROM node:16-alpine

WORKDIR /ibm/services/web-app

ENV NODE_ENV=production
ENV CARBON_RUN_MODE=STANDARD

COPY --from=builder /ibm/services/web-app/.next/standalone .next/standalone
COPY --from=builder /ibm/services/web-app/public .next/standalone/services/web-app/public
COPY --from=builder /ibm/services/web-app/.next/static .next/standalone/services/web-app/.next/static
COPY --from=builder /ibm/services/web-app/.carbon .next/standalone/services/web-app/.carbon

CMD ["node", ".next/standalone/services/web-app/server.js"]
