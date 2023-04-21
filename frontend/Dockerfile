FROM node:16.13.0-alpine

RUN mkdir /app

WORKDIR /app

# install pnpm
RUN npm install -g pnpm

ADD frontend/package.json /app
RUN pnpm i
ADD frontend/ /app

RUN pnpm run build	
