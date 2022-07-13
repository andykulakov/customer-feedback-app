FROM node:16 AS builder

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

RUN npm run build

FROM nginx:1.21.0-alpine AS production

COPY --from=builder /client/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]