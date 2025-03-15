# use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile

# copy node_modules from temp directory
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# run tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/package.json .
# Copy the build output for SvelteKit + Bun adapter
COPY --from=prerelease /usr/src/app/build ./build
# Copy static assets if needed
COPY --from=prerelease /usr/src/app/static ./static

# run the app
USER bun
EXPOSE 3000/tcp
# Run the built application directly
CMD ["bun", "./build/index.js"]