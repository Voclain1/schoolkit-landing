# syntax=docker/dockerfile:1
# Self-hosted image for schoolkit.ng, served from the School Kit VPS
# (naija-class: docs/runbooks/vps-migration.md). Built by
# .github/workflows/deploy-vps.yml; Vercel does not use this file.
#
# NEXT_PUBLIC_GA_MEASUREMENT_ID is inlined into the page at build time, so it
# is a build argument.

FROM node:22-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_OUTPUT=standalone
RUN npm run build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# lib/landing.ts and lib/posts.ts read these from process.cwd() at runtime.
COPY --from=build /app/content ./content
RUN mkdir -p .next/cache && chown -R node:node .next
USER node
EXPOSE 3000
CMD ["node", "server.js"]
