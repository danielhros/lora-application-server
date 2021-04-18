## How to run locally:

- Both modes are using same docker volume (same database is loaded)

### General

1. Copy and rename `.env.example` file to `.env`
3. Copy and rename `client/.env.development.example` to `.env.development` if you want to **run app in develop mode**
4. Copy and rename `client/.env.production.example` to `.env.production` if you want to **build and deploy app**
5. Fulfill missing values in those files

### Run app in develop mode:

    This will just run db and pgadmin container, React and Server are running separately on local machine

1. Change value of DB_HOST from `.env` to: `localhost`
2. Run db and pgadmin containers in console: `docker-compose -f docker-compose.dev.yml up`
3. Run server in console: `npm run server`
4. Do not forget to adjust port of `${REACT_APP_BASE_URL}` variable in `client/.env.development` file accordingly to `${SERVER_PORT}` specified in `.env` file
5. Run client in console: `npm run client`
6. App is available at: `localhost:3000`

### Build and deploy app:

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
