FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

RUN mkdir -p /frontend
WORKDIR /frontend
COPY . .

RUN npm install

EXPOSE 3000

CMD npm run start
