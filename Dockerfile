FROM node:latest

WORKDIR /server

COPY . ./

RUN npm install
RUN npm install --prefix client

CMD npm run build