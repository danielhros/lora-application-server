## How to run locally:

- Both modes are using same docker volume (same database is loaded)

### General

1. Copy and rename `.env.example` file to `.env`
2. Fulfill missing values in `.env` file

### Run in develop mode:

    This will just run db and pgadmin container, React and Server are running separately on local machine

1. Change value of DB_HOST from `.env` to: `localhost`
2. Run db and pgadmin containers in console: `docker-compose -f docker-compose.yml up`
3. Run server in console: `npm run server`
4. Run client in console: `npm run client`
5. App is available in both modes at: `localhost:3000`

### Build and deploy:

    This will run db, pgadmin, server and build react with disabled redux devtools

1. Change value of DB_HOST from `.env` to: `postgres`
2. Run db & pgadmin & server containers in console: `docker-compose up`
3. App is available in both modes at: localhost:${SERVER_PORT}

### Access to postgres:

- `localhost:${PGADMIN_PORT}`
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
