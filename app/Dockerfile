# first stage - builds to dist
FROM node:16-alpine AS builder

WORKDIR /tmp/scooter_app_build

COPY package*.json .

RUN npm install --only=development

COPY . .

RUN npm run build

# second stage - only need production runtime packages
FROM node:16-alpine AS production

RUN apk update && apk add bash

WORKDIR /scooter_app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=builder /tmp/scooter_app_build/dist ./dist
