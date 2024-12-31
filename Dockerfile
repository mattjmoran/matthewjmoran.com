###################################################
# Stage: base
# 
# This base stage ensures all other stages are using the same base image
# and provides common configuration for all stages, such as the working dir.
###################################################
FROM node:lts-alpine AS base
WORKDIR /usr/local/app

# Install PNPM and install dependencies as specified in the lock file.
RUN npm install -g pnpm
COPY web/package.json web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the website.
COPY web/ ./

###################################################
# Stage: development
# 
# This stage is used for development of the website.
###################################################
FROM base AS development
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host"]

###################################################
# Stage: build
#
# This stage builds the website.
###################################################
FROM base AS build
RUN pnpm run build