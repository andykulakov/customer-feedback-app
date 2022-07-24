FROM node:16 AS build

WORKDIR /api

COPY package.json /api/
COPY yarn.lock /api/
COPY tsconfig.json /api/

RUN yarn

COPY . /api/

RUN yarn build

EXPOSE 9000

FROM node:16 AS production

WORKDIR /api

COPY package.json /api/
COPY yarn.lock /api/

RUN yarn --production
RUN npm install pm2 -g

COPY --from=build /api/dist .

EXPOSE 80

CMD ["pm2-runtime", "dist/index.js"]