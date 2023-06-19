FROM node:lts-hydrogen AS base

RUN npm i -g npm

FROM base AS dependencies-and-build

WORKDIR /syk-core-app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]