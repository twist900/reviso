FROM node:latest

RUN mkdir -p /backend
WORKDIR /backend
COPY . .

RUN npm install

EXPOSE 8080

CMD npm run start

