FROM node:18-alpine AS builder

WORKDIR /client

COPY package.json /client/
COPY yarn.lock /client/

RUN yarn

COPY . /client/

RUN yarn build

FROM nginx:1.21.0-alpine AS production
ENV NODE_ENV production

COPY --from=builder /client/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]