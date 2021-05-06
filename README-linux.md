# How to build and deploy app on remote server using Jenkins pipeline

### Pre requirements

- You should have access to server with linux OS software installed on it. For example [DigitalOcean](https://www.digitalocean.com/pricing?utm_campaign=emea_brand_kw_en_cpc&utm_adgroup=digitalocean_pricing_bmm&_keyword=%2Bdigitalocean%20%2Bpricing&_device=c&_adposition=&utm_content=conversion&utm_medium=cpc&utm_source=google&gclid=Cj0KCQjwp86EBhD7ARIsAFkgakiyGFR3oRT68R7CEWseAIPhseFJ2qsSPPO3xeP2veyrvATkd4ygDVgaAjDDEALw_wcB) cloud provider
- Nginx installed. Tutorial, how to install nginx on Ubuntu, can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
- Install SSL certificate and register DNS. Tutorial can be found [here](https://docs.digitalocean.com/products/networking/dns/)
- Jenkins installed. Tutorial, how to install Jenkins on Ubuntu, can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-20-04)
- Docker installed. Tutorial, how to install Docker on Ubuntu, can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)

### Prepare your environment config files

1. Copy and rename `.env.example` file to `.env` and set value of `${DB_HOST}` to `localhost`
2. Copy and rename `client/.env.production.example` to `client/.env.production`
3. Fulfill missing values in those two files.
4. To get value for `${REACT_APP_GOOGLE_API}` in `client/.env.production`, follow [these](https://developers.google.com/maps/premium/apikey/maps-javascript-apikey#creating-api-keys) steps

## Setup reverse proxy

Reverse proxy has to be set to forward access to Jenkins and Application server. The ports specified in `./env` has to match with those in nginx reverse proxy config.

First, navigate to available sites config:

```shell
cd etc/nginx/sites-available/
```

Create config file. You can name it as you whish. Good practice is to name it the same way as your DNS address is. In our case, it is `lora.fiit.stuba.sk`:

```shell
touch lora.fiit.stuba.sk
```

Copy and paste the following code to newly created file. Change configuration of `proxy_pass` for each location to match ports specified in `.env` for. Don't forget to also adjust `server_name`.

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

### Change default Jenkins home (optional)

When you want save your deployed other then default home of jenkins, you can change `JENKINS_HOME`. This guide is heavily inspired by [this tutorial](https://dzone.com/articles/jenkins-02-changing-home-directory).

Create a new directory where ever you want to move the Jenkins home to. In our case it is `/data/jenkins`.

```shell
mkdir /data/jenkins
```

Change the ownership of newly created directory.

```shell
sudo chown jenkins:jenkins /data/jenkins
```

Copy the content from old Jenkins home directory, `/var/lib/jenkins` , to the new Jenkins home directory, `/data/jenkins , using the following command.

```shell
sudo cp -prv /var/lib/jenkins /data/jenkins/
```

Next, change the Jenkins user home.

```shell
sudo usermod -d /data/jenkins/ jenkins
```

Update the new Jenkins home directory path in `/etc/default/jenkins`. You can use any editor of you chose. In our case we are using vi.

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

Then, the Jenkins, with new home directory, should be still available at `lora.fiit.stuba.sk/jenkins` path.

## Setup Jenkins pipeline

1. Visit Jenkins from your browser at `lora.fiit.stuba.sk/jenkins`.
2. Log into the application.
3. Navigate to `Manage Jenkins` located in left side of screen.
4. Click on `Manage Credentials` tab located in `Security group`.
5. Then, click on `(global)` link located in table.
6. Upload both environment config files clicking on the `addCredentials` button on the left side of screen.
7. Choose `Secret file` option from `Kind` dropdown menu.
8. Upload fulfilled `.env` file and fill ID field with `env`.
9. Repeat step 6 and then upload fulfilled `client/.env.development` file and fill ID field with `envClient`.
10. Create another credentials but this time choose `SSH Username with private key` option from dropdown menu. Fill ID field with `lora-application-server-ssh`. To get SSH keys for your repository (where the source code of application server is) follow [this instructions](https://docs.github.com/en/developers/overview/managing-deploy-keys).
11. From dashboard click on `New Item` button located in left side of screen.
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
15. Congratulations!, after the pipeline successfully build and deploy the application, you are ready to go.
