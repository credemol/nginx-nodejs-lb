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

## Docker Basic

There are several types of applications printing 'Hello World'
* [echo](./helloworld/Dockerfile-echo) 
* [java](./helloworld/Dockerfile-java)
* [node](./helloworld/Dockerfile-nodejs)
* [python](./helloworld/Dockerfile-python)

```
$ cd helloworld
```

### HelloWorld - echo on ubuntu

```

$ docker build -t helloworld-echo -t Dockerfile-echo .
$ docker image ls

$ docker run -it helloworld-echo

$ docker run -d --name=echo1 helloworld-echo
$ docker container logs echo1
```

### HelloWorld - Java on openjdk8:alpine

You can see the source file. 
* [HelloWorld.java](./helloworld/HelloWorld.java)

```
$ javac -d . HelloWorld.java

$ docker build -t helloworld-java -t Dockerfile-java .
$ docker image ls

$ docker run -it helloworld-java

$ docker run -d --name=java1 helloworld-java
$ docker container logs java1
```

### HelloWorld - Node.JS

You can see the source file. 
* [helloworld.js](./helloworld/helloworld.js)

```
$ docker build -t helloworld-nodejs -t Dockerfile-nodejs .
$ docker image ls 

$ docker run -it helloworld-nodejs

$ docker run -d --name=nodejs1 helloworld-nodejs
$ docker container logs nodejs1
```

### HelloWorld - Python3
You can see the source file. 
* [helloworld.py](./helloworld/helloworld.py)

```
$ docker build -t helloworld-python -t Dockerfile-python .
$ docker image ls

$ docker run -it helloworld-python

$ docker run -d --name=python1 helloworld-python
$ docker container logs python1
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

In case you are using Docker Toolbox, check the IP address which your docker machine is using by running following command

```
$ docker-machine ip
```
The IP address can be different. If then use your docker machine IP address
* [http://192.168.99.100:8081](http://192.168.99.100:8081)
* [http://192.168.99.100:8082](http://192.168.99.100:8082)

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

In case you are using Docker Toolbox, check the IP address which your docker machine is using by running following command

```
$ docker-machine ip
```
The IP address can be different. If then use your docker machine IP address
* [http://192.168.99.100:8080](http://192.168.99.100:8080)

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
$ docker image ls

$ docker-compose up --scale app=2 -d
$ docker container ls
```

Open your web browser(Firefox recommended) and navigate following url and click Refresh Button several times
* [http://localhost:8080](http://localhost:8080)

In case you are using Docker Toolbox, check the IP address which your docker machine is using by running following command

```
$ docker-machine ip
```
The IP address can be different. If then use your docker machine IP address
* [http://192.168.99.100:8080](http://192.168.99.100:8080)



### Clean up Docker Compose
```
$ docker-compose down
```

## Using Kubernetes
