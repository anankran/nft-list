FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/nft

COPY package*.json ./

RUN npm install glob rimraf -g npm-install-peers

RUN npm install

COPY . .

RUN npm run build