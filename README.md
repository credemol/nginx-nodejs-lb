# Docker HandsOn: Load Balance with Nginx and Node.JS
This project is designed for docker trainging workshop


## Git Clone & Initialize the Project
```
$ mkdir nginx-nodejs-lb
$ cd nginx-nodejs-lb
$ git clone --bare https://github.com/credemol/nginx-nodejs-lb.git .git
$ git config --bool core.bare false
$ git reset --hard
```

## Build Docker Image and Run Containers
Switch brance to branch 'each-container'

```
$ git branch
$ git checkout each-container
```

### Containerize Node.JS Application 
```

$ cd application

$ docker build -t load-balanced-app .

$ docker image ls

$ docker run -d --name=app_1 -p 8081:8080 load-balanced-app
$ docker run -d --name=app_2 -p 8082:8080 load-balanced-app

$ docker container ls
$ docker container logs app_1
$ docker container inspect app_1

$ cd ..
```
Open your web browser and navigate following url
* [http://localhost:8081](http://localhost:8081)
* [http://localhost:8082](http://localhost:8082)

### Containerize Nginx
```
$ cd nginx-docker

$ docker build -t load-balance-nginx .

$ docker image ls

$ docker run -d --name=lb-nginx -p 8080:80 load-balance-nginx
$ docker container ls

$ cd ..
```

Open your web browser(Firefox recommended) and navigate following url and click Refresh Button several times
* [http://localhost:8080](http://localhost:8080)

## Using Docker-Compose

```
$ git reset --hard
$ git checkout docker-compose
```

see if nginx-docker/nginx.conf file has been changed.

### Clean up Docker Containers 
```
$ docker container stop $(docker container ls -q)
$ docker container rm $(docker container ls -qa)
```

### Docker compose
change directory which has docker-compose.yml file

```
$ docker-compose build
$ docker-compose up --scale app=2 -d
```

Open your web browser(Firefox recommended) and navigate following url and click Refresh Button several times
* [http://localhost:8080](http://localhost:8080)

### Clean up Docker Compose
```
$ docker-compose down
```