FROM node:18-alpine3.14 AS build

WORKDIR /build

COPY package.json package-lock.json ./

RUN apk add gettext && \
    npm install &&  \
    npm install -g @angular/cli

COPY . .

RUN ng build --configuration production

FROM nginx:1.21.6-alpine

EXPOSE 80 443

RUN rm /etc/nginx/conf.d/default.conf

COPY store.conf /etc/nginx/conf.d
COPY --from=build /build/dist/udv-store /udv-store
