# Stage: base
# This base stage ensures all other stages are using the same base image
# and provides common configuration for all stages, such as the working dir.
FROM node:lts-alpine AS base
WORKDIR /usr/local/app
RUN npm install -g pnpm
COPY web/package.json web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY web/ ./

# Stage: development
# This stage runs a development server for the website.
FROM base AS development
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host"]

# Stage: build
# This stage is used to build the production website.
FROM base AS build
RUN pnpm run build

# Stage: preview
# This stage previews the production build of the website.
FROM build AS preview
EXPOSE 4173
CMD ["pnpm", "run", "preview", "--host"]
