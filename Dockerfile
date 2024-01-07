FROM node:latest

WORKDIR /usr/src/api

COPY . .
COPY ./.env.local ./.env

RUN yarn --quiet --no-optional --no-fund --loglevel=error

RUN yarn build

RUN npx prisma generate

EXPOSE 3500

CMD ["yarn", "start:dev"]