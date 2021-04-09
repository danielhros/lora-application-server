FROM node:latest

WORKDIR /server

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY client/package.json ./
COPY client/package-lock.json ./

RUN npm install --prefix client

# Bundle app source
COPY . ./

CMD npm run build