## How to run locally:

    There are two options how to run application. Develop and deploy mode. Both modes are using same docker volume (same database is loaded).

### General

1. Copy and rename `.env.example` file to `.env`
2. Copy and rename `client/.env.development.example` to `.env.development` if you want to **run app in develop mode**
3. Copy and rename `client/.env.production.example` to `.env.production` if you want to **run app in production mode**
4. Fulfill missing values in those files.
5. To get value for `${REACT_APP_GOOGLE_API}` follow [these](https://developers.google.com/maps/premium/apikey/maps-javascript-apikey#creating-api-keys) steps

### Run app in develop mode:

    This will just run db and pgadmin container, React and Server are running separately on local machine

1. Change value of DB_HOST from `.env` to: `localhost`
2. Run db and pgadmin containers in console: `docker-compose -f docker-compose.dev.yml up`
3. Run server in console: `npm run server`
4. Do not forget to adjust port of `${REACT_APP_BASE_URL}` variable in `client/.env.development` file accordingly to `${SERVER_PORT}` specified in `.env` file
5. Run client in console: `npm run client`
6. App is available at: `localhost:3000`

### Run app in production mode:

    This will run db, pgadmin, server and build react with disabled redux devtools

1. Change value of DB_HOST from `.env` to: `postgres`
2. Run db & pgadmin & server containers in console: `docker-compose up`
3. App is available at: `localhost:${SERVER_PORT}`

### Access to postgres:

- `localhost:${DB_PORT}`
- **Username:** `${DB_USER}`
- **Password:** `${DP_PASSWORD}`

### Access to PgAdmin:

- **URL:** `http://localhost:${PGADMIN_PORT}`
- **Username:** `${PGADMIN_EMAIL}`
- **Password:** `${PGADMIN_PASSWORD}`

### Access to server in PgAdmin

- **Host name/address:** `postgres`
- **Port:** `${DB_PORT}`
- **Username:** `${DB_NAME}`
- **Password:** `${DP_PASSWORD}`

## Docker file explained

Docker file is located at root level of project and it is used only for build and deploy mode.

```dockerfile
#Dockerfile
FROM node:latest

WORKDIR /server

COPY . ./

RUN npm install
RUN npm install --prefix client

CMD npm run build
```

At first, latest node is downloaded and `/server` working directory is created in newly created container. Into this working directory, whole source code is copied, expect for files specified in `client/.dockerignore`. These files are omitted. Then, node dependencies are installed into working directory for both, server and client instancies. Lastly, the `npm run build` command is called which is located in `package.json`. This command firstly build React application and then trigger server. When the server is started this way, the environment variable `NODE_ENV` is set to `production` and built version of React application is served.

## Docker-compose explained

We are using two docker-compose files. The `docker-compose.dev.yml` for develop mode and `docker-compose.yml` for production mode, both located in root directory. Both files are using environment variables specified in `.env` file.

### docker-compose.yml explained

```yml
# docker-compose.dev.yml
version: "3.5"

# inspired by https://github.com/khezen/compose-postgres
services:
  postgres:
    container_name: postgres_container
    image: postgres:11
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DP_PASSWORD}
      PGDATA: /data/postgres
    volumes:
      - postgres:/data/postgres
    ports:
      - "${DB_PORT}:5432"
    networks:
      - postgres
    restart: always

  pgadmin:
    container_name: pgadmin_container
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD}
      PGADMIN_CONFIG_SERVER_MODE: "False"
    volumes:
      - pgadmin:/root/.pgadmin
    ports:
      - "${PGADMIN_PORT}:80"
    networks:
      - postgres
    restart: always

  server:
    container_name: server_container
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - postgres
    ports:
      - "${SERVER_PORT}:${SERVER_PORT}"
    networks:
      - postgres
    restart: always

networks:
  postgres:
    driver: bridge

volumes:
  postgres:
  pgadmin:
```

This compose configuration creates 3 containers, 1 network and 1 volume for storing persistent data. Every container is using the same network for communication with other containers. Each container, after failure, automatically restarts. Container `postgres_container` creates postgresql server where the persistent data is stored using volume. There is also container `pgadmin_container`, which is sql client. Last container, named `server_container`, is where our main app is running. Instead of image it is using build defined in Docker file discussed in previous section.

### docker-compose.dev.yml explained

The compose configuration for develop mode is very similar to one for deploy mode. Only difference is that, there is no `server_container`, because server and client are separate instances running out of docker.
