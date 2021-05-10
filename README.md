# Run app locally

    There are two options how to run application. Develop and deploy mode.
    Both modes are using same docker volume (same database is loaded).

### Pre requirements

- Docker installed on your local machine. Tutorial, how to install Docker, can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04).
- Npm installed on your local machine. Tutorial, how to install Npm, can be found [here](https://www.npmjs.com/get-npm).

### General

1. Copy and rename `.env.example` to `.env`
2. Copy and rename `client/.env.development.example` to `client/.env.development` if you want to run app **in develop mode**
3. Copy and rename `client/.env.production.example` to `client/.env.production` if you want to run app in **production mode**
4. Fulfill missing values in those files.
5. To get value for `${REACT_APP_GOOGLE_API}` follow [these](https://developers.google.com/maps/premium/apikey/maps-javascript-apikey#creating-api-keys) steps

### Run app in develop mode:

    This will just run db and pgadmin containers. React and server instances are running separately, outside of containers.

1. Change value of `${DB_HOST}` from `.env` to: `localhost`
2. Run db and pgadmin containers in console: `docker-compose -f docker-compose.dev.yml up`
3. Run server in console: `npm run server`
4. Do not forget to adjust port of `${REACT_APP_BASE_URL}` variable in `client/.env.development` file accordingly to `${SERVER_PORT}` specified in `.env` file
5. Run client in console: `npm run client`
6. App is available at: `localhost:3000`

### Run app in production mode:

    This will run db, pgadmin, server and build react with disabled redux devtools.

1. Change value of `${DB_HOST}` from `.env` to `postgres`.
2. Run db & pgadmin & server containers in console: `docker-compose up`.
3. App is available at: `localhost:${SERVER_PORT}`.

### Access to postgres:

- `localhost:${DB_PORT}`
- **Username:** `${DB_USER}`
- **Password:** `${DB_PASSWORD}`

### Access to PgAdmin:

- **URL:** `http://localhost:${PGADMIN_PORT}`
- **Username:** `${PGADMIN_EMAIL}`
- **Password:** `${PGADMIN_PASSWORD}`

### Access to server in PgAdmin

- **Host name/address:** `postgres`
- **Port:** `${DB_PORT}`
- **Username:** `${DB_NAME}`
- **Password:** `${DB_PASSWORD}`

## Docker file explained

Docker file is located at root level of project and it is used only for deploy mode.

```dockerfile
#Dockerfile
FROM node:latest

WORKDIR /server

COPY . ./

RUN npm install
RUN npm install --prefix client

CMD npm run build
```

At first, latest node is downloaded and `/server` working directory is created in newly created container. Into this working directory, whole source code is copied, expect for files specified in `client/.dockerignore`. These files are omitted. Then, node dependencies are installed into working directory for both, server and client instancies. Lastly, the `npm run build` command is called which is located in `package.json`. This command firstly build react application and then trigger server. When the server is started this way, the environment variable `NODE_ENV` is set to `production` and built version of react application is used.

## Docker-compose explained

We are using two docker-compose files. The `docker-compose.dev.yml` for develop mode and `docker-compose.yml` for production mode, both located in root directory. Each compose files loads environment variables specified in `.env` file.

### docker-compose config file explained

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
      POSTGRES_PASSWORD: ${DB_PASSWORD}
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

This compose configuration creates 3 containers, 1 network and 1 volume for storing persistent data. Every container is using the same network for communication with other containers. Each container, after failure, automatically restarts. Container `postgres_container` creates postgresql server, where the persistent data is stored in volume. There is also container `pgadmin_container`, which is sql client. Last container, named `server_container`, is where our main app is running. Instead of image it is using build, defined in Dockerfile, discussed in previous section.

### docker-compose.dev.yml explained

The compose configuration for develop mode is very similar to one for deploy mode. Only difference is that, there is no `server_container`, because server and client are separate instances running out of docker.

# How to populate database

For correct application server functioning, database has to be populated. We will be using command line to accomplish that.

### Pre requirements

- application server is running in containers

From root directory, navigate to directory where exported data are located.

```shell
cd dummy
```

Then, copy data into running postgres container (for development mode use `dev_postgres_container`).

```
docker cp dbexport.sql postgres_container:/
```

Then, enter container (for development mode use `dev_postgres_container`).

```
docker exec -it postgres_container /bin/sh
```

Lastly, import data into database:

```
psql -d ${DB_NAME} -U ${DB_USER} -f dbexport.sql
```

Default `name` and `password` is: `admin`

If you would like to import data into already populated database, you have to first remove the existing table and then create new one. In container console drop existing database.

```shell
dropdb -U ${DB_USER} ${DB_NAME}
```

Log into postgres server as user.

```shell
su - ${DB_USER}
```

Then create new database.

```shell
createdb ${DB_NAME}
```

Exit postgres server console.

```shell
exit
```

Populate database with new data like previously.

```shell
psql -d ${DB_NAME} -U ${DB_USER} -f dbexport.sql
```

# How to build and deploy app on remote server using Jenkins pipeline

### Pre requirements

- You should have access to server with linux OS software installed on it. For example [DigitalOcean](https://www.digitalocean.com/pricing?utm_campaign=emea_brand_kw_en_cpc&utm_adgroup=digitalocean_pricing_bmm&_keyword=%2Bdigitalocean%20%2Bpricing&_device=c&_adposition=&utm_content=conversion&utm_medium=cpc&utm_source=google&gclid=Cj0KCQjwp86EBhD7ARIsAFkgakiyGFR3oRT68R7CEWseAIPhseFJ2qsSPPO3xeP2veyrvATkd4ygDVgaAjDDEALw_wcB) cloud provider.
- Nginx installed. Tutorial, how to install nginx on Ubuntu, can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04).
- Installed SSL certificate along with registered DNS. Tutorial can be found [here](https://docs.digitalocean.com/products/networking/dns/).
- Jenkins installed. Tutorial, how to install Jenkins on Ubuntu, can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-20-04).
- Docker installed. Tutorial, how to install Docker on Ubuntu, can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04).

### Prepare your environment config files

1. Copy and rename `.env.example` to `.env` and set value of `${DB_HOST}` to `localhost`.
2. Copy and rename `client/.env.production.example` to `client/.env.production`.
3. Fulfill missing values in those two files.
4. To get value for `${REACT_APP_GOOGLE_API}` in `client/.env.production`, follow [these](https://developers.google.com/maps/premium/apikey/maps-javascript-apikey#creating-api-keys) steps.

## Setup reverse proxy

Reverse proxy has to be set to forward access to Jenkins and application server. The ports specified in `./env` has to match with those in nginx reverse proxy config.

First, navigate to available sites config directory.

```shell
cd /etc/nginx/sites-available/
```

Create config file. You can name it as you whish. Good practice is to name it the same way as your DNS address is. In our case, it is `lora.fiit.stuba.sk`.

```shell
touch lora.fiit.stuba.sk
```

Copy and paste the following code to newly created file. Change configuration of `proxy_pass` for each location to match ports specified in `.env`. Don't forget to also adjust `server_name` to match your DNS.

```nginx
upstream jenkins {
  keepalive 32; # keepalive connections
  server 127.0.0.1:8080; # jenkins ip and port
}

# Required for Jenkins websocket agents
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  server_name     lora.fiit.stuba.sk www.lora.fiit.stuba.sk;

  # this is the jenkins web root directory
  # (mentioned in the /etc/default/jenkins file)
  root            /var/run/jenkins/war/;

  access_log      /var/log/nginx/jenkins/access.log;
  error_log       /var/log/nginx/jenkins/error.log;

  # pass through headers from Jenkins that Nginx considers invalid
  ignore_invalid_headers off;

  location /jenkins/ {
      autoindex on;
      sendfile off;
      proxy_pass         http://jenkins/jenkins/;
      proxy_redirect     default;
      proxy_http_version 1.1;

      # Required for Jenkins websocket agents
      proxy_set_header   Connection        $connection_upgrade;
      proxy_set_header   Upgrade           $http_upgrade;

      proxy_set_header   Host              $host;
      proxy_set_header   X-Real-IP         $remote_addr;
      proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto $scheme;
      proxy_max_temp_file_size 0;

      #this is the maximum upload size
      client_max_body_size       10m;
      client_body_buffer_size    128k;

      proxy_connect_timeout      90;
      proxy_send_timeout         90;
      proxy_read_timeout         90;
      proxy_buffering            off;
      proxy_request_buffering    off; # Required for HTTP CLI commands
      proxy_set_header Connection ""; # Clear for keepalive
   }

   location / {
      #Add serving gzipped files
      gzip_static on;
      gzip on;
      gzip_proxied    no-cache no-store private expired auth;
      gzip_min_length 256;
      gzip_types
      text/plain
      text/css
      application/json
      application/javascript
      text/xml
      application/xml
      application/xml+rss text/javascript
      application/atom+xml
      application/geo+json
      application/x-javascript
      application/ld+json
      application/manifest+json
      application/rdf+xml
      application/rss+xml
      application/xhtml+xml
      font/eot
      font/otf
      font/ttf
      image/svg+xml;

      proxy_pass http://127.0.0.1:5000/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      # enable WebSockets
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
   }

   listen 443 ssl; # managed by Certbot

   # SSL Configuration
   ssl_certificate /etc/letsencrypt/live/lora.fiit.stuba.sk/fullchain.pem; # managed by Certbot
   ssl_certificate_key /etc/letsencrypt/live/lora.fiit.stuba.sk/privkey.pem; # managed by Certbot
   include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
   ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

# SSL redirect from HTTP to HTTPS

server {
    if ($host = lora.fiit.stuba.sk) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80 ;
    server_name lora.fiit.stuba.sk www.lora.fiit.stuba.sk;
    return 404; # managed by Certbot
}
```

Save file and restart nginx service

```shell
sudo systemctl restart nginx
```

The Jenkins application should be accessible at `lora.fiit.stuba.sk/jenkins`. In your case it would be your DNS name instead of `lora.fiit.stuba.sk`.

### Change default Jenkins home (optional)

When you want to change default home for Jenkins, you can change `JENKINS_HOME` variable. The guide is heavily inspired by [this tutorial](https://dzone.com/articles/jenkins-02-changing-home-directory).

Create a new directory where ever you want to move the Jenkins home to. In our case it is `/data/jenkins`.

```shell
mkdir /data/jenkins
```

Change the ownership of newly created directory.

```shell
sudo chown jenkins:jenkins /data/jenkins
```

Copy the content from old Jenkins home directory, `/var/lib/jenkins/` , to the new Jenkins home directory, `/data/jenkins/` , using the following command.

```shell
sudo cp -prv /var/lib/jenkins /data/jenkins/
```

Next, change the Jenkins user home.

```shell
sudo usermod -d /data/jenkins/ jenkins
```

Update the new Jenkins home directory path in `/etc/default/jenkins`. You can use any editor of your choice. In our case, we are using vi.

```shell
sudo vi /etc/default/jenkins
```

Scroll down to the Jenkins home location and update the new home directory path.

```apache
# defaults for Jenkins automation server

# pulled in from the init script; makes things easier.
NAME=jenkins

# arguments to pass to java

# Allow graphs etc. to work even when an X server is present
JAVA_ARGS="-Djava.awt.headless=true"

#JAVA_ARGS="-Xmx256m"

# make jenkins listen on IPv4 address
#JAVA_ARGS="-Djava.net.preferIPv4Stack=true"

PIDFILE=/var/run/$NAME/$NAME.pid

# user and group to be invoked as (default to jenkins)
JENKINS_USER=$NAME
JENKINS_GROUP=$NAME

# location of the jenkins war file
JENKINS_WAR=/usr/share/$NAME/$NAME.war

# jenkins home location
JENKINS_HOME=/data/$NAME

# set this to false if you don't want Jenkins to run by itself
# in this set up, you are expected to provide a servlet container
# to host jenkins.
RUN_STANDALONE=true
```

Start the Jenkins service by using the following command.

```
sudo service jenkins start
```

## Setup Jenkins pipeline

1. Visit Jenkins from your browser at `lora.fiit.stuba.sk/jenkins`.
2. Log into the application.
3. Navigate to `Manage Jenkins` button located in left side of the screen.
4. Click on `Manage Credentials` tab located in `Security group`.
5. Then, click on the `(global)` link located in table.
6. Click on the `addCredentials` button on the left side of the screen.
7. Choose `Secret file` option from `Kind` dropdown menu.
8. Upload fulfilled `.env` file and set ID field to `env`.
9. Repeat step 6 and then upload fulfilled `client/.env.production` file and set ID field to `envClient`.
10. Create another credentials but this time choose `SSH Username with private key` option from dropdown menu. Set ID field to `lora-application-server-ssh`. To get SSH keys for your repository (where the source code of application server is) follow [this instructions](https://docs.github.com/en/developers/overview/managing-deploy-keys).
11. From dashboard click on `New Item` button, located in left side of the screen.
12. Enter desired name, click on `Pipeline` button and confirm it clicking on OK button
13. To the Pipeline script paste following code

    ```js
    node {
      /*** 1 Pull new changes from git branch deploy ***/
        stage('Pull master branch'){
            git credentialsId: 'lora-application-server-ssh', url: 'git@github.com:danielhros/lora-application-server.git'
        }

        /*** 2 Add secret enviroment variables stored securely in Jenkins ***/
        stage('Add enviroment variables'){
          /* 2.1 Remove .env file if exists */
          sh 'rm -f -- .env'

          /* 2.2 Add .env file to server */
          withCredentials([file(credentialsId: 'env', variable: 'env')]) {
            sh "cp \$env ./"
        }

        /* 2.2 Add .env file to client */
          withCredentials([file(credentialsId: 'envClient', variable: 'envClient')]) {
            sh 'cp \$envClient client/.env.production'
        }
        }

        /*** 3 Build docker image ***/
        stage('Build docker image'){
          sh '(docker-compose build)'
        }


        /*** 4 Run docker image in production ***/
        stage('Run docker images'){
          sh '(docker-compose up -d)'
        }

        /*** 5 Clean after build ***/
        stage('Clean workspace'){
            sh 'docker system prune -f'
            cleanWs()
        }

    }
    ```

14. Save changes and run your first pipeline
15. Congratulations! After the pipeline successfully build and deploy the application, your app is accessible at `lora.fiit.stuba.sk`.
