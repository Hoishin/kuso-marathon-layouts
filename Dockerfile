FROM node:19-alpine AS build

RUN apk add --no-cache git

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY tsconfig.dashboard.json tsconfig.extension.json tsconfig.graphics.json tsconfig.json webpack.config.ts ./
COPY src ./src
RUN NODE_ENV=production yarn build


FROM node:19-alpine AS fetchNodeModules

RUN apk add --no-cache git

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile


FROM node:19-alpine

RUN apk add --no-cache git

ADD https://github.com/krallin/tini/releases/download/v0.18.0/tini-muslc-amd64 /tini
RUN chmod +x /tini

WORKDIR /app
RUN mkdir -p cfg db
COPY package.json configschema.json ./
COPY --from=fetchNodeModules /app/node_modules ./node_modules
COPY --from=build /app/dashboard ./dashboard
COPY --from=build /app/extension ./extension
COPY --from=build /app/graphics ./graphics

CMD ["/tini", "--", "yarn", "start"]
