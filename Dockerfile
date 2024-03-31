FROM node:20.10.0-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY --chown=node:node . .

RUN pnpm run build

USER node

FROM node:20.10.0-alpine AS production

WORKDIR /usr/src/app
ENV NODE_ENV production

COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod

COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 80

CMD [ "node", "dist/main.js" ]
